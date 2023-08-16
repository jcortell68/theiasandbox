// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const supressContent = true;

// Simple tree data provider for our view. Just returns three items.
export class MyTreeDataProvider implements vscode.TreeDataProvider<String> {
	getTreeItem(element: String): vscode.TreeItem | Thenable<vscode.TreeItem> {
		if (supressContent) {
			return {};
		}
		else {
			return new vscode.TreeItem("" + element);
		}
	}
	getChildren(element?: String | undefined): vscode.ProviderResult<String[]> {
		if (supressContent) {
			return new Promise((resolve) => resolve([]));
		}
		else {
			return Promise.resolve(["this", "that", "whatever"]);
		}
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Trigger the bug. The welcome view we declared in package.json should
	// fill the view if the view has no content (which will be the case if we
	// don't register a tree data provider). That works in VS Code but not in
	// Theia. In Theia, you have to at least register a provider. If it
	// returns an empty collection, then the welcome view is used. So, to work
	// around the Theia bug and see the welecome voew, uncomment out this line.
	// vscode.window.registerTreeDataProvider("myextview", new MyTreeDataProvider());

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "myext" is now active. VS Code version = ' + vscode.version);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('myext.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from myext!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
