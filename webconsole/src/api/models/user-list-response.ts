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
 * @interface UserListResponse
 */
export interface UserListResponse {

    /**
     * @type {string}
     * @memberof UserListResponse
     */
    guid: string;

    /**
     * @type {string}
     * @memberof UserListResponse
     */
    name: string;

    /**
     * @type {string}
     * @memberof UserListResponse
     */
    email: string;

    /**
     * @type {string}
     * @memberof UserListResponse
     */
    note?: string | null;

    /**
     * @type {number}
     * @memberof UserListResponse
     */
    status: number;

    /**
     * @type {string}
     * @memberof UserListResponse
     */
    group_name: string;

    /**
     * @type {boolean}
     * @memberof UserListResponse
     */
    is_admin: boolean;
}
