import { MedicineEntity } from "src/medicines/entities/medicine.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExformEntity } from "./exform.entity";


@Entity('exFormMeds')
export class ExFormMedicinesEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MedicineEntity, (med) => med.exFormMed)
    med: MedicineEntity; 

    @ManyToOne(() => ExformEntity, (exForm)=> exForm.exFormMed)
    exForm: ExformEntity;
    
    @Column({type: 'int'})
    count: number;
}