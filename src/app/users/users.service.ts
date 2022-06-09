import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {    
    constructor(
    @InjectRepository(UsersEntity)
    private readonly usersEntity: Repository<UsersEntity>
  ) {}

  async findAll() {
    return await this.usersEntity.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await  this.usersEntity.findOneOrFail({where:{usr_id:id}});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data) {
    return await this.usersEntity.save(this.usersEntity.create(data));
  }

  async update(id: string, data) {
    const users = await this.findOneOrFail(id);
    
    this.usersEntity.merge(users, data);
    return await this.usersEntity.save(users);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    return await this.usersEntity.delete(id);
  }

}
  
