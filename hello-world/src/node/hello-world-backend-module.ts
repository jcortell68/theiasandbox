import { ContainerModule } from '@theia/core/shared/inversify';
import { ExtPluginApiProvider } from '@theia/plugin-ext';
import { ExtPluginHelloWorldApiProvider } from './ext-plugin-hello-world-api-provider';
import { MainPluginApiProvider } from '@theia/plugin-ext/lib/common/plugin-ext-api-contribution';
import { HelloWorldBakendMainPluginApiProvider } from './hello-world-backend-main-plugin-provider';

export default new ContainerModule(bind => {
    bind(Symbol.for(ExtPluginApiProvider)).to(ExtPluginHelloWorldApiProvider).inSingletonScope();

    // Would like to introduce a custom API namespace that's implemented
    // in the backend and not the frontend. However, MainPluginApiProvider
    // is injected only by the frontend code of @theia/plugin-ext. I.e.,
    // this binding will be pointless. No code in the Theia backend will
    // inject a MainPluginApiProvider, and that provider contribution is
    // what allows for the mainland side of plugin API to be initialized.
    bind(MainPluginApiProvider).to(HelloWorldBakendMainPluginApiProvider).inSingletonScope();
});
