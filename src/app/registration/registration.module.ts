import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { RegistrationEntity } from './entity/registration.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RegistrationEntity])],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService]
})
export class RegistrationModule {}
