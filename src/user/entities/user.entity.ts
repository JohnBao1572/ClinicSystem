import { ExaminationScheduleEntity } from "src/examination_schedule/entities/examination_schedule.entity";
import { ExformEntity } from "src/exform/entities/exform.entity";
import { InformationEntity } from "src/informations/entities/information.entity";
import { MedicineEntity } from "src/medicines/entities/medicine.entity";
import { PaymentEntity } from "src/payments/entities/payment.entity";
import { PositionEntity } from "src/positions/entities/position.entity";
import { ReportEntity } from "src/reports/entities/report.entity";
import { ServiceEntity } from "src/services/entities/service.entity";
import { SupplierEntity } from "src/suppliers/entities/supplier.entity";
import { Role } from "src/util/common/user-role";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    firstName: string;

    @Column({ type: 'varchar', length: 255 })
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({type: 'boolean', default: false})
    isVerify: boolean;

    @Column({type: 'boolean', default: true})
    isDeleted: boolean;

    @Column({nullable: true})
    verifyCode: string;

    @Column({nullable: true})
    verificationCodeExpiry: Date;

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @OneToMany(()=> PositionEntity, (posi)=> posi.addedBy)
    posi: PositionEntity[]

    @OneToMany(() => InformationEntity,(information)=> information.addedBy)
    information: InformationEntity[]

    @OneToMany(() => SupplierEntity,(suppliers)=> suppliers.addedBy)
    suppliers: SupplierEntity[]

    @OneToMany(() => MedicineEntity, (medicines)=> medicines.addedBy)
    medicines: MedicineEntity[]

    @OneToMany(() => ExaminationScheduleEntity,(schedules) => schedules.addedBy)
    schedules: ExaminationScheduleEntity[]

    @OneToMany(() => ExformEntity, (exForm)=> exForm.addedBy)
    exForm: ExformEntity[]

    @OneToMany(() => ServiceEntity, (ser)=> ser.addedBy)
    ser: ServiceEntity[]

    @OneToMany(()=> PaymentEntity, (pay)=> pay.addedBy)
    pay: PaymentEntity[]

    @OneToMany(()=> ReportEntity,(report)=> report.addedBy)
    report: ReportEntity[]
}
