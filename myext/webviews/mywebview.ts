// TODO: how to get and use the @types above for type checking and code completion.
// For now, use this hack
declare let acquireVsCodeApi: any;
const vscode = acquireVsCodeApi();
import { main } from './content';

(function () {
    addEventListener('load', () => {
        main();
    });
})();