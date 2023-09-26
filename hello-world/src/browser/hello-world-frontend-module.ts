import { HelloWorldCommandContribution, HelloWorldMenuContribution } from './hello-world-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { MainPluginApiProvider } from '@theia/plugin-ext/lib/common/plugin-ext-api-contribution';
import { HelloWorldMainPluginApiProvider } from './hello-world-main-plugin-provider';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(HelloWorldCommandContribution);
    bind(MenuContribution).to(HelloWorldMenuContribution);
    bind(MainPluginApiProvider).to(HelloWorldMainPluginApiProvider).inSingletonScope();
});
