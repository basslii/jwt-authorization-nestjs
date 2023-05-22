import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport"
import { UserService } from "src/user/user.service";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    async validate(username: string, password: string) {
        console.log("validate in LocalStrategy")
        const user = await this.authService.validateUser(username, password);
        // const { password, ...results } = user;

        if (!user) throw new UnauthorizedException()
        return user;
    }
}