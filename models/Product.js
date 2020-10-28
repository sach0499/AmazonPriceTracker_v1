const mongoose = require('mongoose');


const productSchema = mongoose.Schema({

    title: String,
    ASIN: String,
    locale: String,
    amazonLink: String,
    availibility: String,
    prices:[

        {
            maxPrice : {

                maxPriceVal: String,
                maxPriceDate: Date

            },

            minPrice: {

                minPriceVal: String,
                minPriceDate: Date

            },

            price: [

                {
                    priceVal: String,
                    priceDate: Date
                }
            ]
        }
    ]

})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;