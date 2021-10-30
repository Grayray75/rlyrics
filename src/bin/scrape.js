const axios = require("axios");
const baseUrl = "https://www.musixmatch.com";
const cheerio = require("cheerio");
const search = require("./search");

const scrape = async (query) => {
    if (!query) throw new Error("Query is required");
    if (typeof query !== "string") throw new ErFror("Query must be a String!");
    const result = await search(query);
    if (!result.length) return null;

    const bestResult = await axios.get(baseUrl + result[0].href).catch((e) => {
        throw new Error("Error while requesting data");
    });
    if (!bestResult) return null;

    const $ = cheerio.load(bestResult.data);
    const lyrics = $(".lyrics__content__ok")
        .toArray()
        .map((x) => {
            return $(x).text();
        })
        .join("\n");

    return lyrics;
};

module.exports = scrape;
