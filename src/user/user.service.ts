import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IUser, User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
    constructor(
        private readonly prismaClient: PrismaClient<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const password = await this.hashPassword(createUserDto.password)
        const user = await this.prismaClient.user.create({
            data: {
                email: createUserDto.email,
                username: createUserDto.username,
                password: password,
            }
        })
        return user;
    }

    async getUsers(): Promise<IUser[]> {
        const users = await this.prismaClient.user.findMany({ select: { id: true, email: true, username: true } });
        return users
    }

    async getUserById(id: number) {
        const user = await this.prismaClient.user.findUnique({ where: { id } })
        const { password, ...results } = user;
        return results;
    }

    async findUserByEmail(email: string): Promise<IUser> {
        const user = await this.prismaClient.user.findUnique({ where: { email } });
        return user;
    }

    async findUserByUsername(username: string): Promise<IUser> {
        const user = await this.prismaClient.user.findFirst({ where: { username } });
        // const { password, ...others } = user;
        return user;
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10)
    }
}
