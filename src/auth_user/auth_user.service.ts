import { Injectable } from '@nestjs/common';
import { SigninDto, LoginDto } from './dto/create-auth_user.dto';
import { UpdateAuthUserDto } from './dto/update-auth_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth_user.entity';
import * as bcrypt from 'bcryptjs';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Return_Login, Refresh_token } from './dto/Interface_All_Data';
import { Response ,Request} from 'express';
@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }
  async Sign(SigninDto: SigninDto): Promise<User> {
    const { UserName, Email, Password} = SigninDto;
    if (
      UserName.trim().length === 0 ||
      Email.trim().length === 0 ||
      Password.trim().length === 0
    ) {
      throw new BadRequestException('There is empty data...');
    }
    const found_Email = await this.usersRepository.findOne({
      where: { Email },
    });
    if (found_Email) {
      throw new BadRequestException('Email already exists...');
    }

    const saltOrRounds = 10;
    const Password_hash = await bcrypt.hash(Password, saltOrRounds);
    const NewData = await this.usersRepository.create({
      UserName,
      Email,
      Password: Password_hash,
      
    });
    return await this.usersRepository.save(NewData);
  }
  async Login(LoginDto: LoginDto, res: Response): Promise<Return_Login> {
    const { Email, Password } = LoginDto;
    if (Email.trim().length === 0 || Password.trim().length === 0) {
      throw new BadRequestException('There is empty data...');
    }

    const found_Email = await this.usersRepository.findOne({
      where: { Email },
    });
    if (!found_Email) {
      throw new UnauthorizedException('The email does not exist before...');
    }
    const isMatch = await bcrypt.compare(Password, found_Email.Password);
    if (!isMatch) {
      throw new BadRequestException('Wrong email or password...');
    }
    const payload = { id: found_Email.id, role: found_Email.role };
    const access_token = await this.jwtService.sign(payload);
    const refresh_token = await this.jwtService.sign({ id: found_Email.id }, {expiresIn: '30d'})
    res.cookie("token",refresh_token,{httpOnly:true, secure:true})
    res.header("Access-Control-Allow-Credentials",'true')
    return {
      access_token,
      
      UserName: found_Email.UserName,
    };
  }
  async Findall(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async RefreshToken(id): Promise<Refresh_token> {
    const found_Email = await this.usersRepository.findOne({
      where: { id:id },
    });
      
    if (!found_Email) {
      throw new UnauthorizedException('The email does not exist before...');
    }
    const payload = { id: found_Email.id, role: found_Email.role };
    const access_token = await this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
