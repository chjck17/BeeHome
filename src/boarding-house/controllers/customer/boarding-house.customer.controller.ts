import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PrefixType } from '../../../common/constants/global.constant';
import { GetListBoardingHousesCustomerReqDto } from '../../dtos/boarding-house.req.dto';
import { ApiTags } from '@nestjs/swagger';
import { BoardingHouseCustomerService } from '../../services/customer/boarding-house.customer.service';
import {
  AuthenticateCustomer,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { User } from '../../../auth/entities/user.entity';
import { addCommentCustomerReqDto } from '../../dtos/customer/customer.req.dto';

@Controller(`${PrefixType.CUSTOMER}/boardingHouse`)
@ApiTags('BoardingHouse Customer')
export class BoardingHouseCustomerController {
  constructor(
    private readonly boardingHouseCustomerService: BoardingHouseCustomerService,
  ) {}

  @Get()
  findAll(@Query() query: GetListBoardingHousesCustomerReqDto) {
    return this.boardingHouseCustomerService.getListBoardingHouse(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardingHouseCustomerService.findOne(Number(id));
  }

  // @Post()
  // @AuthenticateCustomer()
  // comment(
  //   @CurrentUser()
  //   user: User,
  //   @Body() dto: addCommentCustomerReqDto,
  // ) {
  //   return this.boardingHouseCustomerService.comment(dto, user);
  // }
}
