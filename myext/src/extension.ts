import * as vscode from 'vscode';
import * as helloworld from 'hello-world';

export async function activate(context: vscode.ExtensionContext) {
	await helloworld.foo.setHelloMessage('Hola, amigo!');
}

export function deactivate() {}
