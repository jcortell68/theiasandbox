import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';
import { HostedPluginSupport } from '@theia/plugin-ext/lib/hosted/browser/hosted-plugin';

export const HelloWorldCommand: Command = {
    id: 'HelloWorld.command',
    label: 'Say Hello'
};

@injectable()
export class HelloWorldCommandContribution implements CommandContribution {
    private message = "Hello, friend!";

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(HostedPluginSupport) private readonly hostedPluginSupport: HostedPluginSupport,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(HelloWorldCommand, {
            execute: async () => {
                // Activate any plugin that declares it wants to be activated
                // when we're about to say Hello to the user. This activation
                // event guarantees the plugins' activate() method completes
                // prior to us putting up the message. This is important because
                // the plugin can affect what we say via the custom plugin API
                // namespace this Theia extension makes available to it. I.e.,
                // if the plugin's activate() uses the plugin API to set the
                // message and does so with an 'await', the plugin can rest
                // assured the user will see its message.
                await this.hostedPluginSupport.activateByEvent('onSayHello');

                this.messageService.info(this.message);
            }
        });
    }

    // This is wired to the custom plugin API namespace. I.e., a plugin
    // can tell us how to say hello.
    setHelloMessage(msg: string) : void {
        this.message = msg;
    }
}

@injectable()
export class HelloWorldMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.HELP, {
            commandId: HelloWorldCommand.id,
            label: HelloWorldCommand.label
        });
    }
}
