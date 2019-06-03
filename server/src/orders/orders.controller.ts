import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('orders')
@ApiUseTags('M31')
export class OrdersController {

  @Get()
  findAll(): string {
    return 'This action returns all orders';
  }

}
