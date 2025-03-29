import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePositionANDinformationTable1743215053170 implements MigrationInterface {
    name = 'CreatePositionANDinformationTable1743215053170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`infors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`gender\` enum ('male', 'female') NOT NULL DEFAULT 'male', \`phoneNumber\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`salary\` decimal(10,2) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addedById\` int NULL, \`positionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`positions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`namePosi\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`infors\` ADD CONSTRAINT \`FK_2930385f917295fcfd025638fc9\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`infors\` ADD CONSTRAINT \`FK_71cc02ddf1a98d645ec3a1f7787\` FOREIGN KEY (\`positionId\`) REFERENCES \`positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`positions\` ADD CONSTRAINT \`FK_8ac4b3ade96c86d39456cbfc2af\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`positions\` DROP FOREIGN KEY \`FK_8ac4b3ade96c86d39456cbfc2af\``);
        await queryRunner.query(`ALTER TABLE \`infors\` DROP FOREIGN KEY \`FK_71cc02ddf1a98d645ec3a1f7787\``);
        await queryRunner.query(`ALTER TABLE \`infors\` DROP FOREIGN KEY \`FK_2930385f917295fcfd025638fc9\``);
        await queryRunner.query(`DROP TABLE \`positions\``);
        await queryRunner.query(`DROP TABLE \`infors\``);
    }

}
