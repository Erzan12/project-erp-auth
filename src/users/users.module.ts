import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)], // ✅ forwardRef to fix circular dependency
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
