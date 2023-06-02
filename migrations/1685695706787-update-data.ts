import { MigrationInterface, QueryRunner } from "typeorm";

export class updateData1685695706787 implements MigrationInterface {
    name = 'updateData1685695706787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."customer_status_enum" RENAME TO "customer_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."customer_status_enum" AS ENUM('ACTIVE', 'BANNED')`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "status" TYPE "public"."customer_status_enum" USING "status"::"text"::"public"."customer_status_enum"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."customer_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."customer_status_enum_old" AS ENUM('ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "status" TYPE "public"."customer_status_enum_old" USING "status"::"text"::"public"."customer_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."customer_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."customer_status_enum_old" RENAME TO "customer_status_enum"`);
    }

}
