import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vuelos')
@Controller('vuelos')
export class VuelosController {
  constructor(private readonly service: VuelosService) {}

  @Post()
  create(@Body() dto: CreateVueloDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('origen') origen?: string, @Query('estado') estado?: string) {
    return this.service.findAll(origen, estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVueloDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.service.remove(+id);
    return { message: `Vuelo ${id} eliminado` };
  }
}
