import { ExformEntity } from "src/exform/entities/exform.entity";
import { ServiceEntity } from "src/services/entities/service.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { StatusSchedule } from "src/util/common/status";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('examinationSchedules')
export class ExaminationScheduleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    fullName: string;

    @Column({type: 'varchar', length: 50})
    numberPhone: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    reasonForVisit: string;

    @Column({type: 'timestamp'})
    AppointmentDate: Date;

    @Column({type: 'enum', enum: StatusSchedule, default: StatusSchedule.awaiting_confirmation})
    status: StatusSchedule;

    @Column({type: 'boolean', default: false})
    isCanceled: boolean;

    @CreateDateColumn()
    createdAt: Date;
    
    @ManyToOne(() => UserEntity, (user)=> user.schedules)
    addedBy: UserEntity

    @ManyToOne(() => ServiceEntity, (ser)=> ser.schedule)
    ser: ServiceEntity

    @ManyToOne(() => ExformEntity, (exForm)=> exForm.examSchedule)
    exForm: ExformEntity[]
}
