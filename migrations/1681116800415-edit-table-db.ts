import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableDb1681116800415 implements MigrationInterface {
    name = 'editTableDb1681116800415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_attribute_term_detail" RENAME COLUMN "value" TO "name"`);
        await queryRunner.query(`ALTER TABLE "room_attribute_detail" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "room_attribute_detail" DROP COLUMN "desc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_attribute_detail" ADD "desc" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room_attribute_detail" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term_detail" RENAME COLUMN "name" TO "value"`);
    }

}
