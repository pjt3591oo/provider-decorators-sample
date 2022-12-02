import { Module } from '@nestjs/common';
import { OpenbankingService } from './openbanking.service';
import { OpenbankingController } from './openbanking.controller';

@Module({
  providers: [OpenbankingService],
  controllers: [OpenbankingController],
})
export class OpenbankingModule {}
