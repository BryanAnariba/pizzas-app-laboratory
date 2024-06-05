import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({cmd: 'register_user'})
  signUp(@Payload() signUpDto: SignUpDto) {
    return this.authService.createAccount(signUpDto);
  }

  @MessagePattern({cmd: 'login_user'})
  signIn(@Payload() signInDto: SignInDto) {
    return this.authService.signInUser(signInDto);
  }

  @MessagePattern({cmd: 'verify-token'})
  verifyToken(@Payload() token: string) {
    return this.authService.verifyToken(token);
  }
}
