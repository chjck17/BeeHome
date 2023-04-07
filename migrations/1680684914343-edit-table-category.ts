import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableCategory1680684914343 implements MigrationInterface {
    name = 'editTableCategory1680684914343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_type" DROP CONSTRAINT "FK_25ea74f8181bbbee0bb4d2a2040"`);
        await queryRunner.query(`CREATE TYPE "public"."category_type_detail_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "category_type_detail" ("id" SERIAL NOT NULL, "lang" "public"."category_type_detail_lang_enum" NOT NULL, "name" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_6d0a1a99b9b9f199da04a359246" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."category_detail_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "category_detail" ("id" SERIAL NOT NULL, "lang" "public"."category_detail_lang_enum" NOT NULL, "name" character varying NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_f589a6cda0ea641492d260d81cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "lang"`);
        await queryRunner.query(`DROP TYPE "public"."category_lang_enum"`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "category_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" ADD CONSTRAINT "FK_ac2ebad62eba521b012d3943872" FOREIGN KEY ("user_id") REFERENCES "category_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD CONSTRAINT "FK_db137af306d53fdc1a13c1da22e" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_detail" ADD CONSTRAINT "FK_46f3786b8e7c2a8f70a064380c5" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_detail" DROP CONSTRAINT "FK_46f3786b8e7c2a8f70a064380c5"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP CONSTRAINT "FK_db137af306d53fdc1a13c1da22e"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" DROP CONSTRAINT "FK_ac2ebad62eba521b012d3943872"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."category_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`ALTER TABLE "category" ADD "lang" "public"."category_lang_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "category_detail"`);
        await queryRunner.query(`DROP TYPE "public"."category_detail_lang_enum"`);
        await queryRunner.query(`DROP TABLE "category_type_detail"`);
        await queryRunner.query(`DROP TYPE "public"."category_type_detail_lang_enum"`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD CONSTRAINT "FK_25ea74f8181bbbee0bb4d2a2040" FOREIGN KEY ("user_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
