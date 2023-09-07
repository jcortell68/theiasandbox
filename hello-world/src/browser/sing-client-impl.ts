import { SingClient } from "../common/sing-protocol";

export class SingClientImpl implements SingClient {
    async swoon(): Promise<void> {
        console.log("frontend: thud!")
    }
};
