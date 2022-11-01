import { TypeOrmModule } from "@nestjs/typeorm";
import { IsEmail, isNotEmpty, IsNotEmpty, Matches } from "class-validator"
import { MessagesHelper } from "src/helpers/messages.helper";

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
    usr_password: string;

};