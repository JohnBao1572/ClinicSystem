import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { PositionEntity } from "src/positions/entities/position.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Gender } from "src/util/common/gender";
import { heSoHocVi } from "src/util/common/hesohocvi";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('informationnns')
export class InformationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'enum', enum: heSoHocVi })
    degree_coefficient: heSoHocVi;

    @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
    gender: Gender;

    @Column({ type: 'float' })
    salary: number;

    @CreateDateColumn()
    createdAt: Timestamp;

    @ManyToOne(() => PositionEntity, (posi) => posi.information)
    posi: PositionEntity;

    @ManyToOne(() => UserEntity, (user) => user.information)
    addedBy: UserEntity;
}
