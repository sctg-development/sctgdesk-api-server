/* tslint:disable */
/* eslint-disable */
/**
 * sctgdesk-api-server
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 
 *
 * @export
 * @interface Provider
 */
export interface Provider {

    /**
     * @type {string}
     * @memberof Provider
     */
    name: string;

    /**
     * @type {number}
     * @memberof Provider
     */
    order_index: number;

    /**
     * @type {boolean}
     * @memberof Provider
     */
    enabled: boolean;

    /**
     * @type {string}
     * @memberof Provider
     */
    client_id: string;

    /**
     * @type {string}
     * @memberof Provider
     */
    client_secret: string;

    /**
     * @type {string}
     * @memberof Provider
     */
    authorization_endpoint: string;

    /**
     * @type {string}
     * @memberof Provider
     */
    token_endpoint: string;

    /**
     * @type {string}
     * @memberof Provider
     */
    userinfo_endpoint: string;
}
