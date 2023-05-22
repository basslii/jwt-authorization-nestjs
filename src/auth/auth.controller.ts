import { Body, Controller, Get, Post, Req, Request, Res, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './strategy/local/local.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/entities/createUserDto';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    // @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signin(@Body() createUserDto: CreateUserDto, @Req() req, @Res() res) {
        const { email, password } = createUserDto
        return this.authService.signin(createUserDto, req, res)
    }

    @Get('session')
    async getAuthSession(@Req() req, @Res() res) {
        console.log("res", res);
        // console.log("session id", session.id);
        // return session;
        // console.log()
        // return;
    }

    @Get('signout')
    async signout(@Req() req, @Res() res) {
        return await this.authService.signout(req, res)
    }
}
