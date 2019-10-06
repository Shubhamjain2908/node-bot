'use strict';
const dialogflow = require('dialogflow');
const structJSON = require('./structjson');
const config = require('../config/keys');

const projectId = config.googleProjectId;
const sessionId = config.dialogFlowSessionId;
const languageCode = config.dialogFlowSessionLanguageCode;

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const textQuery = async (text, parameters = {}) => {
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: languageCode,
            },
        },
        queryParams: {
            payload: {
                data: parameters
            }
        }
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await handleAction(responses);
    return responses;
}

const eventQuery = async (event, parameters = {}) => {
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: event,
                parameters: structJSON.jsonToStructProto(parameters),
                languageCode: languageCode,
            },
        }
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await handleAction(responses);
    return responses;
}

const handleAction = responses => responses;

module.exports = {
    textQuery,
    eventQuery
} 