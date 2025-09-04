import { ApiProperty } from '@nestjs/swagger';

export class CreateVueloDto {
  @ApiProperty({ default: 'LA123' }) numeroVuelo: string;
  @ApiProperty({ default: '2025-09-10T10:00:00Z' }) fechaSalida: string;

  @ApiProperty({ default: 'SCL' }) origen: string;
  @ApiProperty({ default: 'LIM' }) destino: string;

  @ApiProperty({ default: 'Programado' }) estado: string;
}
