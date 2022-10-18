import { TypeOrmModule } from "@nestjs/typeorm";
import { IsEmail, isNotEmpty, IsNotEmpty, Matches } from "class-validator"
import { MessagesHelper } from "src/helpers/messages.helper";
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateUserDTO {
    
    @IsNotEmpty()
    usr_name: string;
    
    @IsNotEmpty()
    usr_username: string;

    @IsNotEmpty()
    @IsEmail()
    usr_email: string;
    
    @IsNotEmpty()
    usr_role: string;
    
    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;

};