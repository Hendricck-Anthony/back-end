import { Injectable, NotFoundException } from '@nestjs/common';
import { BackendEntity } from './entity/backend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class BackendService {    
    constructor(
    @InjectRepository(BackendEntity)
    private readonly backendEntity: Repository<BackendEntity>
  ) {}

  async findAll() {
    return await this.backendEntity.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await  this.backendEntity.findOneOrFail({where:{usr_id:id}});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data) {
    return await this.backendEntity.save(this.backendEntity.create(data));
  }

  async update(id: string, data) {
    const backend = await this.findOneOrFail(id);
    
    this.backendEntity.merge(backend, data);
    return await this.backendEntity.save(backend);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    return await this.backendEntity.delete(id);
  }

}
  
