import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateAdmin,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { GetListBoardingHousesReqDto } from '../../dtos/boarding-house.req.dto';
import { ApiTags } from '@nestjs/swagger';
import { BoardingHouseAdminService } from '../../services/admin/boarding-house.admin.service';
import { UpdateBoardingHouseStatusReqDto } from 'src/boarding-house/dtos/admin/boarding-house.admin.req.dto';

@Controller(`${PrefixType.ADMIN}/boardingHouse`)
@AuthenticateAdmin()
@ApiTags('BoardingHouse Admin')
export class BoardingHouseAdminController {
  constructor(
    private readonly boardingHouseAdminService: BoardingHouseAdminService,
  ) {}

  @Get()
  findAll(@Query() query: GetListBoardingHousesReqDto) {
    return this.boardingHouseAdminService.getListBoardingHouse(query);
  }

  @Get('search')
  findAllByFilter(@Query() query: GetListBoardingHousesReqDto) {
    return this.boardingHouseAdminService.getListBoardingHouseByFilter(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardingHouseAdminService.findOne(Number(id));
  }

  @Patch()
  update(
    @CurrentUser() user: User,
    @Body() updateProductDto: UpdateBoardingHouseStatusReqDto,
  ) {
    return this.boardingHouseAdminService.updateBoardingHouse(updateProductDto);
  }
}
