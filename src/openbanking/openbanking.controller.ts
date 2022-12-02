import { Controller, Get } from '@nestjs/common';
import { OpenbankingService } from './openbanking.service';

@Controller('openbanking')
export class OpenbankingController {
  constructor(private readonly openbankingService: OpenbankingService) {}

  @Get()
  async getBalance() {
    return [
      await this.openbankingService.getBalance(),
      await this.openbankingService.getBalance(),
      await this.openbankingService.getBalance(),
      await this.openbankingService.getBalance(),
      await this.openbankingService.getBalance(),
      await this.openbankingService.getBalance(),
      await this.openbankingService.getBalance(),
      await this.openbankingService.getBalance(),
      await this.openbankingService.getBalance(),
    ];
  }
}
