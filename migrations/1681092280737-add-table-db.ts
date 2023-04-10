import { MigrationInterface, QueryRunner } from "typeorm";

export class addTableDb1681092280737 implements MigrationInterface {
    name = 'addTableDb1681092280737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_attribute_term" DROP CONSTRAINT "FK_b1e1e2555ea1a5ad32a13c2c18f"`);
        await queryRunner.query(`ALTER TABLE "room_attribute" DROP CONSTRAINT "FK_ba0c55c7b39aa4a5d94a464afdd"`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term" RENAME COLUMN "user_id" TO "room_attribute_id"`);
        await queryRunner.query(`ALTER TABLE "room_attribute" RENAME COLUMN "room_attribute_term_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "room_image" RENAME COLUMN "file_id" TO "local_file_id"`);
        await queryRunner.query(`CREATE TABLE "boarding_house_address" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "city" character varying, "state" character varying, "province" character varying NOT NULL, "ward" character varying NOT NULL, "district" character varying NOT NULL, "boarding_house_id" integer NOT NULL, CONSTRAINT "REL_e29856c9fde82534cc81b9d121" UNIQUE ("boarding_house_id"), CONSTRAINT "PK_30a392298976da3b72e3afd3723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."boarding_house_rule_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "boarding_house_rule" ("id" SERIAL NOT NULL, "lang" "public"."boarding_house_rule_lang_enum" NOT NULL, "content" character varying NOT NULL, "boarding_house_id" integer NOT NULL, CONSTRAINT "PK_3501ea0f78cd5761029b0f0b58f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."boarding_house_rent_deposit_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "boarding_house_rent_deposit" ("id" SERIAL NOT NULL, "lang" "public"."boarding_house_rent_deposit_lang_enum" NOT NULL, "content" character varying NOT NULL, "boarding_house_id" integer NOT NULL, CONSTRAINT "PK_cbc99b4fb4270b8125be7c2dc2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."province_type_enum" AS ENUM('PROVINCE', 'COUNTRY', 'REGION', 'DISTRICT', 'WARD')`);
        await queryRunner.query(`CREATE TABLE "province" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "name" character varying(300) NOT NULL, "type" "public"."province_type_enum" NOT NULL, "parent_id" integer, CONSTRAINT "PK_4f461cb46f57e806516b7073659" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."boarding_house_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "status" "public"."boarding_house_status_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."boarding_house_type_enum" AS ENUM('MULTIPLE_ROOM', 'SINGLE_ROOM')`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "type" "public"."boarding_house_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term" ADD CONSTRAINT "FK_d044412eda8116cd9af89171981" FOREIGN KEY ("room_attribute_id") REFERENCES "room_attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_attribute" ADD CONSTRAINT "FK_a9656d24914228384910c0a303d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" ADD CONSTRAINT "FK_e29856c9fde82534cc81b9d121e" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" ADD CONSTRAINT "FK_be791f1c623631569a703974ec7" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" ADD CONSTRAINT "FK_2dfb7dafeaff1446a1de10d1777" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_image" ADD CONSTRAINT "FK_691e15e9068c640a4262af02953" FOREIGN KEY ("local_file_id") REFERENCES "local_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_image" ADD CONSTRAINT "FK_35ee2cf0c1288e44be6a54da441" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "province" ADD CONSTRAINT "FK_87bc36ff841f9d52865ccbc4aca" FOREIGN KEY ("parent_id") REFERENCES "province"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "province" DROP CONSTRAINT "FK_87bc36ff841f9d52865ccbc4aca"`);
        await queryRunner.query(`ALTER TABLE "room_image" DROP CONSTRAINT "FK_35ee2cf0c1288e44be6a54da441"`);
        await queryRunner.query(`ALTER TABLE "room_image" DROP CONSTRAINT "FK_691e15e9068c640a4262af02953"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" DROP CONSTRAINT "FK_2dfb7dafeaff1446a1de10d1777"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" DROP CONSTRAINT "FK_be791f1c623631569a703974ec7"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" DROP CONSTRAINT "FK_e29856c9fde82534cc81b9d121e"`);
        await queryRunner.query(`ALTER TABLE "room_attribute" DROP CONSTRAINT "FK_a9656d24914228384910c0a303d"`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term" DROP CONSTRAINT "FK_d044412eda8116cd9af89171981"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."boarding_house_type_enum"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."boarding_house_status_enum"`);
        await queryRunner.query(`DROP TABLE "province"`);
        await queryRunner.query(`DROP TYPE "public"."province_type_enum"`);
        await queryRunner.query(`DROP TABLE "boarding_house_rent_deposit"`);
        await queryRunner.query(`DROP TYPE "public"."boarding_house_rent_deposit_lang_enum"`);
        await queryRunner.query(`DROP TABLE "boarding_house_rule"`);
        await queryRunner.query(`DROP TYPE "public"."boarding_house_rule_lang_enum"`);
        await queryRunner.query(`DROP TABLE "boarding_house_address"`);
        await queryRunner.query(`ALTER TABLE "room_image" RENAME COLUMN "local_file_id" TO "file_id"`);
        await queryRunner.query(`ALTER TABLE "room_attribute" RENAME COLUMN "user_id" TO "room_attribute_term_id"`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term" RENAME COLUMN "room_attribute_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "room_attribute" ADD CONSTRAINT "FK_ba0c55c7b39aa4a5d94a464afdd" FOREIGN KEY ("room_attribute_term_id") REFERENCES "room_attribute_term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term" ADD CONSTRAINT "FK_b1e1e2555ea1a5ad32a13c2c18f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
