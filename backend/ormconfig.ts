import {
  HOST_BD,
  PASSWORD_BD,
  NAME_BD,
  USER_BD,
  PORT_BD,
} from './src/config/config'
import * as path from 'path'
module.exports = {
  type: 'postgres',
  host: HOST_BD,
  port: PORT_BD,
  username: USER_BD,
  password: PASSWORD_BD,
  database: NAME_BD,
  synchronize: false,
  dropSchema: false,
  logging: false,
  entities: [path.join(__dirname, 'src', 'models', '**', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src', 'migrations', '**', '*{.ts,.js}')],
  subscribers: [path.join(__dirname, 'src', 'subscribers', '**', '*{.ts,.js}')],
  factories: [path.join(__dirname, 'src', 'factories', '**', '*{.ts,.js}')],
  cli: {
    entitiesDir: path.join(__dirname, 'src', 'models'),
    migrationsDir: path.join(__dirname, 'src', 'migrations'),
    subscribersDir: path.join(__dirname, 'src', 'subscribers'),
    factoriesDir: path.join(__dirname, 'src', 'factories'),
  },
}
