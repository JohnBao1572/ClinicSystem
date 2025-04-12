import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExamTable1744446863356 implements MigrationInterface {
    name = 'CreateExamTable1744446863356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exFormMeds\` (\`id\` int NOT NULL AUTO_INCREMENT, \`count\` int NOT NULL, \`medId\` int NULL, \`exFormId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exForms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`diagnosis\` varchar(255) NOT NULL, \`addedById\` int NULL, \`examScheduleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`examinationSchedules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(100) NOT NULL, \`numberPhone\` varchar(50) NOT NULL, \`reasonForVisit\` varchar(255) NULL, \`AppointmentDate\` timestamp NOT NULL, \`status\` enum ('Dang_cho_xac_nhan', 'Da_xac_nhan', 'Da_huy') NOT NULL DEFAULT 'Dang_cho_xac_nhan', \`isCanceled\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`addedById\` int NULL, \`exFormId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exFormMeds\` ADD CONSTRAINT \`FK_7f15a755419ea6fc6dcdda7ea21\` FOREIGN KEY (\`medId\`) REFERENCES \`medicines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exFormMeds\` ADD CONSTRAINT \`FK_c520545d0194ab31fdda1206275\` FOREIGN KEY (\`exFormId\`) REFERENCES \`exForms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exForms\` ADD CONSTRAINT \`FK_f771703a00bc562af648420b102\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exForms\` ADD CONSTRAINT \`FK_fb240c69efd38ef4216e6c9793d\` FOREIGN KEY (\`examScheduleId\`) REFERENCES \`examinationSchedules\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` ADD CONSTRAINT \`FK_bb28d03031f60e61684acdd29d9\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` ADD CONSTRAINT \`FK_1d8e832269e3d763f91a6d91ad5\` FOREIGN KEY (\`exFormId\`) REFERENCES \`exForms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` DROP FOREIGN KEY \`FK_1d8e832269e3d763f91a6d91ad5\``);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` DROP FOREIGN KEY \`FK_bb28d03031f60e61684acdd29d9\``);
        await queryRunner.query(`ALTER TABLE \`exForms\` DROP FOREIGN KEY \`FK_fb240c69efd38ef4216e6c9793d\``);
        await queryRunner.query(`ALTER TABLE \`exForms\` DROP FOREIGN KEY \`FK_f771703a00bc562af648420b102\``);
        await queryRunner.query(`ALTER TABLE \`exFormMeds\` DROP FOREIGN KEY \`FK_c520545d0194ab31fdda1206275\``);
        await queryRunner.query(`ALTER TABLE \`exFormMeds\` DROP FOREIGN KEY \`FK_7f15a755419ea6fc6dcdda7ea21\``);
        await queryRunner.query(`DROP TABLE \`examinationSchedules\``);
        await queryRunner.query(`DROP TABLE \`exForms\``);
        await queryRunner.query(`DROP TABLE \`exFormMeds\``);
    }

}
