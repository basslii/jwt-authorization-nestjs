import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './entities/createUserDto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt/jwt.guard';


@Controller('api/users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    };

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    };

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param() params: { id: number }) {

        return await this.userService.getUserById(+params.id);
    }
}
