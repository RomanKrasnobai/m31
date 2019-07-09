import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): string {
    return `
      <div><a href="app/e-shop">E-Shop</a></div>
      <div><a href="app/admin">Admin</a></div>
      <div><a href="app/swagger">Swagger</a></div>
    `;
  }
}
