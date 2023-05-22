import { UnauthorizedException } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super();
    }

    serializeUser(user: any, done: Function) {
        console.log("serializeUser");
        done(null, user)
    }
    async deserializeUser(user: any, done: Function) {
        console.log("deserializeUser");
        const userDb = await this.userService.findUserByUsername(user.username)
        return userDb ? done(null, user) : done(new UnauthorizedException(), null)
    }

}