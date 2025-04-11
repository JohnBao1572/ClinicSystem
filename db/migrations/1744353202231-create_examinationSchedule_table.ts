import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExaminationScheduleTable1744353202231 implements MigrationInterface {
    name = 'CreateExaminationScheduleTable1744353202231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`examinationSchedules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(100) NOT NULL, \`numberPhone\` varchar(50) NOT NULL, \`reasonForVisit\` varchar(255) NULL, \`AppointmentDate\` timestamp NOT NULL, \`status\` enum ('Dang_cho_xac_nhan', 'Da_xac_nhan', 'Da_huy') NOT NULL DEFAULT 'Dang_cho_xac_nhan', \`isCanceled\` tinyint NOT NULL DEFAULT 0, \`addedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` ADD CONSTRAINT \`FK_bb28d03031f60e61684acdd29d9\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` DROP FOREIGN KEY \`FK_bb28d03031f60e61684acdd29d9\``);
        await queryRunner.query(`DROP TABLE \`examinationSchedules\``);
    }

}
