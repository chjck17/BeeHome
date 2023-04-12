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
  AuthenticateLessor,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import {
  CreateBoardingHouseReqDto,
  DeleteListReqDto,
  GetListBoardingHousesReqDto,
  UpdateBoardingHouseReqDto,
} from '../../dtos/boarding-house.req.dto';
import { ApiTags } from '@nestjs/swagger';
import { BoardingHouseCustomerService } from '../../services/customer/boarding-house.customer.service';

@Controller(`${PrefixType.CUSTOMER}/boardingHouse`)
@ApiTags('BoardingHouse Customer')
export class BoardingHouseCustomerController {
  constructor(
    private readonly boardingHouseCustomerService: BoardingHouseCustomerService,
  ) {}

  @Get()
  findAll(@Query() query: GetListBoardingHousesReqDto) {
    return this.boardingHouseCustomerService.getListBoardingHouse(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardingHouseCustomerService.findOne(Number(id));
  }
}
