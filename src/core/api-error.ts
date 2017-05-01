/**
 * Created by Miu on 29/04/2017.
 */
export class APIError extends Error {

    constructor(public code: number, public message: string) {
        super(code + message);
    }
}