import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ItemsService } from './services/items.service';
import { Observable } from 'rxjs';
import { ItemDto } from './dto/item.dto';

@Controller('items')
@ApiUseTags('M31 Items')
export class ItemsController {

  constructor(private itemSvc: ItemsService) { }

  @Get()
  findAll(): Observable<ItemDto[]> {
    return this.itemSvc.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<ItemDto> {
    return this.itemSvc.findById(id);
  }

  @Post()
  create(@Body() dto: ItemDto): Observable<ItemDto> {
    return this.itemSvc.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ItemDto): Observable<ItemDto> {
    return this.itemSvc.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.itemSvc.delete(id);
  }

}
