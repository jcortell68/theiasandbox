// This function is called when your extension is activated
export async function activate(): Promise<void> {
    console.log('myext headless extension has been activated.');
    setInterval(() => {
        console.log('headless extension heartbeat');
    }, 1000);
}

// This function is called when your extension is deactivated
export function deactivate(): void {
    console.log('myext headless extension has been deactivated.');
}
