import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusSchedule } from "src/util/common/status";

export class UpdateExaminationScheduleDto {
    @IsNotEmpty({message: 'status not emp'})
    @IsEnum(StatusSchedule, {message: 'status must be enum'})
    status: StatusSchedule;
}
