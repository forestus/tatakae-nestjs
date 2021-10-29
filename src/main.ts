import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { translateErrors } from '@shared/shared/pipes/validation.pipe';
import { GlobalExceptionFilter } from '@shared/shared/filters/global-exception.filter';
import { ValidationFilter } from '@shared/shared/filters/validation-exception.filter';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(morgan('tiny'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: translateErrors,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter(), new ValidationFilter());
  const config = new DocumentBuilder()
    .setTitle('Tatakae')
    .setDescription('tatakae!!!')
    .setVersion('3.0')
    // .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }) // SWAGGER JWT OPTION
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  await app.listen(3000);
}
bootstrap();
