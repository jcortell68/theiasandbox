import * as path from 'path';
import { injectable } from '@theia/core/shared/inversify';
import { ExtPluginApi, ExtPluginApiProvider } from '@theia/plugin-ext';

@injectable()
export class ExtPluginHelloWorldApiProvider implements ExtPluginApiProvider {
    provideApi(): ExtPluginApi {
        return {
            backendInitPath: path.join(__dirname, '../plugin/hello-world-api-init')
        };
    }
}
