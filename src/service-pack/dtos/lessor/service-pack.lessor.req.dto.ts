import { IsArray } from 'class-validator';
import {
  IsValidDate,
  IsValidEnum,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { PackType } from 'src/service-pack/enums/pack.enum';

export class CreateServicePackReqDto {
  @IsValidDate({ required: true })
  startDate: Date;
}
export class UpdateRoomReqDto {
  @IsValidEnum({ enum: PackType })
  packType: PackType;

  @IsValidDate({ required: false })
  endDate?: Date;

  @IsValidDate({ required: false })
  startDate?: Date;
}
// export class UpdateCategoryDetailReqDto {
//   @IsValidNumber()
//   id: number;

//   @IsValidEnum({ enum: Language })
//   lang: Language;

//   @IsValidText({ trim: true })
//   name: string;
// }
// export class CreateCategoryReqDto extends PaginationReqDto {
//   @IsValidArrayObject({ minSize: 2, maxSize: 2 }, CategoryDetailReqDto)
//   @IsArrayObjUniqueProperty(['lang'])
//   categoryDetails: CategoryDetailReqDto[];

//   @IsValidArrayObject({ minSize: 1, required: true }, CreateCategoryTypeReqDto)
//   categoryTypes: CreateCategoryTypeReqDto[];
// }

// export class UpdateCategoryReqDto {
//   @IsValidNumber()
//   id: number;

//   @IsValidArrayObject({ minSize: 2, maxSize: 2 }, CategoryDetailReqDto)
//   @IsArrayObjUniqueProperty(['lang'])
//   categoryDetails: UpdateCategoryDetailReqDto[];

//   @IsValidArrayObject({ minSize: 1, required: true }, CreateCategoryTypeReqDto)
//   categoryTypes: UpdateCategoryTypeReqDto[];
// }

// export class DeleteCategoriesReqDto {
//   @IsValidArrayNumber({ minSize: 1, required: true })
//   ids: number[];
// }

// export class GetListCategoryReqDto extends PaginationReqDto {
//   // @IsValidEnum({ enum: Language, required: false })
//   // lang?: Language;
// }
// export class GetListCategoryTypeReqDto extends PaginationReqDto {
//   @IsValidEnum({ enum: Language, required: false })
//   lang?: Language;
// }
