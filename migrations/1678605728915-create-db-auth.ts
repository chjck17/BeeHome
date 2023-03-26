import { MigrationInterface, QueryRunner } from "typeorm";

export class createDbAuth1678605728915 implements MigrationInterface {
    name = 'createDbAuth1678605728915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."policy_action_enum" AS ENUM('manage', 'read', 'write')`);
        await queryRunner.query(`CREATE TYPE "public"."policy_resource_enum" AS ENUM('all', 'admin', 'merchant', 'customer', 'policy', 'gift', 'event', 'product')`);
        await queryRunner.query(`CREATE TYPE "public"."policy_action_ability_enum" AS ENUM('can', 'cannot')`);
        await queryRunner.query(`CREATE TABLE "policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "action" "public"."policy_action_enum" NOT NULL, "resource" "public"."policy_resource_enum" NOT NULL, "action_ability" "public"."policy_action_ability_enum" NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_5ad65e4ff971649343992959bd0" UNIQUE ("name"), CONSTRAINT "UQ_POLICIES" UNIQUE ("action", "resource", "action_ability"), CONSTRAINT "PK_9917b0c5e4286703cc656b1d39f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_to_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "policy_id" integer NOT NULL, "group_policy_key" character varying NOT NULL, CONSTRAINT "PK_8e7aaf5dcda23ae12e87a4062e7" PRIMARY KEY ("policy_id", "group_policy_key"))`);
        await queryRunner.query(`CREATE TYPE "public"."group_policy_status_enum" AS ENUM('ACTIVE', 'IN_ACTIVE')`);
        await queryRunner.query(`CREATE TABLE "group_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "key" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."group_policy_status_enum" NOT NULL, CONSTRAINT "UQ_906d6b23eceede5b4a461d982a3" UNIQUE ("name"), CONSTRAINT "PK_9755819d43fa39f14c94b8c4a64" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "user_to_group_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer NOT NULL, "group_policy_key" character varying NOT NULL, CONSTRAINT "PK_2be4cb4d58dfe6f11b7f4135f81" PRIMARY KEY ("user_id", "group_policy_key"))`);
        await queryRunner.query(`CREATE TYPE "public"."admin_status_enum" AS ENUM('ACTIVE', 'BANNED')`);
        await queryRunner.query(`CREATE TABLE "admin" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "status" "public"."admin_status_enum" NOT NULL, "name" character varying(255), "user_id" integer NOT NULL, CONSTRAINT "REL_a28028ba709cd7e5053a86857b" UNIQUE ("user_id"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f4479daa1fb7d34d73c233283f" ON "admin" ("username") WHERE deleted_at is null`);
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
        await queryRunner.query(`CREATE TYPE "public"."customer_status_enum" AS ENUM('ACTIVE')`);
        await queryRunner.query(`CREATE TABLE "customer" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "phone_number" character varying(50), "address" character varying(255), "email" character varying(255), "first_name" character varying(50), "last_name" character varying(50), "birth_date" TIMESTAMP WITH TIME ZONE, "status" "public"."customer_status_enum" NOT NULL DEFAULT 'ACTIVE', "password" character varying(255) NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_5d1f609371a285123294fddcf3" UNIQUE ("user_id"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_detail" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_12ea67a439667df5593ff68fc33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "categories_id" integer, "detail_id" integer, CONSTRAINT "REL_12ea67a439667df5593ff68fc3" UNIQUE ("detail_id"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" ADD CONSTRAINT "FK_547333b0c9f647f9595e2d0d908" FOREIGN KEY ("policy_id") REFERENCES "policy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" ADD CONSTRAINT "FK_2c8db816744eea4486d1859a304" FOREIGN KEY ("group_policy_key") REFERENCES "group_policy"("key") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" ADD CONSTRAINT "FK_da28d5ea6b706ac14605106e0d6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" ADD CONSTRAINT "FK_60bea5b666c07cb01a9e13753cd" FOREIGN KEY ("group_policy_key") REFERENCES "group_policy"("key") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_a28028ba709cd7e5053a86857b4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "FK_0df13ca5fe5c3dbbc4da54df8ee" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lessor" ADD CONSTRAINT "FK_e5cc02ea6e1f69d45e39586d21f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD CONSTRAINT "FK_79ac751931054ef450a2ee47778" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_5d1f609371a285123294fddcf3a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_7069dac60d88408eca56fdc9e0c" FOREIGN KEY ("categories_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_12ea67a439667df5593ff68fc33" FOREIGN KEY ("detail_id") REFERENCES "product_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_12ea67a439667df5593ff68fc33"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_7069dac60d88408eca56fdc9e0c"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_5d1f609371a285123294fddcf3a"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "FK_79ac751931054ef450a2ee47778"`);
        await queryRunner.query(`ALTER TABLE "lessor" DROP CONSTRAINT "FK_e5cc02ea6e1f69d45e39586d21f"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_0df13ca5fe5c3dbbc4da54df8ee"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_a28028ba709cd7e5053a86857b4"`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" DROP CONSTRAINT "FK_60bea5b666c07cb01a9e13753cd"`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" DROP CONSTRAINT "FK_da28d5ea6b706ac14605106e0d6"`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" DROP CONSTRAINT "FK_2c8db816744eea4486d1859a304"`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" DROP CONSTRAINT "FK_547333b0c9f647f9595e2d0d908"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_detail"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TYPE "public"."customer_status_enum"`);
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
        await queryRunner.query(`DROP INDEX "public"."IDX_f4479daa1fb7d34d73c233283f"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TYPE "public"."admin_status_enum"`);
        await queryRunner.query(`DROP TABLE "user_to_group_policy"`);
        await queryRunner.query(`DROP TABLE "group_policy"`);
        await queryRunner.query(`DROP TYPE "public"."group_policy_status_enum"`);
        await queryRunner.query(`DROP TABLE "group_to_policy"`);
        await queryRunner.query(`DROP TABLE "policy"`);
        await queryRunner.query(`DROP TYPE "public"."policy_action_ability_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policy_resource_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policy_action_enum"`);
    }

}
