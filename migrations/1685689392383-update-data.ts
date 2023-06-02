import { MigrationInterface, QueryRunner } from "typeorm";

export class updateData1685689392383 implements MigrationInterface {
    name = 'updateData1685689392383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boarding_house_to_tag" DROP CONSTRAINT "FK_0b35e5079e24bacf3fff740c2aa"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_to_tag" DROP COLUMN "tag_id"`);
        await queryRunner.query(`CREATE TYPE "public"."boarding_house_admin_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "admin_status" "public"."boarding_house_admin_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "admin_status"`);
        await queryRunner.query(`DROP TYPE "public"."boarding_house_admin_status_enum"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_to_tag" ADD "tag_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "boarding_house_to_tag" ADD CONSTRAINT "FK_0b35e5079e24bacf3fff740c2aa" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
