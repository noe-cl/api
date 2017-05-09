/**
 * Created by Miu on 09/05/2017.
 */
export class ModelChecker {

    public static hasProperties(model: any, properties: string[]) {
        let valid = true;
        for (let property of properties) {
            valid = valid && model.hasOwnProperty(property);
        }
        return valid;
    }
}