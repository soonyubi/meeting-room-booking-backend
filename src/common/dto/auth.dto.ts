import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  employeeNumber: string;
}

export class LoginResponseDto {
  accessToken: string;
  user: {
    id: number;
    employeeNumber: string;
    name: string;
  };
}
