import { MigrationInterface, QueryRunner } from "typeorm";

export class addPolicy1676444498706 implements MigrationInterface {
    name = 'addPolicy1676444498706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."policy_action_enum" AS ENUM('manage', 'read', 'write')`);
        await queryRunner.query(`CREATE TYPE "public"."policy_resource_enum" AS ENUM('all', 'admin', 'merchant', 'customer', 'policy', 'gift', 'event', 'product')`);
        await queryRunner.query(`CREATE TYPE "public"."policy_action_ability_enum" AS ENUM('can', 'cannot')`);
        await queryRunner.query(`CREATE TABLE "policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "action" "public"."policy_action_enum" NOT NULL, "resource" "public"."policy_resource_enum" NOT NULL, "action_ability" "public"."policy_action_ability_enum" NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_5ad65e4ff971649343992959bd0" UNIQUE ("name"), CONSTRAINT "UQ_POLICIES" UNIQUE ("action", "resource", "action_ability"), CONSTRAINT "PK_9917b0c5e4286703cc656b1d39f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_to_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "policy_id" integer NOT NULL, "group_policy_key" character varying NOT NULL, CONSTRAINT "PK_8e7aaf5dcda23ae12e87a4062e7" PRIMARY KEY ("policy_id", "group_policy_key"))`);
        await queryRunner.query(`CREATE TYPE "public"."group_policy_status_enum" AS ENUM('ACTIVE', 'IN_ACTIVE')`);
        await queryRunner.query(`CREATE TABLE "group_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "key" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."group_policy_status_enum" NOT NULL, CONSTRAINT "UQ_906d6b23eceede5b4a461d982a3" UNIQUE ("name"), CONSTRAINT "PK_9755819d43fa39f14c94b8c4a64" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "user_to_group_policy" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer NOT NULL, "group_policy_key" character varying NOT NULL, CONSTRAINT "PK_2be4cb4d58dfe6f11b7f4135f81" PRIMARY KEY ("user_id", "group_policy_key"))`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" ADD CONSTRAINT "FK_547333b0c9f647f9595e2d0d908" FOREIGN KEY ("policy_id") REFERENCES "policy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" ADD CONSTRAINT "FK_2c8db816744eea4486d1859a304" FOREIGN KEY ("group_policy_key") REFERENCES "group_policy"("key") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" ADD CONSTRAINT "FK_da28d5ea6b706ac14605106e0d6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" ADD CONSTRAINT "FK_60bea5b666c07cb01a9e13753cd" FOREIGN KEY ("group_policy_key") REFERENCES "group_policy"("key") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" DROP CONSTRAINT "FK_60bea5b666c07cb01a9e13753cd"`);
        await queryRunner.query(`ALTER TABLE "user_to_group_policy" DROP CONSTRAINT "FK_da28d5ea6b706ac14605106e0d6"`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" DROP CONSTRAINT "FK_2c8db816744eea4486d1859a304"`);
        await queryRunner.query(`ALTER TABLE "group_to_policy" DROP CONSTRAINT "FK_547333b0c9f647f9595e2d0d908"`);
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
