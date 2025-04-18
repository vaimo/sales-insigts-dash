/*
 * <license header>
 */

/**
 * This is a sample action showcasing how to query API MESH
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */

const { GraphQLClient, gql } = require('graphql-request');
const { Core } = require('@adobe/aio-sdk');
const {
  errorResponse,
  getBearerToken,
  stringParameters,
  checkMissingRequestInputs,
} = require('../utils');

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action');

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params));

    // check for missing request input parameters and headers
    const requiredParams = ['MESH_ID'];
    const requiredHeaders = ['Authorization'];
    const errorMessage = checkMissingRequestInputs(
      params,
      requiredParams,
      requiredHeaders
    );
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger);
    }

    // extract the user Bearer token from the Authorization header
    const token = getBearerToken(params);

    const apiMeshEndpoint = `https://www.graph.adobe.io/api/${params.MESH_ID}/graphql`;
    const query = gql`
      {
        storeConfig {
          store_name
        }
      }
    `;
    // query content from API MESH
    const client = new GraphQLClient(apiMeshEndpoint);
    const data = await client.request(query);
    // perform some business logic
    data.storeConfig.store_name =
      '[App Builder]: ' + data.storeConfig.store_name;
    const response = {
      statusCode: 200,
      body: data,
    };

    // log the response status code
    logger.info(`${response.statusCode}: successful request`);
    return response;
  } catch (error) {
    // log any server errors
    logger.error(error);
    // return with 500
    return errorResponse(500, 'server error', logger);
  }
}

exports.main = main;
