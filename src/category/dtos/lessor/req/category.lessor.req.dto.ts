import { IsArray } from 'class-validator';
import {
  IsValidArrayNumber,
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { Language } from '../../../../common/enums/lang.enum';
import { IsArrayObjUniqueProperty } from '../../../../common/validators/array-unique-property.validator';
import {
  CreateCategoryTypeReqDto,
  UpdateCategoryTypeReqDto,
} from './category-type.lessor.req.dto';

export class CategoryDetailReqDto {
  @IsValidEnum({ enum: Language })
  lang: Language;

  @IsValidText({ trim: true })
  name: string;
}
export class UpdateCategoryDetailReqDto {
  @IsValidNumber()
  id: number;

  @IsValidEnum({ enum: Language })
  lang: Language;

  @IsValidText({ trim: true })
  name: string;
}
export class CreateCategoryReqDto {
  @IsValidArrayObject({ minSize: 2, maxSize: 2 }, CategoryDetailReqDto)
  @IsArrayObjUniqueProperty(['lang'])
  categoryDetails: CategoryDetailReqDto[];

  @IsValidArrayObject({ minSize: 1, required: true }, CreateCategoryTypeReqDto)
  categoryTypes: CreateCategoryTypeReqDto[];
}

export class UpdateCategoryReqDto {
  @IsValidNumber()
  id: number;

  @IsValidArrayObject({ minSize: 2, maxSize: 2 }, CategoryDetailReqDto)
  @IsArrayObjUniqueProperty(['lang'])
  categoryDetails: UpdateCategoryDetailReqDto[];

  @IsValidArrayObject({ minSize: 1, required: true }, CreateCategoryTypeReqDto)
  categoryTypes: UpdateCategoryTypeReqDto[];
}

export class DeleteCategoriesReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}

export class GetListCategoryReqDto extends PaginationReqDto {
  // @IsValidEnum({ enum: Language, required: false })
  // lang?: Language;
}
