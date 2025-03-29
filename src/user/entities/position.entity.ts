import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { InforEntity } from "./information.entity";


@Entity('positions')
export class PositionEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    namePosi: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    description: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToOne(() => UserEntity, (user)=> user.position)
    addedBy: UserEntity

    @OneToMany(() => InforEntity,(information)=> information.position)
    information: InforEntity[]
}