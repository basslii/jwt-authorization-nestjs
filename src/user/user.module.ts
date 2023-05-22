import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClient } from '@prisma/client';
import { JwtStrategy } from 'src/auth/strategy/jwt/jwt.strategy';

@Module({
  providers: [UserService, PrismaClient, JwtStrategy],
  controllers: [UserController],
})
export class UserModule { }
