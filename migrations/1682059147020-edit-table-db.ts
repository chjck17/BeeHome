import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableDb1682059147020 implements MigrationInterface {
    name = 'editTableDb1682059147020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."boarding_house_description_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "boarding_house_description" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "lang" "public"."boarding_house_description_lang_enum" NOT NULL, "content" character varying NOT NULL, "boarding_house_id" integer NOT NULL, CONSTRAINT "PK_a6571a4863b63e729acb802ae4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lessor" ADD "avatar_id" integer`);
        await queryRunner.query(`ALTER TABLE "lessor" ADD CONSTRAINT "UQ_dda96d60e9c875e4406cb95ebe0" UNIQUE ("avatar_id")`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "electric_fee" character varying`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "water_fee" character varying`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "service_fee" character varying`);
        await queryRunner.query(`ALTER TABLE "lessor" ADD CONSTRAINT "FK_dda96d60e9c875e4406cb95ebe0" FOREIGN KEY ("avatar_id") REFERENCES "local_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boarding_house_description" ADD CONSTRAINT "FK_af6e685da922b4e5efc3bfd4aea" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boarding_house_description" DROP CONSTRAINT "FK_af6e685da922b4e5efc3bfd4aea"`);
        await queryRunner.query(`ALTER TABLE "lessor" DROP CONSTRAINT "FK_dda96d60e9c875e4406cb95ebe0"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "service_fee"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "water_fee"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "electric_fee"`);
        await queryRunner.query(`ALTER TABLE "lessor" DROP CONSTRAINT "UQ_dda96d60e9c875e4406cb95ebe0"`);
        await queryRunner.query(`ALTER TABLE "lessor" DROP COLUMN "avatar_id"`);
        await queryRunner.query(`DROP TABLE "boarding_house_description"`);
        await queryRunner.query(`DROP TYPE "public"."boarding_house_description_lang_enum"`);
    }

}
