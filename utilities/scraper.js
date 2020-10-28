const fetch = require('node-fetch')
const cheerio = require('cheerio')

exports.getASINFromURL = (url) => {
    return url.split('/')[5];
}


exports.getLocaleFromURL = (url) => {
    return url.split('/')[2].split('.')[2].toUpperCase();
}

exports.getProductInfoFromAmazonLink = async (url) => {

    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);

    const product = {};

    product.title = $('#productTitle').text().replace(/(\r\n|\n|\r)/gm,"")
    product.ASIN = getASINFromURL(url)
    product.availibility = $('#availability').text().replace(/(\r\n|\n|\r)/gm,"")
    product.locale = getLocaleFromURL(url);
    product.prices = {};
    
    const price = $('span.priceBlockBuyingPriceString').text();
    const dateNow = Date.now();

    product.prices.maxPrice = {

            maxPriceVal: price,
            maxPriceDate: dateNow
    }


    product.prices.minPrice = {

        minPriceVal: price,
        minPriceDate: dateNow
    }

    product.prices.priceHistory = {

        priceVal: price,
        priceDate: dateNow
    }


    return product;


}