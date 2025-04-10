import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMedicinesTable1744273454197 implements MigrationInterface {
    name = 'CreateMedicinesTable1744273454197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`medicines\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`description\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`addedById\` int NULL, \`supId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`medicines\` ADD CONSTRAINT \`FK_a5d9933eb7037b84e49e15be49b\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medicines\` ADD CONSTRAINT \`FK_20f48631cb19a637ab18adbdf20\` FOREIGN KEY (\`supId\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`medicines\` DROP FOREIGN KEY \`FK_20f48631cb19a637ab18adbdf20\``);
        await queryRunner.query(`ALTER TABLE \`medicines\` DROP FOREIGN KEY \`FK_a5d9933eb7037b84e49e15be49b\``);
        await queryRunner.query(`DROP TABLE \`medicines\``);
    }

}
