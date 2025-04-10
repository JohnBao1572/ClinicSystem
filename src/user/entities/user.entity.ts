import { InformationEntity } from "src/informations/entities/information.entity";
import { PositionEntity } from "src/positions/entities/position.entity";
import { SupplierEntity } from "src/suppliers/entities/supplier.entity";
import { Role } from "src/util/common/user-role";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    firstName: string;

    @Column({ type: 'varchar', length: 255 })
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({type: 'boolean', default: false})
    isVerify: boolean;

    @Column({type: 'boolean', default: true})
    isDeleted: boolean;

    @Column({nullable: true})
    verifyCode: string;

    @Column({nullable: true})
    verificationCodeExpiry: Date;

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @OneToMany(()=> PositionEntity, (posi)=> posi.addedBy)
    posi: PositionEntity[]

    @OneToMany(() => InformationEntity,(information)=> information.addedBy)
    information: InformationEntity[]

    @OneToMany(() => SupplierEntity,(suppliers)=> suppliers.addedBy)
    suppliers: SupplierEntity[]
}
