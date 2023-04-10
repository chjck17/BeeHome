import {
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { Language } from '../../../../common/enums/lang.enum';
import { IsArrayObjUniqueProperty } from '../../../../common/validators/array-unique-property.validator';
export class CategoryTypeDetailReqDto {
  @IsValidEnum({ enum: Language, required: true })
  lang: Language;

  @IsValidText({ trim: true, required: true })
  name: string;
}

export class UpdateCategoryTypeDetailReqDto {
  @IsValidNumber({ required: false })
  id?: number;

  @IsValidEnum({ enum: Language, required: true })
  lang: Language;

  @IsValidText({ trim: true, required: true })
  name: string;
}
export class SaveCategoryTypeReqDto {
  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    CategoryTypeDetailReqDto,
  )
  @IsArrayObjUniqueProperty(['lang'])
  categoryTypeDetails: CategoryTypeDetailReqDto[];
}

export class CreateCategoryTypeReqDto extends SaveCategoryTypeReqDto {}

export class UpdateCategoryTypeReqDto {
  @IsValidArrayObject(
    { minSize: 2, maxSize: 2, required: true },
    UpdateCategoryTypeDetailReqDto,
  )
  @IsArrayObjUniqueProperty(['lang'])
  categoryTypeDetails: UpdateCategoryTypeDetailReqDto[];

  @IsValidNumber({ required: false })
  id?: number;
}
