import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UnauthorizedException, Injectable } from '@nestjs/common'
import { MessagesHelper } from "src/helpers/messages.helper";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: "email" });
    
    }

    async validate(username: string, password: string) {
        console.log(username, "email")

        const user = await this.authService.validateUser(username, password);

        if (!user)
        throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    
        return user;
    }}