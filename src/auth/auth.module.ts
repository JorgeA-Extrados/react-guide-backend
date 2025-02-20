import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserDao } from 'src/infrastructure/database/dao/user.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenController } from './refresh-token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.jwt_secret'),
        signOptions: { expiresIn: configService.get('jwt.jwt_expires')}
      })
    })
  ],
  controllers: [AuthController, RefreshTokenController],
  providers: [AuthService, UserService, UserDao,  RefreshTokenService, JwtStrategy ],
})
export class AuthModule {}
