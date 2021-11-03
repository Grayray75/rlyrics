# Rlyrics

A very very.. simple module that allows you to scrape songs lyrics from `https://www.musixmatch.com/`

## Installation

```bash
npm i rlyrics
```

## Basic Usage

Getting lyrics from the best search result.

```js
const { find } = require("rlyrics");

//With Async Function
(async () => {
    const query = "Alan Walker Alone";
    const lyrics = await find(query);
    console.log(lyrics); //returns null if no lyrics was found
})();

//Or With Then()
find("Alan Walker Alone").then(console.log, console.error);
```

## Search Function

You can also use the search function to get an array of search results.

```js
const { search } = require("rlyrics");
search("Alan Walker Alone").then(console.log, console.error);
```

## Get Details Function

Get full details of a song.
```js
const { getDetails } = require("rlyrics");
getDetails("Alan Walker Alone").then(console.log, console.error);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
