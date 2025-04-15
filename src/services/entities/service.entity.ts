import { ExaminationScheduleEntity } from "src/examination_schedule/entities/examination_schedule.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('services')
export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    name: string;

    @Column({type:  'varchar', length: 255})
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @OneToMany(() => ExaminationScheduleEntity, (schedule)=> schedule.ser)
    schedule: ExaminationScheduleEntity[]

    @ManyToOne(()=> UserEntity, (user)=> user.ser)
    addedBy: UserEntity
}
