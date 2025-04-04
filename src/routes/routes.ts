/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BitcoinController } from './../controllers/btc-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/auth-controller';
import { expressAuthentication } from './../middleware/authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "BlockchainInfo": {
        "dataType": "refObject",
        "properties": {
            "chain": {"dataType":"string","required":true},
            "blocks": {"dataType":"double","required":true},
            "headers": {"dataType":"double","required":true},
            "bestblockhash": {"dataType":"string","required":true},
            "difficulty": {"dataType":"double","required":true},
            "time": {"dataType":"double","required":true},
            "mediantime": {"dataType":"double","required":true},
            "verificationprogress": {"dataType":"double","required":true},
            "initialblockdownload": {"dataType":"boolean","required":true},
            "chainwork": {"dataType":"string","required":true},
            "size_on_disk": {"dataType":"double","required":true},
            "pruned": {"dataType":"boolean","required":true},
            "warnings": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NetworkInfo": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "limited": {"dataType":"boolean","required":true},
            "reachable": {"dataType":"boolean","required":true},
            "proxy": {"dataType":"string","required":true},
            "proxy_randomize_credentials": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LocalAddress": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "port": {"dataType":"double","required":true},
            "score": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NetworkInfoResponse": {
        "dataType": "refObject",
        "properties": {
            "version": {"dataType":"double","required":true},
            "subversion": {"dataType":"string","required":true},
            "protocolversion": {"dataType":"double","required":true},
            "localservices": {"dataType":"string","required":true},
            "localservicesnames": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "localrelay": {"dataType":"boolean","required":true},
            "timeoffset": {"dataType":"double","required":true},
            "networkactive": {"dataType":"boolean","required":true},
            "connections": {"dataType":"double","required":true},
            "connections_in": {"dataType":"double","required":true},
            "connections_out": {"dataType":"double","required":true},
            "networks": {"dataType":"array","array":{"dataType":"refObject","ref":"NetworkInfo"},"required":true},
            "relayfee": {"dataType":"double","required":true},
            "incrementalfee": {"dataType":"double","required":true},
            "localaddresses": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalAddress"},"required":true},
            "warnings": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MempoolInfo": {
        "dataType": "refObject",
        "properties": {
            "loaded": {"dataType":"boolean","required":true},
            "size": {"dataType":"double","required":true},
            "bytes": {"dataType":"double","required":true},
            "usage": {"dataType":"double","required":true},
            "total_fee": {"dataType":"double","required":true},
            "maxmempool": {"dataType":"double","required":true},
            "mempoolminfee": {"dataType":"double","required":true},
            "minrelaytxfee": {"dataType":"double","required":true},
            "incrementalrelayfee": {"dataType":"double","required":true},
            "unbroadcastcount": {"dataType":"double","required":true},
            "fullrbf": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BitcoinSummaryInfo": {
        "dataType": "refObject",
        "properties": {
            "blockchain": {"ref":"BlockchainInfo","required":true},
            "network": {"ref":"NetworkInfoResponse","required":true},
            "mempool": {"ref":"MempoolInfo","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Block": {
        "dataType": "refObject",
        "properties": {
            "hash": {"dataType":"string","required":true},
            "confirmations": {"dataType":"double","required":true},
            "height": {"dataType":"double","required":true},
            "version": {"dataType":"double","required":true},
            "versionHex": {"dataType":"string","required":true},
            "merkleroot": {"dataType":"string","required":true},
            "time": {"dataType":"double","required":true},
            "mediantime": {"dataType":"double","required":true},
            "nonce": {"dataType":"double","required":true},
            "bits": {"dataType":"string","required":true},
            "difficulty": {"dataType":"double","required":true},
            "chainwork": {"dataType":"string","required":true},
            "nTx": {"dataType":"double","required":true},
            "previousblockhash": {"dataType":"string","required":true},
            "strippedsize": {"dataType":"double","required":true},
            "size": {"dataType":"double","required":true},
            "weight": {"dataType":"double","required":true},
            "tx": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginatedBlocksResponse": {
        "dataType": "refObject",
        "properties": {
            "blocks": {"dataType":"array","array":{"dataType":"refObject","ref":"Block"},"required":true},
            "currentPage": {"dataType":"double","required":true},
            "totalPages": {"dataType":"double","required":true},
            "hasNextPage": {"dataType":"boolean","required":true},
            "nextPageHeight": {"dataType":"double"},
            "pageSize": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionInput": {
        "dataType": "refObject",
        "properties": {
            "coinbase": {"dataType":"string"},
            "txinwitness": {"dataType":"array","array":{"dataType":"string"}},
            "sequence": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScriptPubKey": {
        "dataType": "refObject",
        "properties": {
            "asm": {"dataType":"string","required":true},
            "desc": {"dataType":"string","required":true},
            "hex": {"dataType":"string","required":true},
            "address": {"dataType":"string"},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionOutput": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"double","required":true},
            "n": {"dataType":"double","required":true},
            "scriptPubKey": {"ref":"ScriptPubKey","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Transaction": {
        "dataType": "refObject",
        "properties": {
            "txid": {"dataType":"string","required":true},
            "hash": {"dataType":"string","required":true},
            "version": {"dataType":"double","required":true},
            "size": {"dataType":"double","required":true},
            "vsize": {"dataType":"double","required":true},
            "weight": {"dataType":"double","required":true},
            "locktime": {"dataType":"double","required":true},
            "vin": {"dataType":"array","array":{"dataType":"refObject","ref":"TransactionInput"},"required":true},
            "vout": {"dataType":"array","array":{"dataType":"refObject","ref":"TransactionOutput"},"required":true},
            "hex": {"dataType":"string","required":true},
            "blockhash": {"dataType":"string","required":true},
            "confirmations": {"dataType":"double","required":true},
            "time": {"dataType":"double","required":true},
            "blocktime": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "username": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAndCredentials": {
        "dataType": "refObject",
        "properties": {
            "user": {"ref":"User","required":true},
            "token": {"dataType":"string","required":true},
            "refresh": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserCreationParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "username": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RefreshParams": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "refreshToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsBitcoinController_getBlockchainInfo: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/v1/btc/info',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BitcoinController)),
            ...(fetchMiddlewares<RequestHandler>(BitcoinController.prototype.getBlockchainInfo)),

            async function BitcoinController_getBlockchainInfo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBitcoinController_getBlockchainInfo, request, response });

                const controller = new BitcoinController();

              await templateService.apiHandler({
                methodName: 'getBlockchainInfo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBitcoinController_getBlockByHash: Record<string, TsoaRoute.ParameterSchema> = {
                hash: {"in":"path","name":"hash","required":true,"dataType":"string"},
        };
        app.get('/api/v1/btc/block/:hash',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BitcoinController)),
            ...(fetchMiddlewares<RequestHandler>(BitcoinController.prototype.getBlockByHash)),

            async function BitcoinController_getBlockByHash(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBitcoinController_getBlockByHash, request, response });

                const controller = new BitcoinController();

              await templateService.apiHandler({
                methodName: 'getBlockByHash',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBitcoinController_getBlocks: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                startHeight: {"in":"query","name":"startHeight","dataType":"double"},
        };
        app.get('/api/v1/btc/blocks',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BitcoinController)),
            ...(fetchMiddlewares<RequestHandler>(BitcoinController.prototype.getBlocks)),

            async function BitcoinController_getBlocks(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBitcoinController_getBlocks, request, response });

                const controller = new BitcoinController();

              await templateService.apiHandler({
                methodName: 'getBlocks',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBitcoinController_getTransaction: Record<string, TsoaRoute.ParameterSchema> = {
                txid: {"in":"path","name":"txid","required":true,"dataType":"string"},
        };
        app.get('/api/v1/btc/tx/:txid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BitcoinController)),
            ...(fetchMiddlewares<RequestHandler>(BitcoinController.prototype.getTransaction)),

            async function BitcoinController_getTransaction(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBitcoinController_getTransaction, request, response });

                const controller = new BitcoinController();

              await templateService.apiHandler({
                methodName: 'getTransaction',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserCreationParams"},
        };
        app.post('/api/v1/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_refresh: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RefreshParams"},
        };
        app.post('/api/v1/auth/refresh',
            authenticateMiddleware([{"jwt_without_verification":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.refresh)),

            async function AuthController_refresh(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_refresh, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'refresh',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_dummy: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.post('/api/v1/auth/dummy',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.dummy)),

            async function AuthController_dummy(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_dummy, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'dummy',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
