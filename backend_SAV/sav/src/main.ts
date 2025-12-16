import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

require('dotenv').config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('SAV Auto API')
    .setDescription('Documentation des APIs (utilisateurs, véhicules, réclamations, etc.)')
    .setVersion('1.0')
    .addBearerAuth() // si tu utilises JWT dans Auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // => http://localhost:3000/api
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
