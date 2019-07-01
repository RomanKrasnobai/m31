import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TranslateService } from './translates.service';
import { TranslateDto } from './translate.dto';

@Controller('translates')
@ApiUseTags('M31 Translates')
export class TranslateController {

  constructor(private translateSvc: TranslateService) { }

  @Get()
  findAll(): Observable<TranslateDto> {
    return this.translateSvc.findAll();
  }

  @Get(':locale')
  find(@Param('locale') locale: string): Observable<TranslateDto> {
    return this.translateSvc.find(locale);
  }

  @Post()
  create(@Param('locale') locale: string, @Body() dto: TranslateDto): Observable<TranslateDto> {
    return this.translateSvc.create(locale, dto);
  }

  @Patch(':locale')
  update(@Param('locale') locale: string, @Body() dto: TranslateDto): Observable<TranslateDto> {
    return this.translateSvc.update(locale, dto);
  }

  @Delete(':locale')
  delete(@Param('locale') locale: string): Observable<TranslateDto> {
    return this.translateSvc.delete(locale);
  }

}
