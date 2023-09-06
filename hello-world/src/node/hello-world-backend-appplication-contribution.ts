import { BackendApplicationContribution } from '@theia/core/lib/node';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class HelloWorldBackendApplicationContribution implements BackendApplicationContribution {
    async initialize(): Promise<void> {
        console.log("HelloWorldBackendApplicationContribution.initialize() called");
    }
}
