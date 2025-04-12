import { MedicineEntity } from "src/medicines/entities/medicine.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExFormMedicinesEntity } from "./exformmed.entity";
import { ExaminationScheduleEntity } from "src/examination_schedule/entities/examination_schedule.entity";


@Entity('exForms')
export class ExformEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // chuẩn đoán ban đầu
    @Column({ type: 'varchar', length: 255 })
    diagnosis: string;

    @OneToMany(() => ExFormMedicinesEntity, (exFormMed)=> exFormMed.exForm, {cascade: true})
    exFormMed: ExFormMedicinesEntity[]

    @ManyToOne(() => UserEntity, (user) => user.exForm)
    addedBy: UserEntity

    @ManyToOne(() => ExaminationScheduleEntity, (examSchedule)=> examSchedule.exForm)
    examSchedule: ExaminationScheduleEntity
}
