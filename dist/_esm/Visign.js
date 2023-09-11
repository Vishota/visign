var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jose from 'jose';
export default class Visign {
    constructor() {
        this._secret = jose.generateSecret('HS256');
    }
    sign(data, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwt = new jose.SignJWT(data);
            jwt.setProtectedHeader({
                alg: 'HS256'
            });
            if (settings) {
                if (settings.audience)
                    jwt.setAudience(settings.audience);
                if (settings.expirationTime)
                    jwt.setExpirationTime(settings.expirationTime);
                if (settings.issuedAt)
                    jwt.setIssuedAt(settings.issuedAt);
                if (settings.issuer)
                    jwt.setIssuer(settings.issuer);
                if (settings.jti)
                    jwt.setJti(settings.jti);
                if (settings.notBefore)
                    jwt.setNotBefore(settings.notBefore);
                if (settings.subject)
                    jwt.setSubject(settings.subject);
            }
            return jwt.sign(yield this._secret);
        });
    }
    verify(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jose.jwtVerify(jwt, yield this._secret);
        });
    }
}
