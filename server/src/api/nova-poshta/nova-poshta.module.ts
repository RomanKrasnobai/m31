import { Module, HttpModule } from '@nestjs/common';
import { NovaPoshtaController } from './nova-poshta.controller';
import { NovaPoshtaService } from './nova-poshta.service';
import { FirebaseModule } from '../../firebase/firebase.module';

@Module({
  imports: [HttpModule, FirebaseModule],
  controllers: [NovaPoshtaController],
  providers: [NovaPoshtaService],
})
export class NovaPoshtaModule {}
