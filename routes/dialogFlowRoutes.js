const chatbot = require('../chatbot/chatbot');

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({ 'hello': 'there' });
    });

    app.post('/api/df_text_query', async (req, res) => {
        let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.post('/api/df_event_query', async (req, res) => {
        let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
        res.send(responses[0].queryResult);
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
