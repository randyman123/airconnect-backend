// src/pasajeros/pasajeros.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PasajerosService } from './pasajeros.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pasajeros')
@Controller('pasajeros')
export class PasajerosController {
  constructor(private readonly service: PasajerosService) {}

  @Post() create(@Body() dto: CreatePasajeroDto) {
    return this.service.create(dto);
  }
  @Get() findAll() {
    return this.service.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
  @Patch(':id') update(
    @Param('id') id: string,
    @Body() dto: UpdatePasajeroDto,
  ) {
    return this.service.update(+id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    this.service.remove(+id);
    return { message: `Pasajero ${id} eliminado` };
  }
}
