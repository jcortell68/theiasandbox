import { createProxyIdentifier, ProxyIdentifier } from '@theia/plugin-ext/lib/common/rpc-protocol';

export interface FooMain {
    $getMessage(): PromiseLike<string>;
}
export interface FooExt {
    // Placeholder. No callbacks yet
}

export const PLUGIN_RPC_CONTEXT = {
    FOO_MAIN: <ProxyIdentifier<FooMain>>createProxyIdentifier<FooMain>('FooMain'),
};

export const MAIN_RPC_CONTEXT = {
    FOO_EXT: <ProxyIdentifier<FooExt>>createProxyIdentifier<FooExt>('FooExt'),
};
