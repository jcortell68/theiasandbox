import { render } from 'react-dom';
import React, { KeyboardEvent, useState, useEffect, useRef } from 'react';

let vscode: any;

export function main(_vscode: any): void {
    vscode = _vscode;

    render(<MyComponent />, document.getElementById('app'));
}

export default function MyComponent() {
    return (
        <h1>Hello World from a React component in a webview!
        </h1>
    );
}