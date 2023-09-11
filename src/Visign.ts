import * as jose from 'jose'

type SettingsJWT = {
    audience?:string|string[],
    expirationTime?:string|number,
    issuedAt?:number,
    issuer?:string,
    jti?:string,
    notBefore?:string|number,
    subject?:string
}

export type VisignPayload = jose.JWTPayload;

export default class Visign {
    private _secret:Promise<jose.KeyLike|Uint8Array>;

    constructor () {
        this._secret = jose.generateSecret('HS256');
    }

    async sign(data:jose.JWTPayload, settings?: SettingsJWT):Promise<string> {
        let jwt = new jose.SignJWT(data);
        jwt.setProtectedHeader({
            alg: 'HS256'
        });
        if(settings) {
            if(settings.audience) jwt.setAudience(settings.audience);
            if(settings.expirationTime) jwt.setExpirationTime(settings.expirationTime);
            if(settings.issuedAt) jwt.setIssuedAt(settings.issuedAt);
            if(settings.issuer) jwt.setIssuer(settings.issuer);
            if(settings.jti) jwt.setJti(settings.jti);
            if(settings.notBefore) jwt.setNotBefore(settings.notBefore);
            if(settings.subject) jwt.setSubject(settings.subject);
        }
        return jwt.sign(await this._secret);
    }
    async verify(jwt:string):Promise<jose.JWTVerifyResult> {
        return await jose.jwtVerify(jwt, await this._secret);
    }
}