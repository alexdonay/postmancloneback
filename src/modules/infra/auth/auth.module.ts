import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // 1. IMPORTAR O PASSPORTMODULE
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/modules/user/user.repository';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    // 2. REGISTRAR O PASSPORTMODULE AQUI
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }, // Aumentei para 1 dia, 60m é pouco para testes
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy,UserRepository ],
  controllers: [AuthController],
  // 3. EXPORTAR O PASSPORTMODULE PARA OUTROS MÓDULOS USAREM
  exports: [PassportModule, JwtStrategy], 
})
export class AuthModule {}