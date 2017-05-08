import { Config, ConfigModel } from "../../src/config/config";
/**
 * Created by Miu on 09/05/2017.
 */
export class MockConfig extends Config {
    public get data(): ConfigModel {
        return {
            db: {
                host: "localhost",
                user: "root",
                database: "noe",
                password: "lol",
                port: 3306
            },
            jwt: {
                secret: "OmgI'mSoSecret"
            }
        }
    }
}