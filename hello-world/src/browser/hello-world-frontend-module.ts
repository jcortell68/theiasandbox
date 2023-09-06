/**
 * Generated using theia-extension-generator
 */
import { HelloWorldCommandContribution, HelloWorldMenuContribution } from './hello-world-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { SingServer, singServicePath } from '../common/sing-protocol';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(HelloWorldCommandContribution);
    bind(MenuContribution).to(HelloWorldMenuContribution);

    bind(SingServer).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<SingServer>(singServicePath);
    }).inSingletonScope();
});
