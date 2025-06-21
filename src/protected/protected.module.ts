import { Module } from '@nestjs/common';
import { ProtectedController } from './protected.controller';
import { PermissionsGuard } from '../auth/permissions.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  controllers: [ProtectedController],
  providers: [
    // Optionally apply guards globally
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
    // { provide: APP_GUARD, useClass: PermissionsGuard },
  ],
})
export class ProtectedModule {}
