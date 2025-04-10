import { InformationEntity } from "src/informations/entities/information.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('positions')
export class PositionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '255' })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Timestamp

    @ManyToOne(() => UserEntity, (user) => user.posi)
    addedBy: UserEntity

    @OneToMany(() => InformationEntity, (information)=> information.posi)
    information: InformationEntity[]
}
