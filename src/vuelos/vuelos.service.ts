// src/vuelos/vuelos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { Vuelo } from './entities/vuelo.entity';
import { AeropuertosService } from '../aeropuertos/aeropuertos.service';

@Injectable()
export class VuelosService {
  constructor(private readonly aeropuertosService: AeropuertosService) {}

  private vuelos: Vuelo[] = [];

  // nombre simple: devuelve true/false
  private existeAeropuerto(codigo: string): boolean {
    const aeropuertos = this.aeropuertosService.findAll();
    for (let i = 0; i < aeropuertos.length; i++) {
      if (aeropuertos[i].codigo === codigo) return true;
    }
    return false;
  }

  create(dto: CreateVueloDto): Vuelo {
    if (!this.existeAeropuerto(dto.origen)) {
      throw new NotFoundException(`Aeropuerto ${dto.origen} no existe`);
    }
    if (!this.existeAeropuerto(dto.destino)) {
      throw new NotFoundException(`Aeropuerto ${dto.destino} no existe`);
    }

    const vuelo: Vuelo = {
      id: this.vuelos.length + 1,
      numeroVuelo: dto.numeroVuelo,
      fechaSalida: dto.fechaSalida,
      origen: dto.origen,
      destino: dto.destino,
      estado: dto.estado,
    };
    this.vuelos.push(vuelo);
    return vuelo;
  }

  findAll(origen?: string, estado?: string): Vuelo[] {
    const resultado: Vuelo[] = [];
    for (let i = 0; i < this.vuelos.length; i++) {
      const v = this.vuelos[i];
      if (origen && v.origen !== origen) continue;
      if (estado && v.estado !== estado) continue;
      resultado.push(v);
    }
    return resultado;
  }

  findOne(id: number): Vuelo {
    for (let i = 0; i < this.vuelos.length; i++) {
      if (this.vuelos[i].id === id) return this.vuelos[i];
    }
    throw new NotFoundException(`Vuelo con id ${id} no encontrado`);
  }

  update(id: number, dto: UpdateVueloDto): Vuelo {
    const v = this.findOne(id);
    // solo cambia el estado (requisito)
    v.estado = dto.estado;
    return v;
  }

  remove(id: number) {
    for (let i = 0; i < this.vuelos.length; i++) {
      if (this.vuelos[i].id === id) {
        this.vuelos.splice(i, 1);
        return;
      }
    }
    throw new NotFoundException(`Vuelo con id ${id} no encontrado`);
  }
}
