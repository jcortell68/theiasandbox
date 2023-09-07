import { RpcServer } from "@theia/core";

export interface SingServer extends RpcServer<SingClient> {
    croon(): Promise<void>;
    getMessage() : Promise<string>;
};

export interface SingClient {
    swoon(): Promise<void>;
};

export const SingServer = Symbol('SingServer');
export const SingClient = Symbol('SingClient');

export const singServicePath = '/services/sing';