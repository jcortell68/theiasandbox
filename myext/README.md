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

The VS Code project is set up to dynamically build the code (using npm watch). So, as you change code, simply look in the PROBLEMS view to ensure everything is good.

To run the Theia electron app with the extension loaded, simply do

```text
yarn start:electron
```

Hit CTRL-SHIFT-P to bring up the command palette, then select Hello World. That command/menu is contributed by the VS Code extension.

## What this demonstrates

This VS Code extension defines a submenu called Three Stoges with three menu item (Larry, Curly and Moe). The submenu itself has a pen icon; the three (sub)menu items don't have an icon.

The submenu is contributed to various places in Theia

* "editor/title"
* "editor/title/context"
* "editor/context"
* "editor/lineNumber/context"
* "explorer/context"

The submenu appears as expected in all but the first of these locations. In that situation, the submenu appears without its icon, in the editor title toolbar. This effectively means it appears invisible. I.e., you only know the submenu is there by hovering over the toolbar area of the editor window. You end up with a hover tip that shows the name ("Three Stooges") of the submenu, revealing that the submenu is actually under the mouse pointer. If you left click there, you end up seeing the submenu finally. But then you only get the submenu icon and name, and have to click yet again to actually see the (sub)menu items. This all works intuitively in VS Code. There's obviously something not right in the Theia implementation.
