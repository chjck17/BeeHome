import {
  IsValidEnum,
  IsValidNumber,
} from '../../../common/decorators/custom-validator.decorator';
import { ReportStatus } from '../../enums/report.enum';

export class UpdateStatusAdminReportReqDto {
  @IsValidNumber({ min: 1 })
  reportId: number;

  @IsValidEnum({ enum: ReportStatus })
  status: ReportStatus;
}
