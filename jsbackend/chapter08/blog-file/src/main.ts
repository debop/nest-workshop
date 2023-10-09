import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './common/logger/logger.winston';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: winstonLogger, // process.env.NODE_ENV !== 'prod' ? undefined : winstonLogger,
    });
    await app.listen(3000);
}

bootstrap();
