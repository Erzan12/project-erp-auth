import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule  } from './users/users.module';
import { ProtectedModule } from './protected/protected.module';
import { AuthController } from './auth/auth.controller';
import { ProtectedController } from './protected/protected.controller';

@Module({
  imports: [AuthModule, UsersModule, ProtectedModule],
  controllers: [AppController, AuthController, ProtectedController],
  providers: [AppService], // ✅ keep only AppService here
})
export class AppModule {}
