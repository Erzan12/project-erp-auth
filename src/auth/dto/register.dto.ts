import { IsEmail, IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SubjectRoleDto {
  @IsString()
  subject: string;

  @IsString()
  role: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  position: string;

  @IsString()
  department: string;

  @IsString()
  company: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectRoleDto)
  subjects: SubjectRoleDto[];

  @IsString()
  password: string;
}
