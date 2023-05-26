import { MigrationInterface, QueryRunner } from "typeorm";

export class updateData1685084990167 implements MigrationInterface {
    name = 'updateData1685084990167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "status" character varying DEFAULT 'PROCESSING', "title" character varying(300), "date_report" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" integer NOT NULL, "boarding_house_id" integer NOT NULL, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service_pack" DROP COLUMN "pack_type"`);
        await queryRunner.query(`DROP TYPE "public"."service_pack_pack_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_pack_type_enum" AS ENUM('FREE', 'MEDIUM', 'PLATINUM')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "pack_type" "public"."user_pack_type_enum" NOT NULL DEFAULT 'FREE'`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_3277980130270a4cb1f2aea26e7" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_3277980130270a4cb1f2aea26e7"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pack_type"`);
        await queryRunner.query(`DROP TYPE "public"."user_pack_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."service_pack_pack_type_enum" AS ENUM('FREE', 'MEDIUM', 'PLATINUM')`);
        await queryRunner.query(`ALTER TABLE "service_pack" ADD "pack_type" "public"."service_pack_pack_type_enum" NOT NULL DEFAULT 'FREE'`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
