import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { injectable, interfaces } from '@theia/core/shared/inversify';
import { FooExt, FooMain, MAIN_RPC_CONTEXT } from '../common/plugin-api-rpc';

@injectable()
export class FooMainImpl implements FooMain {
    protected proxy: FooExt;

    constructor(rpc: RPCProtocol, container: interfaces.Container) {
        this.proxy = rpc.getProxy(MAIN_RPC_CONTEXT.FOO_EXT);
    }

    async $getMessage(): Promise<string> {
        return "The quick brown fox";
    }
}
