import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { injectable, interfaces } from '@theia/core/shared/inversify';
import { FooExt, FooMain, MAIN_RPC_CONTEXT } from '../common/plugin-api-rpc';
import { HelloWorldCommandContribution } from './hello-world-contribution';

@injectable()
export class FooMainImpl implements FooMain {
    private readonly cmdContribution: HelloWorldCommandContribution;
    protected proxy: FooExt;

    constructor(rpc: RPCProtocol, container: interfaces.Container) {
        this.proxy = rpc.getProxy(MAIN_RPC_CONTEXT.FOO_EXT);
        this.cmdContribution = container.get(HelloWorldCommandContribution);
    }

    async $setHelloMessage(msg: string): Promise<void> {
        this.cmdContribution.setHelloMessage(msg);
    }
}
