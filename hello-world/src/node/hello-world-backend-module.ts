import { ContainerModule } from '@theia/core/shared/inversify';
import { ExtPluginApiProvider } from '@theia/plugin-ext';
import { ExtPluginHelloWorldApiProvider } from './ext-plugin-hello-world-api-provider';

export default new ContainerModule(bind => {
    bind(Symbol.for(ExtPluginApiProvider)).to(ExtPluginHelloWorldApiProvider).inSingletonScope();
});
