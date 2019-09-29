const dialogflow = require('dialogflow');
const config = require('../config/keys');
const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionId);

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({ 'hello': 'there' });
    });

    app.post('/api/df_text_query', (req, res) => {

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
        sessionClient.detectIntent(request)
            .then(response => {
                console.log('Detected intent');
                const result = responses[0].queryResult;
                console.log(`  Query: ${result.queryText}`);
                console.log(`  Response: ${result.fulfillmentText}`);
                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`);
                } else {
                    console.log(`  No intent matched.`);
                }
            })
            .catch(err => {
                console.log('ERROR: ', err);
            })
        res.send({ 'do': 'text query' });
    });

    app.post('/api/df_event_query', (req, res) => {
        res.send({ 'do': 'event query' });
    });

}