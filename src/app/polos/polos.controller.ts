import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreatePoloDTO } from './dto/create-polos.dto';
import { UpdatePoloDTO } from './dto/update-polos.dto';
import { PolosService } from './polos.service';

  @Controller('/api/v1/polos')
  export class PolosController {
  constructor(private readonly polosService: PolosService) {}

  @Get('/searchall')
  async findAll() {
  return await this.polosService.findAll();
  }

  @Post('/createpolos')
  async create(@Body() body: CreatePoloDTO) {
    console.log(body)
    return await this.polosService.create(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.polosService.findOneOrFail(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdatePoloDTO) {
    return await this.polosService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.polosService.deleteById(id);
  }
}
