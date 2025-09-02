import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { UpdateAeropuertoDto } from './dto/update-aeropuerto.dto';
import { Aeropuerto } from './entities/aeropuerto.entity';

@Injectable()
export class AeropuertosService {
  private aeropuertos: Aeropuerto[] = [];

  create(dto: CreateAeropuertoDto): Aeropuerto {
    const existe = this.aeropuertos.find((a) => a.codigo === dto.codigo); // simple
    if (existe)
      throw new BadRequestException(
        `El aeropuerto con código ${dto.codigo} ya existe`,
      );

    const aeropuerto: Aeropuerto = {
      id: this.aeropuertos.length + 1, // simple e incremental
      nombre: dto.nombre,
      codigo: dto.codigo,
      ciudad: dto.ciudad,
    };
    this.aeropuertos.push(aeropuerto);
    return aeropuerto;
  }

  findAll(): Aeropuerto[] {
    return this.aeropuertos;
  }

  findOne(id: number): Aeropuerto {
    const a = this.aeropuertos.find((a) => a.id === id);
    if (!a)
      throw new NotFoundException(`Aeropuerto con id ${id} no encontrado`);
    return a;
  }

  update(id: number, dto: UpdateAeropuertoDto): Aeropuerto {
    const a = this.findOne(id);
    a.nombre = dto.nombre;
    a.codigo = dto.codigo;
    a.ciudad = dto.ciudad;
    return a;
  }

  remove(id: number): void {
    const i = this.aeropuertos.findIndex((a) => a.id === id);
    if (i === -1)
      throw new NotFoundException(`Aeropuerto con id ${id} no encontrado`);
    this.aeropuertos.splice(i, 1);
  }
}
