# Simple VS Code Extension

Build the project once the terminal as follows, assuming you've already installed node.js and yarn,
This will downloading all the project's node.js dependencies. You need to do this only once.

```text
yarn
```

To work with this sample VS Code extension, just launch VS Code and feed it this directory

```text
code .
```

The VS Code project is set up to dynamically build the code (using npm watch). So, as you change
code, simply look in the PROBLEMS view to ensure everything is good.

To run the Theia electron app with the extension loaded, simply do

```text
yarn start:electron
```

Hit CTRL-SHIFT-P to bring up the command palette, then select _Hello World_. That command/menu is
contributed by the VS Code extension.

## What This Demonstrates

The VS Code extensions contributes two menu items to "editor/title/run". In VS Code, they
appear as a submenu item called "Run or Debug...". In Theia, they appear sams as if they
had been contributed to "editor/title".
