import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { JwtSecret } from 'src/utils/constants';
import { Request, Response } from "express"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<IUser | any> {
        const user = await this.userService.findUserByEmail(email);

        if (!user) throw new UnauthorizedException("wrong credentials");

        if (pass !== user.password) throw new UnauthorizedException("wrong credentials");

        const { password, ...results } = user;
        return results;
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('token')
        return res.send({ message: "user logged out successfully" })
    }

    async signin(user: IUser, req: Request, res: Response) {
        const foundUser = await this.userService.findUserByEmail(user.email);

        if (!foundUser) throw new BadRequestException("wrong credentials")

        const matchedPassword = await bcrypt.compare(user.password, foundUser.password)

        if (!matchedPassword) throw new BadRequestException("wrong credentials")

        const token = await this.signToken({ id: foundUser.id, email: foundUser.email });

        if (!token) throw new ForbiddenException()

        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 })

        return res.send({ message: 'logged in successfully' })
    }

    async signToken(args: { id: number, email: string }) {
        const payload = args;
        return await this.jwtService.signAsync(payload, { secret: JwtSecret })
    }
}
