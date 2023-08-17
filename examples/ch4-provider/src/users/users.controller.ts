import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Redirect, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    const { name, email, password } = createUserDto;
    return `유저를 생성했습니다. 이름:${name}, 이메일:${email}, 비밀번호:${password}`;
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = this.usersService.findAll();
    return res.status(200).send(users);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   if (isNaN(Number.parseInt(id, 10))) {
  //     throw new BadRequestException('id는 숫자이어야 합니다.');
  //   }
  //   if (+id < 1) {
  //     throw new BadRequestException('id는 0보다 큰 값이어야 합니다');
  //   }
  //   return this.usersService.findOne(+id);
  // }

  // @Header('Custom', 'Test Header')
  // @Get(':id')
  // findOneWithHeader(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Redirect('https://nestjs.com', 301)
  @Get(':id')
  findOneRedirection(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @HttpCode(202)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }

  @Delete(':userId/memo/:memoId')
  deleteUserMemo(@Param('userId') userId: string, @Param('memoId') memoId: string): string {
    return `userId: ${userId}, memoId: ${memoId}`;
  }
}
