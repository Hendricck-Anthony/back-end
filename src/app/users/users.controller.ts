import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

  @Controller('/api/v1/users')
  export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/searchall')
  async findAll() {
  return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() body) {
    console.log(body)
    return await this.usersService.create(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneOrFail(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.deleteById(id);
  }
}
