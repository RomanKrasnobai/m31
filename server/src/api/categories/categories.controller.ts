import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category-dto';

@Controller('categories')
@ApiUseTags('M31 Categories')
export class CategoriesController {

  constructor(private categoriesSvc: CategoriesService) { }

  @Get()
  findAll(): Observable<CategoryDto[]> {
    return this.categoriesSvc.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<CategoryDto> {
    return this.categoriesSvc.findById(id);
  }

  @Post()
  create(@Body() dto: CategoryDto): Observable<CategoryDto> {
    return this.categoriesSvc.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CategoryDto): Observable<CategoryDto> {
    return this.categoriesSvc.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.categoriesSvc.delete(id);
  }

}
