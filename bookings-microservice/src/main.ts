import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Bookings Microservice is RUNNING')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
  {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats'],
    },
  },
);
  await app.listen();
}
bootstrap();