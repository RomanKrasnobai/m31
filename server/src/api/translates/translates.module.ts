import { Module } from '@nestjs/common';
import { FirebaseModule } from '../../firebase/firebase.module';
import { TranslateService } from './translates.service';
import { TranslateController } from './translates.controller';

@Module({
  imports: [FirebaseModule],
  providers: [TranslateService],
  controllers: [TranslateController],
})
export class TranslatesModule { }
