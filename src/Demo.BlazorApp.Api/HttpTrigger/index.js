const axios = require('axios');

module.exports = async function (context, req) {
    let baseUri = process.env.FUNCTIONAPP_BASE_URI;
    let endpoint = process.env.FUNCTIONAPP_ENDPOINT
    let authKey = process.env.FUNCTIONAPP_AUTH_KEY;
    let count = req.query.count;
    let requestUri = baseUri + endpoint + '?count=' + count + '&code=' + authKey;

    let response = await axios.get(requestUri);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response.data
    };
}