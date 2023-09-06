# Adding a Backend Service

## Most Basic Service Ever

The Yeoman generated hello world sample extension only contributes to the frontend. Here is a succinct recipe for adding backend code to that extension. Keep in mind that the primary motivation for having backend code in a Theia extension is to provide a service that your frontend code can use. And so we'll be adding that to the Hello World extension as well.

1. add a `src/node` directory
1. create `src/node/hello-world-backend-module.ts`
    It should export a `ContainerModule` that binds a `BackendApplicationContribution` to one implemented by the extension.

    ```js
    import { ContainerModule } from "@theia/core/shared/inversify";
    import { BackendApplicationContribution } from '@theia/core/lib/node';
    import { HelloWorldBackendApplicationContribution } from "./hello-world-backend-appplication-contribution";

    export default new ContainerModule(bind => {
        bind(BackendApplicationContribution).to(HelloWorldBackendApplicationContribution);
    });
    ```

    Note that a `BackendApplicationContribution` is optional. You only need to contribute one if you want to hook into the backend lifecycle. But let’s say we do, if for no other reason than to log and see confirmation that our backend code is being loaded and exercised. Create a `src/node/hello-world-backend-appplication-contribution.ts` for the class you bound above. Have it implement the `initialize()` method and console.log from it

    ```js
    import { BackendApplicationContribution } from '@theia/core/lib/node';
    import { injectable } from '@theia/core/shared/inversify';

    @injectable()
    export class HelloWorldBackendApplicationContribution implements BackendApplicationContribution {
        async initialize(): Promise<void> {
            console.log("HelloWorldBackendApplicationContribution.initialize() called");
        }
    }
    ```

    In package.json, add a backend property to the `theiaExtensions` element. This tells the Theia build process that your extension is contributing backend code.

    ```js
    "theiaExtensions": [
        {
        …
        "backend": "lib/node/hello-world-backend-module"
        }
    ```

1. build and launch the app and notice that the code above ran (logged). You are now in the (backend) game!

1. Now it’s time to introduce an actual service. We’ll call our service Sing. The service will provide a method called `croon()` which simply logs to stdout, and it will also have a method that returns the string the service wants the Hello World command to display in the UI. Our extension's frontend code (currently only contributing a Hello World command) should be able to get the service and invoke both methods. We’re going to define a TypeScript interface for the service being provided. We’ll call it `SingServer`.

    Create a `src/common/sing-protocol.ts`. In it define the SingSever interface.

    ```js
    export interface SingServer {
        croon(): Promise<void>;
        getMessage() : Promise<string>;
    };
    ```

    Add a constant to contain the service path. That is effectively the ID/handle for the service and it's used by both the front-end and back-end to set up their respective RPC objects for that particular service. Also, export a Symbol object to act as the InversifyJS ID for the server interface:

    ```js
    export const singServicePath = '/services/sing';
    export const SingServer = Symbol('SingServer');
    ```

1. Next, in the backend container module, add a binding to `ConnectionHandler`. Bind it to a dynamic value that instantiates and returns an `RpcConnectionHandler`. On startup, the Theia core backend gathers up all registered connection handlers and uses them to handle requests for services from the frontend. Each handler is responsible for a particular service (as identified by the service path string).

    ```js
    bind(ConnectionHandler).toDynamicValue(ctx => new RpcConnectionHandler(singServicePath, clientProxy => {
            // We don't use the clientProxy...yet
            const singServer = ctx.container.get<SingServer>(SingServer);
            return singServer;
        })).inSingletonScope();
    ```

    In effect, what we're doing here is telling the core Theia backend code: "If some frontend code (a client) tries to create an RPC object for `/services/sing`, use this factory function to return the implementation for that service and connect the two RPC ends."

    We also need to bind the service implementation to the service interface, and do so as a singleton. This way, when our factory function is called the first time (and only the first time), a `SingServerImpl` will be instantiated. In all subsequent calls, the same instance will be returned. Note that the factory function we provided above is called every time a client requests the service.

    ```js
    bind(SingServer).to(SingServerImpl).inSingletonScope();
    ```

    When a client asks for our service, it has the option to provide a callback object. The object is
    used for notifications and requests. The factory function we provide here is passed a proxy object that can be used to exercise that client-side functionality. This initial implementation has no client callbacks, so we ignore the `clientProxy` argument for now.

1. Create a `src/node/sing-server-impl.ts`. In it, define and export a class `SingServiceImpl` that implements `SingServer`.

    ```js
    import { SingServer } from "../common/sing-protocol";
    import { injectable } from "@theia/core/shared/inversify";

    @injectable()
    export class SingServerImpl implements SingServer {
        async croon(): Promise<void> {
            console.log("Laaa la la lalalala");
        }
        async getMessage(): Promise<string> {
            return "Hello Cleveland!";
        }
    }
    ```

1. Bind that to the SingServer interface in the backend module file

    ```js
    bind(SingServer).to(SingServerImpl).inSingletonScope();
    ```

1. We’re all done on the backend side of things. But of what use is a backend service that goes unused? It’s time to enhance the frontend to exercise the service in the handler for the Hello World command it contributes. Currently, it pops up a message in the GUI. We’re going to have it also tell the Singer backend service to sing (into stdout).

    We start by adding a new InversifyJS binding. We want the frontend code to be able to inject a `SingServer` object. In reality, what the code will get is an RPC proxy object for the `SingServer` implementation in the backend.

    ```js
        bind(SingServer).toDynamicValue(ctx => {
            const connection = ctx.container.get(WebSocketConnectionProvider);
            return connection.createProxy<SingServer>(singServicePath);
        }).inSingletonScope();
    ```

1. And really, that’s the only magic that needs to happen in the frontend. Of course, we need to inject the `SingServer` where it’s needed. In this case, that’s in the `HelloWorldCommandContribution` class. Give the constructor a `SingServer` proxy as follows

    ```js
    @injectable()
    export class HelloWorldCommandContribution implements CommandContribution {
        constructor(
            @inject(MessageService) private readonly messageService: MessageService,
            @inject(SingServer) private readonly singServerProxy : SingServer
        ) { }
    ```

1. And of course, we want to exercise the backend service:

    ```js
    registerCommands(registry: CommandRegistry): void {
            registry.registerCommand(HelloWorldCommand, {
                const promise = this.singServerProxy.getMessage();
                promise.then((msg) => {
                    this.messageService.info(msg);
                });

                this.singServerProxy.croon();
            });
        }
    ```

1. Build and run the app. Invoke the Hello World command. You should see the Sing service sing into the terminal and the service's message appear in the GUI!
