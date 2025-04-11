import { UserEntity } from "src/user/entities/user.entity";
import { StatusSchedule } from "src/util/common/status";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => UserEntity, (user)=> user.schedules)
    addedBy: UserEntity
}
