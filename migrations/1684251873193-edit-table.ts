import { MigrationInterface, QueryRunner } from "typeorm";

export class editTable1684251873193 implements MigrationInterface {
    name = 'editTable1684251873193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book_disable" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "date_disable" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_a7d15b4eec563b28aa8166222da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book_disable" ADD CONSTRAINT "FK_d9a428f6667be3a6286da0699dc" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_disable" DROP CONSTRAINT "FK_d9a428f6667be3a6286da0699dc"`);
        await queryRunner.query(`DROP TABLE "book_disable"`);
    }

}
