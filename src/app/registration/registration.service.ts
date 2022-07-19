import { Injectable, NotFoundException } from '@nestjs/common';
import { RegistrationEntity } from './entity/registration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationDTO } from './dto/create-registration.dto';
import { UpdateRegistrationDTO } from './dto/update-registration.dto';


@Injectable()
export class RegistrationService {    
    constructor(
    @InjectRepository(RegistrationEntity)
    private readonly registrationEntity: Repository<RegistrationEntity>
  ) {}

  async findAll() {
    return await this.registrationEntity.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await  this.registrationEntity.findOneOrFail({where:{mat_id:id}});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateRegistrationDTO) {
    return await this.registrationEntity.save(this.registrationEntity.create(data));
  }

  async update(id: string, data: UpdateRegistrationDTO) {
    const registration = await this.findOneOrFail(id);
    
    this.registrationEntity.merge(registration, data);
    return await this.registrationEntity.save(registration);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    return await this.registrationEntity.delete(id);
  }

}
  
