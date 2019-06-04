import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { OrdersService } from './services/orders.service';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
@ApiUseTags('M31 Orders')
export class OrdersController {

  constructor(private orderSvc: OrdersService) { }

  @Get()
  findAll(): Observable<OrderDto[]> {
    return this.orderSvc.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<OrderDto> {
    return this.orderSvc.findById(id);
  }

  @Post()
  create(@Body() dto: OrderDto): Observable<OrderDto> {
    return this.orderSvc.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: OrderDto): Observable<OrderDto> {
    return this.orderSvc.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.orderSvc.delete(id);
  }

}
