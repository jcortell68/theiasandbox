import { MainPluginApiProvider } from '@theia/plugin-ext/lib/common/plugin-ext-api-contribution';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { interfaces, injectable } from '@theia/core/shared/inversify';

@injectable()
export class HelloWorldBakendMainPluginApiProvider implements MainPluginApiProvider {
    initialize(rpc: RPCProtocol, container: interfaces.Container): void {
        // Here we would create the main RPC object for the custom API.
        // But we won't get called from the backend. The lack of this
        // message in stdout will prove that.
        console.log('HelloWorldBakendMainPluginApiProvider.initialize() called');
    }
}
