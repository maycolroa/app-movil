import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  fullName?: string;
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsOptional()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password?: string;
}
