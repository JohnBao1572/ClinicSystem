import { CanActivate, ExecutionContext, Injectable, mixin, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const allowedRoles = this.reflector.get<string[]>('allowedRoles', context.getHandler());
        const request = context.switchToHttp().getRequest();

        if (!request.currentUser) {
            throw new UnauthorizedException('User not authenticated');
        }

        if (!request.currentUser.role) {
            throw new UnauthorizedException('User role is undefined');
        }

        // Nếu role là string, chuyển thành mảng
        const userRoles = Array.isArray(request.currentUser.role) ? request.currentUser.role : [request.currentUser.role];

        // const result = request?.currentUser.roles.map((role: string) => allowedRoles.includes(role)).find((val: boolean) => val === true)
        const result = userRoles.some((role: string) => allowedRoles.includes(role));
        if (result) return true
        throw new UnauthorizedException('Sorry, you not have authorized')
    }
}

