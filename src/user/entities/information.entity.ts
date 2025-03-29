import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Gender } from "src/util/common/gender";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { PositionEntity } from "./position.entity";


@Entity('infors')
export class InforEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    fullName: string;

    @Column({type: 'enum', enum: Gender, default: Gender.MALE})
    gender: Gender;

    @Column({type: 'varchar', length: 255})
    phoneNumber: string;

    @Column({type: 'varchar', length: 255})
    email: string;

    @Column({type: 'varchar', length: 255})
    address: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    salary: number;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToOne(()=> UserEntity, (user)=> user.information)
    addedBy: UserEntity

    @ManyToOne(() => PositionEntity, (position)=> position.information)
    position: PositionEntity
}