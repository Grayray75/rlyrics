# Lyrics Finder
A very very.. simple module made by roogue that allows you to scrape song lyrics from `https://www.musixmatch.com/`

## Installation

```bash
npm i git+https://github.com/roogue/lyrics-finder.git
```

## Basic Usage
Getting lyrics from the best search result.
```js
const { lyricsFinder } = require('lyrics-finder');

//With Async Function
(async () => {
    const query = "Alan Walker Alone";
    const lyrics = await lyricsFinder(query);
    console.log(lyrics); //returns null if no lyrics was found
}();

//Or with then()
lyricsFinder('Alan Walker Alone').then(console.log, console.error);
```

## Search Function
You can also use the search function to get an array of search results.
```js
const { search } = require('lyrics-finder');
search('Alan Walker Alone').then(console.log, console.error);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
