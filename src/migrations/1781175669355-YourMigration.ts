import { MigrationInterface, QueryRunner } from "typeorm";

export class YourMigration1781175669355 implements MigrationInterface {
    name = 'YourMigration1781175669355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "custom_availability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorId" character varying NOT NULL, "date" date NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, CONSTRAINT "PK_e9b8fa5803ca3d6554a7ddf7045" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recurring_availability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorId" character varying NOT NULL, "dayOfWeek" integer NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, CONSTRAINT "PK_2464dd095ba418858c1aa3f4e01" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recurring_availability"`);
        await queryRunner.query(`DROP TABLE "custom_availability"`);
    }

}
