import { ApiProperty } from '@nestjs/swagger';

export class CreatePasajeroDto {
  @ApiProperty({ default: 'Randy' })
  nombre: string;

  @ApiProperty({ default: 'Vilches' })
  apellido: string;

  @ApiProperty({ default: 'randy.vilches@outlook.es' })
  email: string;
}
