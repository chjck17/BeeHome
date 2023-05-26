import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateData1685072808532 implements MigrationInterface {
  name = 'updateData1685072808532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."service_pack_pack_type_enum" AS ENUM('FREE', 'MEDIUM', 'PLATINUM')`,
    );
    await queryRunner.query(
      `CREATE TABLE "service_pack" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "pack_type" "public"."service_pack_pack_type_enum" NOT NULL DEFAULT 'FREE', "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_add1045f9e94234a314d6708b6" UNIQUE ("user_id"), CONSTRAINT "PK_a77d9b1f5c107248361c4d0a65c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "province" DROP COLUMN "INSERT INTO public.province (created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "province" DROP COLUMN "parent_id) VALUES"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_pack" ADD CONSTRAINT "FK_add1045f9e94234a314d6708b6a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_pack" DROP CONSTRAINT "FK_add1045f9e94234a314d6708b6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "province" ADD "parent_id) VALUES" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "province" ADD "INSERT INTO public.province (created_at" character varying(50)`,
    );
    await queryRunner.query(`DROP TABLE "service_pack"`);
    await queryRunner.query(`DROP TYPE "public"."service_pack_pack_type_enum"`);
  }
}
