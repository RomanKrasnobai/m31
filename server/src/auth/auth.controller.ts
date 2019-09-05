import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authSvc: AuthService) {}

  @Post('login')
  login(@Body() body: AuthDto): Observable<string> {
    return this.authSvc.login(body.email, body.password);
  }
}
