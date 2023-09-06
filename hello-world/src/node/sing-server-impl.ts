import { SingServer } from "../common/sing-protocol";
import { injectable } from "@theia/core/shared/inversify";

@injectable()
export class SingServerImpl implements SingServer {
    async croon(): Promise<void> {
        console.log("Laaa la la lalalala");
    }
    async getMessage(): Promise<string> {
        return "Hello Cleveland!";
    }
}