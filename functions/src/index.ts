import * as corsPackage from 'cors';
import * as functions from 'firebase-functions';

const fetch = require('node-fetch');
const cheerio = require('cheerio');
// const cors = require('cors')({ origin: false });
const cors = corsPackage({
    origin: true
});

const scrapeMetatags = async (url: string) => {

    const res = await fetch(url);

    const html = await res.text();
    const $ = cheerio.load(html);

    const getMetatag = (name: string) =>
        $(`meta[name=${name}]`).attr('content') ||
        $(`meta[name="og:${name}"]`).attr('content') ||
        $(`meta[name="twitter:${name}"]`).attr('content');

    return {
        url: url,
        title: $('title').first().text(),
        description: getMetatag('description'),
        image: getMetatag('image'),
        author: getMetatag('author'),
    };
}

export const getRecipeMetaData = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const data = await scrapeMetatags(request.body.URL);
        response.send(data);
    });
});