import { Module, HttpModule } from '@nestjs/common';
import { NovaPoshtaController } from './nova-poshta.controller';
import { NovaPoshtaService } from './nova-poshta.service';

@Module({
  imports: [HttpModule],
  controllers: [NovaPoshtaController],
  providers: [NovaPoshtaService],
})
export class NovaPoshtaModule {}
