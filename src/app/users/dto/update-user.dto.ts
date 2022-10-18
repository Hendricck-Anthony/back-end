import {PartialType} from '@nestjs/mapped-types'
import { CreateUserDTO } from './create-user.dto';
import { IsEmail, isNotEmpty, IsNotEmpty, Matches } from "class-validator"
import { RegExHelper } from "src/helpers/regex.helper";

export class UpdateUserDTO extends PartialType(CreateUserDTO){

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
    @Matches(RegExHelper.password)
    usr_password: string;
}