import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { Pasajero } from './entities/pasajero.entity';

@Injectable()
export class PasajerosService {
  private pasajeros: Pasajero[] = [];

  create(dto: CreatePasajeroDto): Pasajero {
    const existe = this.pasajeros.find((p) => p.email === dto.email);
    if (existe)
      throw new BadRequestException(
        `Ya existe un pasajero con el email ${dto.email}`,
      );

    const pasajero: Pasajero = {
      id: this.pasajeros.length + 1,
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
    };
    this.pasajeros.push(pasajero);
    return pasajero;
  }

  findAll(): Pasajero[] {
    return this.pasajeros;
  }

  findOne(id: number): Pasajero {
    const p = this.pasajeros.find((x: Pasajero) => x.id === id);
    if (!p) throw new NotFoundException(`Pasajero con id ${id} no encontrado`);
    return p;
  }

  update(id: number, dto: UpdatePasajeroDto): Pasajero {
    const p = this.findOne(id);
    p.nombre = dto.nombre;
    p.apellido = dto.apellido;
    p.email = dto.email;
    return p;
  }

  remove(id: number): void {
    for (let i = 0; i < this.pasajeros.length; i++) {
      if (this.pasajeros[i].id === id) {
        this.pasajeros.splice(i, 1);
        return;
      }
    }
    throw new NotFoundException(`Pasajero con id ${id} no encontrado`);
  }
}
