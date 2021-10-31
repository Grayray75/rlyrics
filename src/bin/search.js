const axios = require("axios");
const baseUrl = "https://www.musixmatch.com/search/";
const cheerio = require("cheerio");

const search = async (query) => {
    if (!query) throw new Error("Query is required.");
    if (typeof query !== "string") throw new Error("Query must be a String!");
    const url = baseUrl + query.replace("/ +/g", "%20");
    const result = await axios.get(encodeURI(url)).catch((e) => {
        throw new Error("Error while requesting data");
    });

    const $ = cheerio.load(result.data);
    const titlesHtml = $(".title");
    const artistsHtml = $(".artist");
    const iconHtml = $(".media-card-picture > img");

    const titles = titlesHtml.toArray().map((x) => {
        return $(x).text();
    });
    titles.shift();
    const artists = artistsHtml.toArray().map((x) => {
        return $(x).text();
    });
    artists.shift();
    const hrefs = titlesHtml.toArray().map((x) => {
        return $(x).attr("href");
    });
    hrefs.shift();
    const icons = iconHtml.toArray().map((x) => {
        return $(x)
            .attr("srcset")
            ?.split(", ")
            .map((e) => e.split(" ")[0]);
    });
    icons.shift();

    return require("../util/concat")({
        titles,
        artists,
        hrefs,
        icons,
    });
};

module.exports = search;
