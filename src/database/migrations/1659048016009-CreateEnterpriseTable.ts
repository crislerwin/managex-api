import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEnterpriseTable1659048016009 implements MigrationInterface {
  name = 'CreateEnterpriseTable1659048016009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "address" character varying, "complement" character varying, "city" character varying, "uf" character varying, "zipCode" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enterprise" ("id" SERIAL NOT NULL, "enterpriseName" character varying, "socialReason" character varying, "sponsorName" character varying, "employees" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "addressId" integer, CONSTRAINT "PK_09687cd306dc5d486c0e227c471" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "enterpriseId" integer`);
    await queryRunner.query(
      `ALTER TABLE "enterprise" ADD CONSTRAINT "FK_15552e10545c89e1af095247846" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ec5b272580af2c2ae693b655430" FOREIGN KEY ("enterpriseId") REFERENCES "enterprise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ec5b272580af2c2ae693b655430"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enterprise" DROP CONSTRAINT "FK_15552e10545c89e1af095247846"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "enterpriseId"`);
    await queryRunner.query(`DROP TABLE "enterprise"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
