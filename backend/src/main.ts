import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    console.warn('\x1b[31m%s\x1b[0m', 'CORS is enabled for development reason');
    app.enableCors();
  }

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
