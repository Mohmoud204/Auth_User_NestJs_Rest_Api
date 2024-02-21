import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Length,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'the first name very short' })
  @MaxLength(30, { message: 'the first name very long' })
  @Length(3, 10, {
    message: 'Username length must be between 3 and 10 characters',
  })
  UserName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  Password: string;
  @IsOptional()
  @IsEnum(['admin', 'user'], {
    message: 'role must be one of the following values: admin, manger, user',
  })
  role: string;
}
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  Password: string;
}
