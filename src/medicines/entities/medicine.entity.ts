import { SupplierEntity } from "src/suppliers/entities/supplier.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('medicines')
export class MedicineEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length:100})
    title: string

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({type: 'boolean', default: false})
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user)=> user.medicines)
    addedBy: UserEntity

    @ManyToOne(() => SupplierEntity, (sup)=> sup.medicine)
    sup: SupplierEntity
}
