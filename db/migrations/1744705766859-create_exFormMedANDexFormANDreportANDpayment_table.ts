import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExFormMedANDexFormANDreportANDpaymentTable1744705766859 implements MigrationInterface {
    name = 'CreateExFormMedANDexFormANDreportANDpaymentTable1744705766859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exFormMeds\` (\`id\` int NOT NULL AUTO_INCREMENT, \`count\` int NOT NULL, \`medId\` int NULL, \`exFormId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reports\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` varchar(50) NULL, \`month\` varchar(50) NULL, \`year\` varchar(50) NULL, \`renevue\` decimal(10,3) NOT NULL, \`profit\` decimal(10,3) NOT NULL, \`addedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalPrice\` float NOT NULL, \`statusPayment\` enum ('Da_thanh_toan', 'Chua_thanh_toan') NOT NULL DEFAULT 'Chua_thanh_toan', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`addedById\` int NULL, \`exId\` int NULL, \`reportId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exForms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`diagnosis\` varchar(255) NOT NULL, \`addedById\` int NULL, \`examScheduleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`services\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`addedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`examinationSchedules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(100) NOT NULL, \`numberPhone\` varchar(50) NOT NULL, \`reasonForVisit\` varchar(255) NULL, \`AppointmentDate\` timestamp NOT NULL, \`status\` enum ('Dang_cho_xac_nhan', 'Da_xac_nhan', 'Da_huy') NOT NULL DEFAULT 'Dang_cho_xac_nhan', \`isCanceled\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`addedById\` int NULL, \`serId\` int NULL, \`exFormId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`medicines\` ADD \`price\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exFormMeds\` ADD CONSTRAINT \`FK_7f15a755419ea6fc6dcdda7ea21\` FOREIGN KEY (\`medId\`) REFERENCES \`medicines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exFormMeds\` ADD CONSTRAINT \`FK_c520545d0194ab31fdda1206275\` FOREIGN KEY (\`exFormId\`) REFERENCES \`exForms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_b50a178e65c881f94805d34499d\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_5f621b4a5df39ceb331974657e0\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_23676fc195e27dd7ad67dd4d659\` FOREIGN KEY (\`exId\`) REFERENCES \`exForms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_27f866d9cda7af6013582d61855\` FOREIGN KEY (\`reportId\`) REFERENCES \`reports\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exForms\` ADD CONSTRAINT \`FK_f771703a00bc562af648420b102\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exForms\` ADD CONSTRAINT \`FK_fb240c69efd38ef4216e6c9793d\` FOREIGN KEY (\`examScheduleId\`) REFERENCES \`examinationSchedules\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`services\` ADD CONSTRAINT \`FK_9ce7703d6d0de49eeadc6d87beb\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` ADD CONSTRAINT \`FK_bb28d03031f60e61684acdd29d9\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` ADD CONSTRAINT \`FK_83e8436fe1d207afaac9d3f1eb1\` FOREIGN KEY (\`serId\`) REFERENCES \`services\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` ADD CONSTRAINT \`FK_1d8e832269e3d763f91a6d91ad5\` FOREIGN KEY (\`exFormId\`) REFERENCES \`exForms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` DROP FOREIGN KEY \`FK_1d8e832269e3d763f91a6d91ad5\``);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` DROP FOREIGN KEY \`FK_83e8436fe1d207afaac9d3f1eb1\``);
        await queryRunner.query(`ALTER TABLE \`examinationSchedules\` DROP FOREIGN KEY \`FK_bb28d03031f60e61684acdd29d9\``);
        await queryRunner.query(`ALTER TABLE \`services\` DROP FOREIGN KEY \`FK_9ce7703d6d0de49eeadc6d87beb\``);
        await queryRunner.query(`ALTER TABLE \`exForms\` DROP FOREIGN KEY \`FK_fb240c69efd38ef4216e6c9793d\``);
        await queryRunner.query(`ALTER TABLE \`exForms\` DROP FOREIGN KEY \`FK_f771703a00bc562af648420b102\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_27f866d9cda7af6013582d61855\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_23676fc195e27dd7ad67dd4d659\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_5f621b4a5df39ceb331974657e0\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_b50a178e65c881f94805d34499d\``);
        await queryRunner.query(`ALTER TABLE \`exFormMeds\` DROP FOREIGN KEY \`FK_c520545d0194ab31fdda1206275\``);
        await queryRunner.query(`ALTER TABLE \`exFormMeds\` DROP FOREIGN KEY \`FK_7f15a755419ea6fc6dcdda7ea21\``);
        await queryRunner.query(`ALTER TABLE \`medicines\` DROP COLUMN \`price\``);
        await queryRunner.query(`DROP TABLE \`examinationSchedules\``);
        await queryRunner.query(`DROP TABLE \`services\``);
        await queryRunner.query(`DROP TABLE \`exForms\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`DROP TABLE \`reports\``);
        await queryRunner.query(`DROP TABLE \`exFormMeds\``);
    }

}
