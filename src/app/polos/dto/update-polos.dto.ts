import {PartialType} from '@nestjs/mapped-types'
import { CreatePoloDTO } from './create-polos.dto';
export class UpdatePoloDTO extends PartialType(CreatePoloDTO){}