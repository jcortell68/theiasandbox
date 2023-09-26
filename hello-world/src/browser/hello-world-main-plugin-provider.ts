import { MainPluginApiProvider } from '@theia/plugin-ext/lib/common/plugin-ext-api-contribution';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { interfaces, injectable } from '@theia/core/shared/inversify';
import { PLUGIN_RPC_CONTEXT } from '../common/plugin-api-rpc';
import { FooMainImpl } from './foo-main-impl';

@injectable()
export class HelloWorldMainPluginApiProvider implements MainPluginApiProvider {
    initialize(rpc: RPCProtocol, container: interfaces.Container): void {
        console.log('HelloWorldMainPluginApiProvider.initialize called');

        const fooMain = new FooMainImpl(rpc, container);
        rpc.set(PLUGIN_RPC_CONTEXT.FOO_MAIN, fooMain);
    }
}
