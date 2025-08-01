import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enhanced CORS configuration
app.enableCors({
  origin: (origin, callback) => {
    callback(null, true); // Permite qualquer origem
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true,
});

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 5000; // Fallback to 5000
  
  await app.listen(port);
  console.log(`✅ Backend online na porta ${port}`);
}

bootstrap();