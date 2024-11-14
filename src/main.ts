import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  // Configuración de CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://10.0.2.2:3000',
      'http://172.22.128.1:3000',
    ], // Cambia esto a la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Si necesitas manejar cookies o autenticación
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT);
  logger.log(`Aplicacion correiendo en el puerto ${process.env.PORT}`);
}
bootstrap();
