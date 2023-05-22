import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local/local.strategy';
import { PrismaClient } from '@prisma/client';
import { SessionSerializer } from './strategy/sessionStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, PrismaClient, SessionSerializer, JwtStrategy]
})
export class AuthModule { }
