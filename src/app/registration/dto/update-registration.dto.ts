import {PartialType} from '@nestjs/mapped-types'
import { CreateRegistrationDTO } from './create-registration.dto';
export class UpdateRegistrationDTO extends PartialType(CreateRegistrationDTO){}