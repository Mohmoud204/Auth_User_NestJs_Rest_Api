import { PartialType } from '@nestjs/mapped-types';
import { SigninDto } from './create-auth_user.dto';

export class UpdateAuthUserDto extends PartialType(SigninDto) {}
