import { MigrationInterface, QueryRunner } from "typeorm";

export class EditClientEntitie1703645997269 implements MigrationInterface {
    name = 'EditClientEntitie1703645997269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "dateJoin"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "dateJoin" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "dateJoin"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "dateJoin" character varying NOT NULL`);
    }

}
