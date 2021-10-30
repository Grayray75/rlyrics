const axios = require('axios')
const baseUrl = "https://www.musixmatch.com/search/"
const cheerio = require('cheerio')

const search = async (query) => {
    if (!query) throw new Error('Query is required')
    const url = baseUrl + query.replace('/ +/g', '%20')
    const result = await axios.get(url).catch(e => { throw new Error('Error while requesting data') })

    const $ = cheerio.load(result.data)
    const titlesHtml = $('.title')
    const artistsHtml = $('.artist')

    const titles = titlesHtml.toArray().map(x => { return $(x).text() })
    titles.shift()
    const artists = artistsHtml.toArray().map(x => { return $(x).text() })
    artists.shift()
    const hrefs = titlesHtml.toArray().map(x => { return $(x).attr('href') })
    hrefs.shift()
    
    return require('./util/concat')
        ({
            titles,
            artists,
            hrefs
        })
}

module.exports = search