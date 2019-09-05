import { Controller, Post, Body, HttpException, Get } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { catchError } from 'rxjs/operators';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authSvc: AuthService) {}

  @Post('login')
  login(@Body() body: AuthDto): Observable<string> {
    return this.authSvc.login(body.email, body.password)
      .pipe(
        catchError(err => throwError(new HttpException(err, 500))),
      );
  }

  @Get('currentUser')
  currentUser() {
    return this.authSvc.getCurrentUser();
  }
}
