import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository, FindOneOptions } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';


@Injectable()
export class UsersService {    
    constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['usr_id', 'usr_name', 'usr_username', 'usr_email', 'usr_role']
    });
  }

  async findOneOrFail(
    conditions: FindConditions<UsersEntity>,
    options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      return await this.usersRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDTO) {
    const users = this.usersRepository.create(data);
    return await this.usersRepository.save(users);
  }

  async update(id: string, data: UpdateUserDTO) {
    const users = await this.findOneOrFail({usr_id:id});
    this.usersRepository.merge(users, data);
    return await this.usersRepository.save(users);
  }

  async deleteById(id: string) {
    await this.findOneOrFail({usr_id:id});
    return await this.usersRepository.delete(id);
  }

}

