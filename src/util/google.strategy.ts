import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from 'dotenv'
config()

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.Google_Client_ID as string,
            clientSecret: process.env.Google_Secret_ID as string,
            callbackURL: 'http://localhost:3000/api/v1/user/google/redirect',
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
    }

    async validate(
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        console.log("Google profile received:", profile);

        if (!profile || !profile.emails || profile.emails.length === 0) {
            return done(new UnauthorizedException('Google profile is empty or invalid'), false);
        }

        const user = {
            email: profile.emails?.[0]?.value || 'No email',
            firstName: profile.name?.givenName || 'No first name',
            lastName: profile.name?.familyName || 'No last name',
            picture: profile.photos?.[0]?.value || 'No picture',
            accessToken,
        };

        return done(null, user);
    }
}