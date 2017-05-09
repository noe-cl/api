import { MysqlDriver } from "../../src/core/db/mysql-driver";
import { Config } from "../../src/config/config";
import * as mysql from 'mysql';
/**
 * Created by Miu on 08/05/2017.
 */
export class MockMysqlDriver extends MysqlDriver {


    public static requests: MockRequest[] = [];

    /**
     * Used for SELECT * FROM <table> queries.
     */
    public static mockTables: {table: string, data: any}[] = [];

    /**
     * Used for SELECT * FROM <table> WHERE... queries.
     */
    public static mockRows: {table: string, data: any}[] = [];

    constructor(config: Config) {
        super(config);
    }

    query(sqlQuery: string, values: any[] = []): Promise<any> {
        let sql = mysql.format(sqlQuery, values);
        MockMysqlDriver.requests.push({sql: sql, values: values});
        return new Promise<any>((resolve) => {
            if (/INSERT/i.test(sql)) {
                let table = /INSERT INTO `(\w+)`/i.exec(sql)[1];
                let id = Math.floor((Math.random() * 200) + 100);
                MockMysqlDriver.mockRows.push(
                    {
                        table: table,
                        data: {
                            id: id,
                            login: "MockedCreation"
                        }
                    });
                resolve({insertId: id});
            } else if (/DELETE/i.test(sql) || /UPDATE/i.test(sql)) {
                resolve({changedRows: 1});
            } else if (/SELECT/i.test(sql)) {
                let table = /SELECT \* FROM `(\w+)`/i.exec(sql)[1];
                if (/WHERE/i.test(sql)) {
                    let match = /SELECT \* FROM `\w+` WHERE `(\w+)` = `?(.+)`?/i.exec(sql);
                    let where = {property: match[1], value: match[2]};
                    let result = MockMysqlDriver.mockRows.filter(row => {
                        return row.table == table && row.data[where.property] == where.value;
                    });
                    let data = [];
                    for (let row of result) {
                        data.push(row.data);
                    }
                    resolve(data);
                } else {
                    resolve(MockMysqlDriver.mockTables.filter(row => {
                        return row.table == table;
                    }));
                }
            }
        });
    }
}

export interface MockRequest {
    sql: string;
    values: any[];
}
