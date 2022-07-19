import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolosController } from './polos.controller';
import { PolosService } from './polos.service';
import { PolosEntity } from './entity/polos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PolosEntity])],
  controllers: [PolosController],
  providers: [PolosService],
  exports: [PolosService]
})
export class PolosModule {}
