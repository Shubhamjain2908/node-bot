const dialogflow = require('dialogflow');
const config = require('../config/keys');
const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionId);

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({ 'hello': 'there' });
    });

    app.post('/api/df_text_query', async (req, res) => {

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };
        let responses = await sessionClient.detectIntent(request);
        res.send(responses[0].queryResult);
    });

    app.post('/api/df_event_query', (req, res) => {
        res.send({ 'do': 'event query' });
    });

}

// const { Storage } = require('@google-cloud/storage');
// const projectId = config.googleProjectId;
// const keyFilename = "react-node-agent-yxoklv-66b6c66b549b.json";

// const storage = new Storage({ projectId, keyFilename });
// const test = async () => {

//     try {
//         const credentials = await storage.getCredentials();
//         console.log('Credentials:', credentials);
//     } catch (err) {
//         console.error('ERROR:', err);
//     }
// }
// test();
