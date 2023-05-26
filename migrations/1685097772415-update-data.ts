import { MigrationInterface, QueryRunner } from "typeorm";

export class updateData1685097772415 implements MigrationInterface {
    name = 'updateData1685097772415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bill" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" SERIAL NOT NULL, "bank_name" character varying(50), "trading_code" character varying(50), "trading_title" character varying(50), "amount_of_money" character varying(50), "status" character varying(50), "user_id" integer NOT NULL, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."user_pack_type_enum" RENAME TO "user_pack_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_pack_type_enum" AS ENUM('FREE', 'BASIC', 'PREMIUM')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pack_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pack_type" TYPE "public"."user_pack_type_enum" USING "pack_type"::"text"::"public"."user_pack_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pack_type" SET DEFAULT 'FREE'`);
        await queryRunner.query(`DROP TYPE "public"."user_pack_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_34e537d6261c55286aa58921ada" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_34e537d6261c55286aa58921ada"`);
        await queryRunner.query(`CREATE TYPE "public"."user_pack_type_enum_old" AS ENUM('FREE', 'MEDIUM', 'PLATINUM')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pack_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pack_type" TYPE "public"."user_pack_type_enum_old" USING "pack_type"::"text"::"public"."user_pack_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pack_type" SET DEFAULT 'FREE'`);
        await queryRunner.query(`DROP TYPE "public"."user_pack_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_pack_type_enum_old" RENAME TO "user_pack_type_enum"`);
        await queryRunner.query(`DROP TABLE "bill"`);
    }

}
