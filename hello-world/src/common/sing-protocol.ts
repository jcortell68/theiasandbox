export interface SingServer {
    croon(): Promise<void>;
    getMessage() : Promise<string>;
};

export const SingServer = Symbol('SingServer');

export const singServicePath = '/services/sing';