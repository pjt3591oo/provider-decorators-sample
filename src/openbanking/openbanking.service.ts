import { Injectable } from '@nestjs/common';
import { MungCache } from 'src/decorators/cache.decorator';

@Injectable()
export class OpenbankingService {
  async getBalance() {
    return await this._fetchBalance();
  }

  @MungCache({})
  async _fetchBalance() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(parseInt(this.getRandom(10000, 10000000)));
      }, this.getRandom(100, 3000));
    });
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
}
