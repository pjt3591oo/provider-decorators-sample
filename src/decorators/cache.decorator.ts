/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, SetMetadata } from '@nestjs/common';

export const MUNG_CACHE_METADATA = 'MUNG_CACHE_METADATA';

export interface MungCacheOptions {
  key?: string;
  ttl?: number;
  validate?: (value: any) => boolean;
  logger?: Function;
}

export function MungCache(options: MungCacheOptions = {}): MethodDecorator {
  // applyDecorators는 사용하지 않아도 됨
  // 데코레이터 체이닝에 대한 가능성을 염두에 두고 작업하였음
  return applyDecorators(
    // method에 대한 metadata를 정의함
    // 나중에 `MetadataScanner`를 통해서 값을 가져옴
    SetMetadata(MUNG_CACHE_METADATA, options),
  );
}
