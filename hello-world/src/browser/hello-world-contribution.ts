import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';
import { SingServer } from '../common/sing-protocol';

export const HelloWorldCommand: Command = {
    id: 'HelloWorld.command',
    label: 'Say Hello from Theia Extension'
};

@injectable()
export class HelloWorldCommandContribution implements CommandContribution {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(SingServer) private readonly singServerProxy : SingServer
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(HelloWorldCommand, {
            execute: () => {
                const promise = this.singServerProxy.getMessage();
                promise.then((msg) => {
                    this.messageService.info(msg);
                });

                this.singServerProxy.croon();
            }
        });
    }
}

@injectable()
export class HelloWorldMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: HelloWorldCommand.id,
            label: HelloWorldCommand.label
        });
    }
}
