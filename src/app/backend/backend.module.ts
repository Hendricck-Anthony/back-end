import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendController } from './backend.controller';
import { BackendService } from './backend.service';
import { BackendEntity } from './entity/backend.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BackendEntity])],
  controllers: [BackendController],
  providers: [BackendService],
  exports: [BackendService]
})
export class BackendModule {}
