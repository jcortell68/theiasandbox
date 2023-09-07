import { SingClient, SingServer } from "../common/sing-protocol";
import { injectable } from "@theia/core/shared/inversify";

@injectable()
export class SingServerImpl implements SingServer {
    private client: SingClient;

    async croon(): Promise<void> {
        console.log("backend: Laaa la la lalalala");
        this.client.swoon();
    }
    async getMessage(): Promise<string> {
        return "Hello Cleveland!";
    }

    // Note that this implementation is oversimplistic. setClient() will be
    // called every time a client connects to the service. So we can have
    // multiple clients and technically need to keep a list of them.
    setClient(client: SingClient) {
        this.client = client;
    }

    dispose(): void {
    }
}