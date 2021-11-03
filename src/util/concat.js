const concat = ({ titles, artists, hrefs, icons }) => {
    /**
     * @private
     * @param {Array} titles
     * @param {Array} artists
     * @param {Array} hrefs
     * @param {Array} icons
     * @returns {Array} Songs' title, artist, href url, icon
    */
    const newData = [];
    for (let i = 0; i < titles.length; i++) {
        newData.push({
            name: titles[i],
            artist: artists[i],
            href: hrefs[i],
            icon: icons[i],
        });
    }
    return newData;
};

module.exports = concat;
