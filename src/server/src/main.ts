import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The Sun Roof Co API')
    .setDescription(
      `Query on one-to-many and many-to-many relationships between Project, Building, and Solar Panel models`,
    )
    .setVersion('1.0')
    .addTag('Nest.js')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:3000',
  });
  await app.listen(8000);
}
bootstrap();
