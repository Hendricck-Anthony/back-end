import { Injectable, NotFoundException } from '@nestjs/common';
import { PolosEntity } from './entity/polos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePoloDTO } from './dto/create-polos.dto';
import { UpdatePoloDTO } from './dto/update-polos.dto';


@Injectable()
export class PolosService {    
    constructor(
    @InjectRepository(PolosEntity)
    private readonly polosEntity: Repository<PolosEntity>
  ) {}

  async findAll() {
    return await this.polosEntity.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await  this.polosEntity.findOneOrFail({where:{pol_id:id}});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreatePoloDTO) {
    return await this.polosEntity.save(this.polosEntity.create(data));
  }

  async update(id: string, data: UpdatePoloDTO) {
    const polos = await this.findOneOrFail(id);
    
    this.polosEntity.merge(polos, data);
    return await this.polosEntity.save(polos);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    return await this.polosEntity.delete(id);
  }

}
  
