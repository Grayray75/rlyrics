const getDetails = require("./scrape");

const find = async (query) => {
    if (!query) throw new Error("Query is required");
    if (typeof query !== "string") throw new Error("Query must be a String!");
    const result = await getDetails(query);

    return result ? result.lyrics : null;
};

module.exports = find;
