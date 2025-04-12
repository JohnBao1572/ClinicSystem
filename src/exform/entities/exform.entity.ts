import { MedicineEntity } from "src/medicines/entities/medicine.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('exForms')
export class ExformEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // chuẩn đoán ban đầu
    @Column({type: 'varchar', length: 255})
    diagnosis: string;

    // Đơn thuốc
    @ManyToOne(() => MedicineEntity, (med)=> med.exForm)
    med: MedicineEntity[]

    @ManyToOne(() => UserEntity, (user)=> user.exForm)
    addedBy: UserEntity
}
