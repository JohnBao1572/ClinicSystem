import { DataSource, DataSourceOptions } from "typeorm";
import {config} from 'dotenv'
config();

export const dataSourceOptions: DataSourceOptions ={
    type: 'mysql',
        host: process.env.DB_host,
        port: Number(process.env.DB_Port),
        username: process.env.DB_Name,
        password: process.env.DB_Pass,
        database: process.env.DB_NameData,
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/db/migrations/*.js'],
        synchronize: false,
} 

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;