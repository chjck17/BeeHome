import { MigrationInterface, QueryRunner } from "typeorm";

export class addTableCategory1680597230519 implements MigrationInterface {
    name = 'addTableCategory1680597230519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."category_type_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "category_type" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "lang" "public"."category_type_lang_enum" NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_6c2bdfaadc414f95ca862fa5e0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."category_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lang" "public"."category_lang_enum" NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "policy" DROP CONSTRAINT "UQ_POLICIES"`);
        await queryRunner.query(`ALTER TYPE "public"."policy_resource_enum" RENAME TO "policy_resource_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."policy_resource_enum" AS ENUM('all', 'admin', 'lessor', 'customer', 'policy', 'group_policy', 'CATEGORY')`);
        await queryRunner.query(`ALTER TABLE "policy" ALTER COLUMN "resource" TYPE "public"."policy_resource_enum" USING "resource"::"text"::"public"."policy_resource_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policy_resource_enum_old"`);
        await queryRunner.query(`ALTER TABLE "policy" ADD CONSTRAINT "UQ_POLICIES" UNIQUE ("action", "resource", "action_ability")`);
        await queryRunner.query(`ALTER TABLE "category_type" ADD CONSTRAINT "FK_25ea74f8181bbbee0bb4d2a2040" FOREIGN KEY ("user_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_6562e564389d0600e6e243d9604" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_6562e564389d0600e6e243d9604"`);
        await queryRunner.query(`ALTER TABLE "category_type" DROP CONSTRAINT "FK_25ea74f8181bbbee0bb4d2a2040"`);
        await queryRunner.query(`ALTER TABLE "policy" DROP CONSTRAINT "UQ_POLICIES"`);
        await queryRunner.query(`CREATE TYPE "public"."policy_resource_enum_old" AS ENUM('all', 'admin', 'lessor', 'customer', 'policy', 'group_policy')`);
        await queryRunner.query(`ALTER TABLE "policy" ALTER COLUMN "resource" TYPE "public"."policy_resource_enum_old" USING "resource"::"text"::"public"."policy_resource_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."policy_resource_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."policy_resource_enum_old" RENAME TO "policy_resource_enum"`);
        await queryRunner.query(`ALTER TABLE "policy" ADD CONSTRAINT "UQ_POLICIES" UNIQUE ("action", "resource", "action_ability")`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TYPE "public"."category_lang_enum"`);
        await queryRunner.query(`DROP TABLE "category_type"`);
        await queryRunner.query(`DROP TYPE "public"."category_type_lang_enum"`);
    }

}
