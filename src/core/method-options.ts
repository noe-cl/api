/**
 * Created by Miu on 13/05/2017.
 *
 * interface for method options.
 *
 * If you want to have an endpoint with an auth token,
 * you have to add it to the params, same if you need params (AKA req.params)
 *
 * If you need both secure and params, you have to add params THEN auth token.
 */
export interface MethodOptions {

    secure?: boolean;

    specificRoute?: string;

    needsParams?: boolean;
}