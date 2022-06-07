import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { BackendService } from './backend.service';
import { BackendModule } from './backend.module';

@Controller('backend')
export class BackendController {
    constructor(private readonly backendService: BackendService) {}

    @Get()
    async findAll() {
    return await this.backendService.findAll();
  }

  @Post()
  async create(@Body() body) {
    return await this.backendService.create(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.backendService.findOneOrFail(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
    return await this.backendService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.backendService.deleteById(id);
  }
}
