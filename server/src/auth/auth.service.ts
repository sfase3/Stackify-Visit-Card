import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);

        if (!user)
            throw new BadRequestException('Email is not registred!');

        const passwordIsMatch = await argon2.verify(user.password, password);
        if (passwordIsMatch)
            return user;

        throw new UnauthorizedException('Email or passwrod is wrong!');
    }

    async login(user: IUser, res: Response) {
        const {id, email} = user;

        const jwt = await this.jwtService.signAsync({id: id, email: email});
        res.cookie('jwt', jwt, { httpOnly: true });
        res.cookie('user', user, { httpOnly: true });

        return {
            message: 'Success login!',
        };
    }

    async logout(res: Response) {
        res.clearCookie('jwt');
        res.clearCookie('user');

        return {
            message: 'Success logout!',
        };
    }
}
