import { Module } from '@nestjs/common';

import { OpenbankingModule } from './openbanking/openbanking.module';
import { MungCacheModule } from './decorators/mung-cache.module';

@Module({
  imports: [OpenbankingModule, MungCacheModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
