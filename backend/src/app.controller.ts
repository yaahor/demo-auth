import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DtoUserRole } from '@shared/dto-user-role';
import { LoggedInDto } from '@shared/logged-in.dto';
import { LoginDto } from '@shared/login.dto';
import { UserCreateDto } from '@shared/user-create.dto';
import { UserCreatedDto } from '@shared/user-created.dto';
import { UserEditDto } from '@shared/user-edit.dto';
import { UserEditedDto } from '@shared/user-edited.dto';
import { UserListDto } from '@shared/user-list.dto';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RoleGuard } from './auth/role.guard';
import { Roles } from './auth/roles.decorator';

// todo move api path shared
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUserList(): Promise<UserListDto> {
    return this.appService.getUserList();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([DtoUserRole.ADMIN])
  @Put('users/:id')
  editUser(
    @Param('id') id: string,
    @Body() dto: UserEditDto,
  ): Promise<UserEditedDto> {
    return this.appService.editUser(id, dto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([DtoUserRole.ADMIN])
  @Post('users')
  createUser(@Body() dto: UserCreateDto): Promise<UserCreatedDto> {
    return this.appService.createUser(dto);
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoggedInDto> {
    return this.appService.login(body);
  }
}
