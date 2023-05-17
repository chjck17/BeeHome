// import { IsValidEnum } from "../../../common/decorators/custom-validator.decorator";

import { IsValidDate } from '../../../common/decorators/custom-validator.decorator';

// export class UpdateStatusLessorBookReqDto {
//   @IsValidEnum()
//   dateDisable: Date;
// }
export class CreateBookDisableReqDto {
  @IsValidDate({ required: false })
  dateDisable: Date;
}
