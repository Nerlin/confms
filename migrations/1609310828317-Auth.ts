import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1609310828317 implements MigrationInterface {
    name = 'Auth1609310828317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "refreshToken" varchar NOT NULL, "email" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "refreshToken" varchar NOT NULL, "email" varchar, CONSTRAINT "FK_1c5ae03e0f3c273db5d341e660b" FOREIGN KEY ("email") REFERENCES "user" ("email") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_session"("id", "refreshToken", "email") SELECT "id", "refreshToken", "email" FROM "session"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`ALTER TABLE "temporary_session" RENAME TO "session"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" RENAME TO "temporary_session"`);
        await queryRunner.query(`CREATE TABLE "session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "refreshToken" varchar NOT NULL, "email" varchar)`);
        await queryRunner.query(`INSERT INTO "session"("id", "refreshToken", "email") SELECT "id", "refreshToken", "email" FROM "temporary_session"`);
        await queryRunner.query(`DROP TABLE "temporary_session"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
