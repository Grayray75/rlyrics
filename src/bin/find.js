const getDetails = require("./scrape");

const find = async (query) => {
    /**
     * @param {String} query - A https://www.musixmatch.com/lyric/* link or search query
     * @returns {Promise<?String>} A Song's lyrics
    */
    if (!query) throw new Error("Query is required");
    if (typeof query !== "string") throw new Error("Query must be a String!");
    const result = await getDetails(query);

    return result ? result.lyrics : null;
};

module.exports = find;
