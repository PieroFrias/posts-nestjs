import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../modules/users/entities';
import { parseString } from '../helpers';
import { encodePassword } from '../../common/utils';

export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;');

    const dataPath = '../../../src/database/seeders/data/users.data.json';
    const jsonFilePath = path.join(__dirname, dataPath);
    const data: User[] = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const usersWithEncryptedPasswords = await Promise.all(
      data.map(async (user) => ({
        ...user,
        password: user.password ? await encodePassword(user.password) : null,
      })),
    );

    const values = usersWithEncryptedPasswords
      .map((user) => {
        const id = `'${user.id}'`;
        const email = parseString(user.email);
        const username = parseString(user.username);
        const password = parseString(user.password);
        const role = `'${user.role}'`;
        const status = `'${user.status}'`;

        return `('${user.id}', ${email}, ${username}, ${password}, ${role}, ${status})`;
      })
      .join(', ');

    await dataSource.query(
      `INSERT INTO "users" 
      (id, email, username, password, role, status) 
      VALUES ${values};`,
    );
  }
}
