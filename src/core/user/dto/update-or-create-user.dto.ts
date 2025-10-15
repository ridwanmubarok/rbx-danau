import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrCreateUserDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @IsString()
  username: string;
}