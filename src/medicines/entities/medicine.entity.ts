import { ExformEntity } from "src/exform/entities/exform.entity";
import { ExFormMedicinesEntity } from "src/exform/entities/exformmed.entity";
import { SupplierEntity } from "src/suppliers/entities/supplier.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('medicines')
export class MedicineEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    title: string

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'int', default: 0 })
    quantity: number;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Timestamp;

    @ManyToOne(() => UserEntity, (user) => user.medicines)
    addedBy: UserEntity

    @ManyToOne(() => SupplierEntity, (sup) => sup.medicine)
    sup: SupplierEntity

    @OneToMany(() => ExFormMedicinesEntity, (exFormMed)=> exFormMed.med)
    exFormMed: ExFormMedicinesEntity[]
}
