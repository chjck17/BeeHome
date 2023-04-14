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
import { BoardingHouseLessorService } from '../../services/lessor/boarding-house.lessor.service';

@Controller(`${PrefixType.LESSOR}/boardingHouse`)
@AuthenticateLessor()
@ApiTags('BoardingHouse Lessor')
export class BoardingHouseLessorController {
  constructor(
    private readonly boardingHouseLessorService: BoardingHouseLessorService,
  ) {}

  @Get()
  findAll(
    @CurrentUser() user: User,
    @Query() query: GetListBoardingHousesReqDto,
  ) {
    return this.boardingHouseLessorService.getListBoardingHouse(user, query);
  }

  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.boardingHouseLessorService.findOne(user, Number(id));
  }

  @Post()
  createBoardingHouse(
    @CurrentUser() user: User,
    @Body() createBoardingHouseDto: CreateBoardingHouseReqDto,
  ) {
    return this.boardingHouseLessorService.createBoardingHouse(
      user,
      createBoardingHouseDto,
    );
  }

  @Patch()
  update(
    @CurrentUser() user: User,
    @Body() updateProductDto: UpdateBoardingHouseReqDto,
  ) {
    return this.boardingHouseLessorService.updateBoardingHouse(
      user,
      updateProductDto,
    );
  }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.boardingHouseLessorService.deleteBoardingHouse(
      user,
      Number(id),
    );
  }

  @Delete()
  deleteListCategory(
    @CurrentUser() user: User,
    @Body() body: DeleteListReqDto,
  ) {
    return this.boardingHouseLessorService.deleteListBoardingHouse(body, user);
  }
}
