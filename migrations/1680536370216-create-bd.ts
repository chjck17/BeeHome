import { MigrationInterface, QueryRunner } from "typeorm";

export class createBd1680536370216 implements MigrationInterface {
    name = 'createBd1680536370216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."policy_action_enum" AS ENUM('manage', 'create', 'read', 'update', 'delete')`);
        await queryRunner.query(`CREATE TYPE "public"."policy_resource_enum" AS ENUM('all', 'admin', 'lessor', 'customer', 'policy', 'group_policy')`);
        await queryRunner.query(`CREATE TYPE "public"."policy_action_ability_enum" AS ENUM('can', 'cannot')`);
        await queryRunner.query(`CREATE TYPE "public"."policy_type_enum" AS ENUM('admin', 'common')`);
        await queryRunner.query(`CREATE TABLE "policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "action" "public"."policy_action_enum" NOT NULL, "resource" "public"."policy_resource_enum" NOT NULL, "action_ability" "public"."policy_action_ability_enum" NOT NULL, "name" character varying NOT NULL, "type" "public"."policy_type_enum" NOT NULL, CONSTRAINT "UQ_POLICIES" UNIQUE ("action", "resource", "action_ability"), CONSTRAINT "PK_9917b0c5e4286703cc656b1d39f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f91781515b77e75acc8699b340" ON "policy" ("name") WHERE deleted_at is null`);
        await queryRunner.query(`CREATE TABLE "group_to_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "policy_id" integer NOT NULL, "group_policy_id" integer NOT NULL, CONSTRAINT "PK_909a49611af01af60a5014ae6f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."group_policy_status_enum" AS ENUM('ACTIVE', 'IN_ACTIVE')`);
        await queryRunner.query(`CREATE TYPE "public"."group_policy_type_enum" AS ENUM('COMMON', 'ADMIN', 'LESSOR')`);
        await queryRunner.query(`CREATE TABLE "group_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."group_policy_status_enum" NOT NULL, "type" "public"."group_policy_type_enum" NOT NULL, "owner_id" integer NOT NULL, CONSTRAINT "PK_6141276c36bd3276acad7ce4fb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_to_group_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer NOT NULL, "group_policy_key" integer NOT NULL, CONSTRAINT "PK_2be4cb4d58dfe6f11b7f4135f81" PRIMARY KEY ("user_id", "group_policy_key"))`);
        await queryRunner.query(`CREATE TYPE "public"."customer_status_enum" AS ENUM('ACTIVE')`);
        await queryRunner.query(`CREATE TABLE "customer" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "phone_number" character varying(50), "address" character varying(255), "email" character varying(255), "first_name" character varying(50), "last_name" character varying(50), "birth_date" TIMESTAMP WITH TIME ZONE, "status" "public"."customer_status_enum" NOT NULL DEFAULT 'ACTIVE', "password" character varying(255) NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_5d1f609371a285123294fddcf3" UNIQUE ("user_id"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."manager_status_enum" AS ENUM('ACTIVE', 'BANNED')`);
        await queryRunner.query(`CREATE TABLE "manager" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "status" "public"."manager_status_enum" NOT NULL, "name" character varying(255), "user_id" integer NOT NULL, CONSTRAINT "REL_0df13ca5fe5c3dbbc4da54df8e" UNIQUE ("user_id"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3feef85f683b0e7936096886be" ON "manager" ("username") WHERE deleted_at is null`);
        await queryRunner.query(`CREATE TYPE "public"."lessor_status_enum" AS ENUM('UNVERIFIED', 'VERIFIED', 'APPROVED', 'REFUSED', 'BLOCKED')`);
        await queryRunner.query(`CREATE TYPE "public"."lessor_rank_enum" AS ENUM('BASIC')`);
        await queryRunner.query(`CREATE TABLE "lessor" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" "public"."lessor_status_enum" NOT NULL, "rank" "public"."lessor_rank_enum" NOT NULL DEFAULT 'BASIC', "address" character varying, "phone_number" character varying(50), "user_id" integer NOT NULL, CONSTRAINT "REL_e5cc02ea6e1f69d45e39586d21" UNIQUE ("user_id"), CONSTRAINT "PK_282bcde9ed523a4ee1e35f92054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_55371d90d854aa8f90fc3ce3b8" ON "lessor" ("email") WHERE deleted_at is null`);
        await queryRunner.query(`CREATE TYPE "public"."user_token_type_enum" AS ENUM('VERIFICATION', 'RESET_PASSWORD')`);
        await queryRunner.query(`CREATE TABLE "user_token" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "type" "public"."user_token_type_enum" NOT NULL, "token" character varying(256) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE, "user_id" integer NOT NULL, CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('CUSTOMER', 'LESSOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "type" "public"."user_type_enum" NOT NULL DEFAULT 'LESSOR', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."admin_status_enum" AS ENUM('ACTIVE', 'BANNED')`);
        await queryRunner.query(`CREATE TABLE "admin" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "status" "public"."admin_status_enum" NOT NULL, "name" character varying(255), "user_id" integer NOT NULL, CONSTRAINT "REL_a28028ba709cd7e5053a86857b" UNIQUE ("user_id"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f4479daa1fb7d34d73c233283f" ON "admin" ("username") WHERE deleted_at is null`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" ADD CONSTRAINT "FK_547333b0c9f647f9595e2d0d908" FOREIGN KEY ("policy_id") REFERENCES "policy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" ADD CONSTRAINT "FK_d26b43fcc8f5bfb1ab73ad2e63d" FOREIGN KEY ("group_policy_id") REFERENCES "group_policy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_policy" ADD CONSTRAINT "FK_aa90a3767e9c5de28c0fa071e29" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" ADD CONSTRAINT "FK_da28d5ea6b706ac14605106e0d6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" ADD CONSTRAINT "FK_60bea5b666c07cb01a9e13753cd" FOREIGN KEY ("group_policy_key") REFERENCES "group_policy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_5d1f609371a285123294fddcf3a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "FK_0df13ca5fe5c3dbbc4da54df8ee" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lessor" ADD CONSTRAINT "FK_e5cc02ea6e1f69d45e39586d21f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD CONSTRAINT "FK_79ac751931054ef450a2ee47778" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_a28028ba709cd7e5053a86857b4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_a28028ba709cd7e5053a86857b4"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "FK_79ac751931054ef450a2ee47778"`);
        await queryRunner.query(`ALTER TABLE "lessor" DROP CONSTRAINT "FK_e5cc02ea6e1f69d45e39586d21f"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_0df13ca5fe5c3dbbc4da54df8ee"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_5d1f609371a285123294fddcf3a"`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" DROP CONSTRAINT "FK_60bea5b666c07cb01a9e13753cd"`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" DROP CONSTRAINT "FK_da28d5ea6b706ac14605106e0d6"`);
        await queryRunner.query(`ALTER TABLE "group_policy" DROP CONSTRAINT "FK_aa90a3767e9c5de28c0fa071e29"`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" DROP CONSTRAINT "FK_d26b43fcc8f5bfb1ab73ad2e63d"`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" DROP CONSTRAINT "FK_547333b0c9f647f9595e2d0d908"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4479daa1fb7d34d73c233283f"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TYPE "public"."admin_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_token"`);
        await queryRunner.query(`DROP TYPE "public"."user_token_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55371d90d854aa8f90fc3ce3b8"`);
        await queryRunner.query(`DROP TABLE "lessor"`);
        await queryRunner.query(`DROP TYPE "public"."lessor_rank_enum"`);
        await queryRunner.query(`DROP TYPE "public"."lessor_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3feef85f683b0e7936096886be"`);
        await queryRunner.query(`DROP TABLE "manager"`);
        await queryRunner.query(`DROP TYPE "public"."manager_status_enum"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TYPE "public"."customer_status_enum"`);
        await queryRunner.query(`DROP TABLE "user_to_group_policy"`);
        await queryRunner.query(`DROP TABLE "group_policy"`);
        await queryRunner.query(`DROP TYPE "public"."group_policy_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."group_policy_status_enum"`);
        await queryRunner.query(`DROP TABLE "group_to_policy"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f91781515b77e75acc8699b340"`);
        await queryRunner.query(`DROP TABLE "policy"`);
        await queryRunner.query(`DROP TYPE "public"."policy_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policy_action_ability_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policy_resource_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policy_action_enum"`);
    }

}
