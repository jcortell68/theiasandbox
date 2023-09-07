import { ContainerModule } from "@theia/core/shared/inversify";
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { HelloWorldBackendApplicationContribution } from "./hello-world-backend-appplication-contribution";
import { ConnectionHandler, RpcConnectionHandler } from "@theia/core";
import { SingClient, SingServer, singServicePath } from "../common/sing-protocol";
import { SingServerImpl } from "./sing-server-impl";

export default new ContainerModule(bind => {
    bind(BackendApplicationContribution).to(HelloWorldBackendApplicationContribution);
    bind(ConnectionHandler).toDynamicValue(ctx => new RpcConnectionHandler<SingClient>(singServicePath, clientProxy => {
        const singServer = ctx.container.get<SingServer>(SingServer);
        singServer.setClient(clientProxy);
        return singServer;
    })).inSingletonScope();
    bind(SingServer).to(SingServerImpl).inSingletonScope();
});
