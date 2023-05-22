import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { JwtSecret } from "src/utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
            ]),
            secretOrKey: JwtSecret,
        })
    }

    private static extractJWT(req: Request): string | null {
        if (req.cookies && 'token' in req.cookies) {
            return req.cookies.token
        }
        return null;
    }

    async validate(payload: { id: number, email: string }) {
        return payload;
    }
}