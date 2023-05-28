import { MigrationInterface, QueryRunner } from "typeorm";

export class updateData1685294204244 implements MigrationInterface {
    name = 'updateData1685294204244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_pack" DROP CONSTRAINT "FK_44600fe1eea3a8ed6accbee06b4"`);
        await queryRunner.query(`ALTER TABLE "service_pack" DROP CONSTRAINT "UQ_44600fe1eea3a8ed6accbee06b4"`);
        await queryRunner.query(`ALTER TABLE "service_pack" DROP COLUMN "lessor_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pack_type"`);
        await queryRunner.query(`DROP TYPE "public"."user_pack_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."lessor_pack_type_enum" AS ENUM('FREE', 'BASIC', 'PREMIUM')`);
        await queryRunner.query(`ALTER TABLE "lessor" ADD "pack_type" "public"."lessor_pack_type_enum" NOT NULL DEFAULT 'FREE'`);
        await queryRunner.query(`ALTER TABLE "service_pack" ADD CONSTRAINT "UQ_add1045f9e94234a314d6708b6a" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "service_pack" ADD CONSTRAINT "FK_add1045f9e94234a314d6708b6a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_pack" DROP CONSTRAINT "FK_add1045f9e94234a314d6708b6a"`);
        await queryRunner.query(`ALTER TABLE "service_pack" DROP CONSTRAINT "UQ_add1045f9e94234a314d6708b6a"`);
        await queryRunner.query(`ALTER TABLE "lessor" DROP COLUMN "pack_type"`);
        await queryRunner.query(`DROP TYPE "public"."lessor_pack_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_pack_type_enum" AS ENUM('FREE', 'BASIC', 'PREMIUM')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "pack_type" "public"."user_pack_type_enum" NOT NULL DEFAULT 'FREE'`);
        await queryRunner.query(`ALTER TABLE "service_pack" ADD "lessor_id" integer`);
        await queryRunner.query(`ALTER TABLE "service_pack" ADD CONSTRAINT "UQ_44600fe1eea3a8ed6accbee06b4" UNIQUE ("lessor_id")`);
        await queryRunner.query(`ALTER TABLE "service_pack" ADD CONSTRAINT "FK_44600fe1eea3a8ed6accbee06b4" FOREIGN KEY ("lessor_id") REFERENCES "lessor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
