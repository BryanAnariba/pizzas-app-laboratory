import { Controller, Post, Body, Inject, Get, Req, UseGuards } from '@nestjs/common';
import { ClientModuleNames } from 'src/enums';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { SignUpDto } from 'src/domain/dtos/auth/sign-up';
import { SignInDto } from 'src/domain/dtos/auth/sign-in';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { LoggedUser } from './interface';

@Controller('auth')
export class AuthController {
  
  constructor (
    @Inject(ClientModuleNames.NATS_SERVICES) private readonly natsClient: ClientProxy,
  ) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.natsClient.send({cmd: 'register_user'}, signUpDto)
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.natsClient.send({cmd: 'login_user'}, signInDto)
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@User() user: LoggedUser, @Token() token: string) {

    return {user,token}

    // return this.natsClient.send({cmd: 'verify-token'}, {})
    //   .pipe(
    //     catchError(
    //       error => {
    //         throw new RpcException(error);
    //       }
    //     )
    //   )
  }
}
