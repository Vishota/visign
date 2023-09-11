import * as jose from 'jose';
type SettingsJWT = {
    audience?: string | string[];
    expirationTime?: string | number;
    issuedAt?: number;
    issuer?: string;
    jti?: string;
    notBefore?: string | number;
    subject?: string;
};
export type VisignPayload = jose.JWTPayload;
export default class Visign {
    private _secret;
    constructor();
    sign(data: jose.JWTPayload, settings?: SettingsJWT): Promise<string>;
    verify(jwt: string): Promise<jose.JWTVerifyResult>;
}
export {};
