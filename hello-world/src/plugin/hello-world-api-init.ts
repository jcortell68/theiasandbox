import { ExtPluginApiBackendInitializationFn, PluginManager } from '@theia/plugin-ext';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { Plugin, emptyPlugin } from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import type * as helloWorldApi from '../hello-world';
import { realpathSync } from 'fs';
import { MAIN_RPC_CONTEXT } from '../common/plugin-api-rpc';
import { FooExtImpl } from './foo-ext-impl';

// Creates the custom API object and dishes it out when a plugin's module
// imports it. Keep in mind all the code here runs in the plugin-host node
// process, which is where the plugin itself is running.

let pluginManager: PluginManager;
let apiFactory: (plugin: Plugin) => typeof helloWorldApi;
let defaultApi: typeof helloWorldApi;
const pluginsApiImpl = new Map<string, typeof helloWorldApi>();
let hookedModuleLoader = false;

// Called by Theia to do any prep work needed for dishing out the API object
// when it's requested. The key part of that is hooking into the node module
// loader. This is called every time a plugin-host process is forked.
export const provideApi: ExtPluginApiBackendInitializationFn = (rpc: RPCProtocol, _pluginManager: PluginManager) => {
    console.log('ExtPluginApiBackendInitializationFn provideApi')
    apiFactory = createAPIFactory(rpc);
    pluginManager = _pluginManager;

    if (!hookedModuleLoader) {
        overrideInternalLoad();
        hookedModuleLoader = true;
    }
};

function overrideInternalLoad(): void {
    const hello_world_api_module = 'hello-world';

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require('module');

    const internalLoad = module._load;

    module._load = function (request: string, parent: any, isMain: any): any {
        if (request !== hello_world_api_module) {
            // Pass the request to the next implementation down the chain
            return internalLoad.call(this, request, parent, isMain);
        }

        const plugin = findPlugin(parent.filename);
        if (plugin) {
            let apiImpl = pluginsApiImpl.get(plugin.model.id);
            if (!apiImpl) {
                apiImpl = apiFactory(plugin);
                pluginsApiImpl.set(plugin.model.id, apiImpl);
            }
            return apiImpl;
        }

        console.warn(
            `Extension module ${parent.filename} did an import of '${hello_world_api_module}' but our cache ` +
                ' has no knowledge of that extension. Returning a generic API object; some functionality might not work correctly'
        );
        if (!defaultApi) {
            defaultApi = apiFactory(emptyPlugin);
        }
        return defaultApi;
    };
}

// Search all loaded plugins to see which one has the given file (absolute path)
function findPlugin(filePath: string): Plugin | undefined {
    return pluginManager.getAllPlugins().find(plugin => {
        // Canonicalize plugin.pluginFolder so our lookup will work in the
        // presence of a symlink'd plugins folder
        // See https://github.com/eclipse-theia/theia/issues/12840.
        if (!(<any>plugin).realPluginFolder) {
            (<any>plugin).realPluginFolder = realpathSync(plugin.pluginFolder);
        }

        return filePath.startsWith((<any>plugin).realPluginFolder);
    });
}

// Create the Hello World API object
export function createAPIFactory(rpc: RPCProtocol): typeof apiFactory {
    const fooExt = rpc.set(MAIN_RPC_CONTEXT.FOO_EXT, new FooExtImpl(rpc));

    return function (plugin: Plugin): typeof helloWorldApi {
        const fooNamespace: typeof helloWorldApi.foo = {
            async getMessage(): Promise<string> {
                return fooExt.getMessage();
            }
        };

        return <typeof helloWorldApi>{
            foo: fooNamespace,
        };
    };
}
