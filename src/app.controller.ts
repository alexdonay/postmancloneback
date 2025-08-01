import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
   @Get('health-check') // Nova rota de teste
  healthCheck(): string {
    console.log('✅ Rota de health-check foi acessada!');
    return 'Server is up and running!';
  }
}
