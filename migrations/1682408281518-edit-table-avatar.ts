import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableAvatar1682408281518 implements MigrationInterface {
    name = 'editTableAvatar1682408281518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boarding_house_image" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "local_file_id" integer NOT NULL, "boarding_house_id" integer NOT NULL, CONSTRAINT "PK_f353a0f04faff6dfb03a4051fa2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boarding_house_image" ADD CONSTRAINT "FK_c450f83075d9f749f35d0b5efee" FOREIGN KEY ("local_file_id") REFERENCES "local_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boarding_house_image" ADD CONSTRAINT "FK_4ab39a57d8936e9419d2643f674" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boarding_house_image" DROP CONSTRAINT "FK_4ab39a57d8936e9419d2643f674"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_image" DROP CONSTRAINT "FK_c450f83075d9f749f35d0b5efee"`);
        await queryRunner.query(`DROP TABLE "boarding_house_image"`);
    }

}
