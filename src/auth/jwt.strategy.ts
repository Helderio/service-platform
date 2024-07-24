import { Injectable } from '@nestjs/common';
import { JwtStrategy } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              ignoreExpiration: false,
              secretOrKey: 'secretKey',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findByEmail(payload.email);
        return user;
    }
}
