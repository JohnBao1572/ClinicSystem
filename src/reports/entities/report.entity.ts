import { PaymentEntity } from "src/payments/entities/payment.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('reports')
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    date: string;

    @Column({type: 'varchar', length: 50, nullable: true })
    month: string;

    @Column({type: 'varchar', length: 50, nullable: true })
    year: string;

    @Column({ type: 'decimal', precision: 10, scale: 3 })
    renevue: number;

    @Column({ type: 'decimal', precision: 10, scale: 3 })
    profit: number;

    @ManyToOne(()=> UserEntity, (user)=> user.report)
    addedBy:UserEntity

    @OneToMany(()=> PaymentEntity,(pay)=> pay.report)
    pay: PaymentEntity[]
}
