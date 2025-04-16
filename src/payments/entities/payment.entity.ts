import { ExformEntity } from "src/exform/entities/exform.entity";
import { ReportEntity } from "src/reports/entities/report.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { StatusPayment } from "src/util/common/status";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'float'})
    totalPrice: number;

    @Column({type: 'enum', enum: StatusPayment, default: StatusPayment.UnPaid})
    statusPayment: StatusPayment

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(()=> UserEntity, (user)=> user.pay)
    addedBy: UserEntity

    @ManyToOne(()=> ExformEntity, (ex)=> ex.pay)
    ex: ExformEntity

    @ManyToOne(()=> ReportEntity, (report)=> report.pay)
    report: ReportEntity
}
