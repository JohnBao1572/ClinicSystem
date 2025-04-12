import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExaminationScheduleDto, RemoveScheduleDto } from './dto/create-examination_schedule.dto';
import { UpdateExaminationScheduleDto } from './dto/update-examination_schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExaminationScheduleEntity } from './entities/examination_schedule.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { handleSendMail } from 'src/util/handleSendmail';
import { Role } from 'src/util/common/user-role';
import { StatusSchedule } from 'src/util/common/status';
import { scan } from 'rxjs';

@Injectable()
export class ExaminationScheduleService {
  constructor(@InjectRepository(ExaminationScheduleEntity) private readonly scheduleEntity: Repository<ExaminationScheduleEntity>) { }

  async create(createScheduleDto: CreateExaminationScheduleDto, currentUser: UserEntity) {
    const proposedDate = new Date(createScheduleDto.AppointmentDate);
    while (true) {
      const isConflict = await this.scheduleEntity.findOne({
        where: { AppointmentDate: proposedDate },
      });
      if (!isConflict) {
        break;
      }
      proposedDate.setMinutes(proposedDate.getMinutes() + 15);
    }

    const newSchedule = await this.scheduleEntity.create(createScheduleDto);
    newSchedule.AppointmentDate = proposedDate;
    newSchedule.addedBy = currentUser;

    const timeString = new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Ho_Chi_Minh'
    }).format(newSchedule.AppointmentDate);
    const dateString = new Intl.DateTimeFormat('vi-VN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Ho_Chi_Minh'
    }).format(newSchedule.AppointmentDate);

    await handleSendMail({
      from: 'Support Admin',
      to: newSchedule.addedBy.email,
      subject: 'Phiếu khám của bạn',
      text: 'Phiếu khám của bạn',
      html: `
      <h2>Họ&tên: ${newSchedule.fullName}</h2>
      <p>Số điện thoại: ${newSchedule.numberPhone}</p>
      <p>Ngày khám: ${dateString}</p>
      <p>Giờ khám: ${timeString}</p>
      <p>Lí do đi khám: ${newSchedule.reasonForVisit}</p>
      `
    })
    return await this.scheduleEntity.save(newSchedule);
  }

  async findAll(currentUser: UserEntity): Promise<ExaminationScheduleEntity[]> {
    const getAll = await this.scheduleEntity.find({
      where: currentUser.role === Role.NURSE ? {} : {addedBy: {id: currentUser.id}},
      relations: { addedBy: true },
    })
    if (!getAll || getAll.length === 0) {
      throw new HttpException({ message: 'No exam schedules found' }, HttpStatus.NOT_FOUND)
    }
    const schedulesToUpdateStatus: ExaminationScheduleEntity[] = [];
    for (const schedule of getAll) {
      const createdTime = new Date(schedule.AppointmentDate).getTime();
      const diffTime = Date.now() - createdTime;
      // 1 giây = 1000 ms
      // 1 phút = 60 giây → 1000 * 60 ms = 1 phút
      const dffTimes = diffTime / (1000 * 60)
      if (schedule.status === StatusSchedule.awaiting_confirmation && !schedule.isCanceled && dffTimes >= 10) {
        schedule.status = StatusSchedule.confirmed;
        schedulesToUpdateStatus.push(schedule);
      }
    }
    if (schedulesToUpdateStatus.length > 0) {
      await this.scheduleEntity.save(schedulesToUpdateStatus);
    }
    return getAll;
  }

  async findOne(id: number, currentUser:UserEntity):Promise<ExaminationScheduleEntity> {
    const getOne = await this.scheduleEntity.findOne({
      where: {id: id},
      relations: {addedBy: true}
    })
    if(!getOne){
      throw new HttpException({message: 'NOt found this id to watch detail'}, HttpStatus.NOT_FOUND)
    }
    if(currentUser.role !== Role.NURSE && getOne.addedBy.id !== currentUser.id){
      throw new HttpException({message: 'You no have permission'}, HttpStatus.BAD_REQUEST)
    }
    return getOne;
  }

  async update(id: number, updateExaminationScheduleDto: UpdateExaminationScheduleDto, currentUser:UserEntity):Promise<ExaminationScheduleEntity> {
    const findToUp = await this.scheduleEntity.findOne({
      where:{id:id},
    })
    if(!findToUp){
      throw new HttpException({message: 'NOt foudn to update'}, HttpStatus.NOT_FOUND)
    }
    if(currentUser.role !== Role.NURSE){
      throw new HttpException({message: 'You not have permission'}, HttpStatus.UNAUTHORIZED)
    }
    Object.assign(findToUp, updateExaminationScheduleDto)
    return await this.scheduleEntity.save(findToUp);
  }

  async remove(id: number, currentUser:UserEntity, removeScheduleDto: RemoveScheduleDto) {
    const re = await this.scheduleEntity.findOne({
      where: {id:id},
      relations:{addedBy: true}
    })
    if(!re){
      throw new HttpException({message: 'Not found this id schedule to remove'}, HttpStatus.NOT_FOUND)
    }
    if(currentUser.role !== Role.NURSE && re.addedBy.id !== currentUser.id){
      throw new HttpException({message: 'you not have a permision'}, HttpStatus.UNAUTHORIZED)
    }
    re.isCanceled = removeScheduleDto.isCanceled
    return await this.scheduleEntity.save(re);
  }
}
