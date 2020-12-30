import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1609277824540 implements MigrationInterface {
    name = 'Init1609277824540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conference" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "slug" varchar NOT NULL, "name" varchar NOT NULL, "date" varchar NOT NULL, "shortDescription" varchar NOT NULL, CONSTRAINT "UQ_397141897c52dec3904419be40e" UNIQUE ("slug"))`);
        await queryRunner.query(`CREATE TABLE "user" ("email" varchar PRIMARY KEY NOT NULL, "password" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "conference"`);
    }

}
