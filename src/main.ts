
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('brio_test')
    .setDescription('api for briohr test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/briotest', app, document);

  const port = process.env.PORT || 8080;

  await app.listen(port, () => console.log(`service started and listening to localhost:${port}`));
}
bootstrap()