import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSalaryColumn1744256753671 implements MigrationInterface {
    name = 'AddSalaryColumn1744256753671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`informationnns\` ADD \`salary\` float NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`informationnns\` DROP COLUMN \`salary\``);
    }

}
