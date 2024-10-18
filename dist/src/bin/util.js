"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = concat;
function concat(titles, artists, hrefs, icons) {
    return titles.map((title, i) => {
        return {
            name: title,
            artist: artists[i],
            href: hrefs[i],
            icon: icons[i],
        };
    });
}
