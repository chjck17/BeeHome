import { MigrationInterface, QueryRunner } from "typeorm";

export class editTable1683090659508 implements MigrationInterface {
    name = 'editTable1683090659508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "date_meet" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" integer NOT NULL, "room_id" integer NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "avatar_id" integer`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_0739aa1a4092057b22710e1ec6d" UNIQUE ("avatar_id")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_0739aa1a4092057b22710e1ec6d" FOREIGN KEY ("avatar_id") REFERENCES "local_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_159ecb8d2fe0e175ed55ab77550" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_6efabb86c5fb68b9bb2e4ce66b1" FOREIGN KEY ("room_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_6efabb86c5fb68b9bb2e4ce66b1"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_159ecb8d2fe0e175ed55ab77550"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_0739aa1a4092057b22710e1ec6d"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_0739aa1a4092057b22710e1ec6d"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "avatar_id"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
