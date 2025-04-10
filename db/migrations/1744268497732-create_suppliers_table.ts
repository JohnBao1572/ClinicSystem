import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSuppliersTable1744268497732 implements MigrationInterface {
    name = 'CreateSuppliersTable1744268497732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`addedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`informationnns\` CHANGE \`degree_coefficient\` \`degree_coefficient\` enum ('Cao_dang', 'Cu_nhan', 'Thac_sy', 'Tien_sy') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD CONSTRAINT \`FK_768483eeeb8ffae7a9effe10534\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP FOREIGN KEY \`FK_768483eeeb8ffae7a9effe10534\``);
        await queryRunner.query(`ALTER TABLE \`informationnns\` CHANGE \`degree_coefficient\` \`degree_coefficient\` enum ('Cao_dang', 'Cử_Nhân', 'Thạc_sỹ', 'Tiến_Sỹ') NOT NULL`);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
    }

}
