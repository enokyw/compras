import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  CompanyDB: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  UserName: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
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