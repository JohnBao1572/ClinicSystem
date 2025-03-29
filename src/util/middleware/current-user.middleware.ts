

import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
            next();
        } else {
            const token = authHeader.split(' ')[1];
            const secret = process.env.Acc_Token
            if (!secret) {
                throw new Error('Token invalid')
            }

            try {
                const { id } = <JwtPayload>verify(token, secret)
                const currentUser = await this.userService.findOne(+id)
                req.currentUser = currentUser
                console.log(currentUser)
            } catch (error) {
                throw new Error(error)
            }
            next();
        }
    }
}

interface CustomJwtPayload extends JwtPayload {
    id: string;
}