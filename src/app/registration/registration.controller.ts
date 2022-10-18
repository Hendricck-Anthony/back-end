import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateRegistrationDTO } from './dto/create-registration.dto';
import { UpdateRegistrationDTO } from './dto/update-registration.dto';
import { RegistrationService } from './registration.service';

  @Controller('/api/v1/registration')
  export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Get('/searchall')
  async findAll() {
  return await this.registrationService.findAll();
  }

  @Post('/createregistration')
  async create(@Body() body: CreateRegistrationDTO) {
    console.log(body)
    return await this.registrationService.create(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.registrationService.findOneOrFail(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateRegistrationDTO) {
    return await this.registrationService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.registrationService.deleteById(id);
  }
}
