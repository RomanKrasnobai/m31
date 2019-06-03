import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('items')
@ApiUseTags('M31')
export class ItemsController {

  @Get()
  findAll(): string {
    return 'This action returns all items';
  }

}
