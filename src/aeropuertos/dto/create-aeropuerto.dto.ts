import { ApiProperty } from '@nestjs/swagger';

export class CreateAeropuertoDto {
  @ApiProperty({ default: 'Arturo Merino Benítez' })
  nombre: string;

  @ApiProperty({ default: 'SCL', description: 'Código IATA (3 letras)' })
  codigo: string;

  @ApiProperty({ default: 'Santiago' })
  ciudad: string;
}
