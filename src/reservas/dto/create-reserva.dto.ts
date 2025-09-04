import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({ default: 1 }) vueloId: number;
  @ApiProperty({ default: 1 }) pasajeroId: number;
  @ApiProperty({ default: 'Confirmada' }) estado: string;
  @ApiProperty({ default: '2025-12-10T12:00:00Z' }) fechaReserva: string;
}
