import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'SBODEMOUS' })
  CompanyDB: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @ApiProperty({ example: 'manager124' })
  UserName: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  @ApiProperty({ example: 'pass1234' })
  Password: string;
}

export class AuthResponseDto {
  @IsNotEmpty()
  @IsString()
  SessionId: string;

  @IsNotEmpty()
  @IsInt()
  SessionTimeout: number;
}