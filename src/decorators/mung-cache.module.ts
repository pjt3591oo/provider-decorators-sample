import {
  DiscoveryModule,
  DiscoveryService,
  MetadataScanner,
  Reflector,
} from '@nestjs/core';
import {
  CACHE_MANAGER,
  CacheModule,
  DynamicModule,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MungCacheOptions, MUNG_CACHE_METADATA } from './cache.decorator';

@Module({
  imports: [DiscoveryModule, CacheModule.register()],
})
export class MungCacheModule implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,

    private readonly reflector: Reflector,

    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  static forRoot(): DynamicModule {
    return {
      module: MungCacheModule,
      global: true,
    };
  }

  onModuleInit() {
    this.registerAllCache();
  }

  registerAllCache() {
    this.discovery
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance }) => {
        this.scanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),

          this.registerCacheAndJob(instance),
        );
      });
  }

  registerCacheAndJob(instance) {
    const { cacheManager, reflector } = this;
    return (methodName) => {
      const methodRef = instance[methodName];
      const metadata: MungCacheOptions = reflector.get(
        MUNG_CACHE_METADATA,
        methodRef,
      );

      if (!metadata) return;

      const {
        ttl = 4000,
        key: customKey,
        validate = () => true,
        logger = () => null,
      } = metadata;

      const cacheKeyPrefix = `${instance.constructor.name}.${methodName}`;

      // 원본함수 가져오기
      const originMethod = (...args: unknown[]) =>
        methodRef.call(instance, ...args);

      // 3. 함수 확장
      instance[methodName] = async (...args: unknown[]) => {
        const key = customKey
          ? customKey
          : args.length
          ? JSON.stringify(args)
          : null;
        const cacheKeySuffix = key ? `(${key})` : '';
        const cacheKey = cacheKeyPrefix + cacheKeySuffix;
        const cached = await cacheManager.get(cacheKey);

        if (Boolean(cached)) {
          return cached;
        }

        // 캐시된 데이터가 없다면, 원본 메소드를 실행하여 값을 가져옵니다.
        const data = await originMethod(...args);

        if (!validate(data)) {
          throw new Error('cache error');
        }

        await cacheManager.set(cacheKey, data, ttl);
        return data;
      };
    };
  }
}
