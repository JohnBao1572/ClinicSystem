import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQtyColumn1744337525935 implements MigrationInterface {
    name = 'AddQtyColumn1744337525935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`medicines\` ADD \`quantity\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`medicines\` DROP COLUMN \`quantity\``);
    }

}
