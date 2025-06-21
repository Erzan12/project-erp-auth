import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('reports')
export class ProtectedController {
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('Invoices:Editor')
  @Get()
  getReports(@Request() req) {
    return { message: `Hello ${req.user.fullName}, you can access invoices reports.` };
  }
}
