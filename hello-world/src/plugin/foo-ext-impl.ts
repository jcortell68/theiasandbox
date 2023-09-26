import { FooExt, FooMain, PLUGIN_RPC_CONTEXT } from '../common/plugin-api-rpc';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';

export class FooExtImpl implements FooExt {
    proxy: FooMain;

    constructor(rpc: RPCProtocol) {
        this.proxy = rpc.getProxy(PLUGIN_RPC_CONTEXT.FOO_MAIN);
    }

    getMessage(): PromiseLike<string> {
        return this.proxy.$getMessage();
    }
}
