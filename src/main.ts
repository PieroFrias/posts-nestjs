import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('💻 POSTS API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document);

  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('SERVER_PORT')) || 9000;

  await app.listen(port);

  Logger.log(`Server running on 'http://localhost:${port}/v1'`, 'Bootstrap');
  Logger.log(`Docs running on 'http://localhost:${port}/v1/docs'`, 'Bootstrap');
}
bootstrap();
