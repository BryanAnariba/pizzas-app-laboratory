import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { SignUpDto } from './dtos/sign-up.dto';
import { BCrypt, envs } from 'src/config';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AuthService');
  
  constructor (private jwtService: JwtService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('DataBase Connected!');
  }

  async signJWT (payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private async getUserByEmail (email: string) {
    const user = await this.user.findFirst({
      where: {
        email: email,
      }
    });
    return user;
  }

  async createAccount(signUpDto: SignUpDto) {
    const {name, email, phone, role} = signUpDto;
    try {
      const user = await this.getUserByEmail(email);
      if (user) throw new RpcException({status: 400, message: 'User already exists'});
      const newUser = await this.user.create({
        data: {
          email: email,
          name: name.toUpperCase(),
          phone: phone,
          role: role,
          password: BCrypt.encryptPassword(signUpDto.password),
        }
      });
      const {password, ...restOfUser} = newUser;
      return {
        user: restOfUser,
        token: await this.signJWT({code: restOfUser.code, email: restOfUser.email, name: restOfUser.name}),
      }
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({status: 400, message: `Sometime went wrong creating user: ${error}`});
    }
  }

  async signInUser(signInDto: SignInDto) {

    const user = await this.getUserByEmail(signInDto.email);
    
    if (!user) throw new RpcException({status: 400, message: 'Invalid Credentials!'});
    if (user.isDeleted) throw new RpcException({status: 400, message: 'Inactive usser, please contact the admin!'});
    if (!BCrypt.comparePasswords(signInDto.password, user.password)) throw new RpcException({status: 400, message: 'Invalid Credentials!'});
    const {password, ...restOfUser} = user;
    return {
      user: restOfUser,
      token: await this.signJWT({code: restOfUser.code, email: restOfUser.email, name: restOfUser.name}),
    }
  }

  async verifyToken (token: string) {
    try {
      const { sub, iat, exp, ...user} = this.jwtService.verify(token, {secret: envs.jwtSecret});
      return {
        user:  user,
        token: await this.signJWT({code: user.code, email: user.email, name: user.name}),
      };
    } catch (error) {
      throw new RpcException({status: 401, message: `Not valid token!`});
    }
  }

}
