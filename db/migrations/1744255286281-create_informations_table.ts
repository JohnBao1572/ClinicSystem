import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInformationsTable1744255286281 implements MigrationInterface {
    name = 'CreateInformationsTable1744255286281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`informationnns\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`degree_coefficient\` enum ('Cao_dang', 'Cử_Nhân', 'Thạc_sỹ', 'Tiến_Sỹ') NOT NULL, \`gender\` enum ('male', 'female') NOT NULL DEFAULT 'male', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`posiId\` int NULL, \`addedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`positions\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`informationnns\` ADD CONSTRAINT \`FK_be3a07cde4178c4f70e0764fdb4\` FOREIGN KEY (\`posiId\`) REFERENCES \`positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`informationnns\` ADD CONSTRAINT \`FK_3071a06861a62af39f3724cdfbb\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`informationnns\` DROP FOREIGN KEY \`FK_3071a06861a62af39f3724cdfbb\``);
        await queryRunner.query(`ALTER TABLE \`informationnns\` DROP FOREIGN KEY \`FK_be3a07cde4178c4f70e0764fdb4\``);
        await queryRunner.query(`ALTER TABLE \`positions\` DROP COLUMN \`isDeleted\``);
        await queryRunner.query(`DROP TABLE \`informationnns\``);
    }

}
