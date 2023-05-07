import { MigrationInterface, QueryRunner } from "typeorm";

export class editTable1683120361683 implements MigrationInterface {
    name = 'editTable1683120361683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "first_name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "book" ADD "last_name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "book" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "book" ADD "phone_number" character varying(50)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b67970f5a995b6743a44b9d5d8" ON "book" ("email") WHERE deleted_at is null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b67970f5a995b6743a44b9d5d8"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "first_name"`);
    }

}
