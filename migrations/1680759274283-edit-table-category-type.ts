import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableCategoryType1680759274283 implements MigrationInterface {
    name = 'editTableCategoryType1680759274283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "lang"`);
        await queryRunner.query(`DROP TYPE "public"."category_type_lang_enum"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "version" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."category_type_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "lang" "public"."category_type_lang_enum" NOT NULL`);
    }

}
