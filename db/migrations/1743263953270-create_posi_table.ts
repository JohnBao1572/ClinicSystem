import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePosiTable1743263953270 implements MigrationInterface {
    name = 'CreatePosiTable1743263953270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`positions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`addedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`positions\` ADD CONSTRAINT \`FK_8ac4b3ade96c86d39456cbfc2af\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`positions\` DROP FOREIGN KEY \`FK_8ac4b3ade96c86d39456cbfc2af\``);
        await queryRunner.query(`DROP TABLE \`positions\``);
    }

}
