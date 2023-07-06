# Simple VS Code Extension

Build the project once the terminal as follows, assuming you've already installed node.js and yarn,
This will downloading all the project's node.js dependencies. You need to do this only once.
```
yarn
```

To work with this sample VS Code extension, just launch VS Code and feed it this directory
```
code .
```

The VS Code project is set up to dynamically build the code (using npm watch). So, as you change
code, simply look in the PROBLEMS view to ensure everything is good. To run or debug the
extension, use F5 or CTRL-F5, respectively. This will launch another instance of VS Code that has
the extsension loaded. Hit CTRL-SHIFT-P
to bring up the command palette, then select _Hello World_

# What This Demonstrates

The VS Code extensions contributes two menu items to "editor/title". One of the menu items
is associated with a command that lacks an icon. Theia should be using the command's
title (as per VS Code behavior) but instead shows the menu item in the editor title toolbar without any visual cue.