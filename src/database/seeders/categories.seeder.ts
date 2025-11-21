import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Category } from '../../modules/categories/entities';
import { parseString } from '../helpers';

export class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE "categories" RESTART IDENTITY CASCADE;');

    const dataPath = '../../../src/database/seeders/data/categories.data.json';
    const jsonFilePath = path.join(__dirname, dataPath);
    const data: Category[] = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const values = data
      .map((tag) => {
        const id = `'${tag.id}'`;
        const name = parseString(tag.name);
        const status = `'${tag.status}'`;

        return `(${id}, ${name}, ${status})`;
      })
      .join(', ');

    await dataSource.query(
      `INSERT INTO "categories" 
      (id, name, status) 
      VALUES ${values};`,
    );
  }
}
