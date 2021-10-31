const axios = require("axios");
const baseUrl = "https://www.musixmatch.com";
const lyricsURL = "https://www.musixmatch.com/lyrics";
const cheerio = require("cheerio");
const search = require("./search");

const getDetails = async (query) => {
    let url;
    if (query.startsWith(lyricsURL)) {
        url = query;
    } else {
        const result = await search(query);
        if (!result.length) return null;
        const href = result[0].href;
        url = baseUrl + href;
    }
    const bestResult = await axios.get(encodeURI(url)).catch((e) => {
        throw new Error("Error while requesting data");
    });
    if (!bestResult) return null;

    const $ = cheerio.load(bestResult.data);
    const lyrics = $(".lyrics__content__ok").length
        ? $(".lyrics__content__ok")
              .toArray()
              .map((x) => {
                  return $(x).text();
              })
              .join("\n")
        : $(".lyrics__content__error")
              .toArray()
              .map((x) => {
                  return $(x).text();
              })
              .join("\n");

    const icon = $(".banner-album-image-desktop > img").length
        ? "https:" + $(".banner-album-image-desktop > img").attr("src")
        : null;

    const name = $(".mxm-track-title__track").length
        ? $(".mxm-track-title__track").children().remove().end().text()
        : null;

    const artist = $(".mxm-track-title > h2 > span > span").length
        ? $(".mxm-track-title > h2 > span > span")
              .toArray()
              .map((x) => {
                  return {
                      name: $(x).children().text(),
                      url: baseUrl + $(x).children().attr("href"),
                  };
              })
        : $(".mxm-track-title > h2 > span").length
        ? $(".mxm-track-title > h2 > span")
              .toArray()
              .map((x) => {
                  return {
                      name: $(x).children().text(),
                      url: baseUrl + $(x).children().attr("href"),
                  };
              })
        : null;

    return { name, artist, icon, lyrics };
};

module.exports = getDetails;
