export function activate() {
	console.log('myext standard extension has been activated.');

	setInterval(() => {
        console.log('standard extension heartbeat');
    }, 1000);
}

export function deactivate() {
	console.log('myext standard extension has been activated.');
}
