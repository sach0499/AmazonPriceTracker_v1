const router = require('express').Router();
const User = require('../models/user');
const Product = require('./../models/Product')

const {getASINFromURL, getLocaleFromURL, getProductInfoFromAmazonLink} = require('./../utilities/scraper')


// Amazon Link - http://www.amazon.in/productName/dp/d5996995040/...
// ASIN = d5996995040
// Locale = IN



router.post('/add',async (req,res)=> {


      try {

        // 1. Get amazon link, email, and min-price from the req body
        const amazonLink = req.body.amazonLink;
        const email = req.body.email;
        const minPrice = req.body.minPrice;


        // 2. Verify the link by getting locale and ASIN
        const ASIN = getASINFromURL(amazonLink);
        const locale = getLocaleFromURL(amazonLink);


        if(!(ASIN && locale))
            throw new Error('Amazon Link is wrong.')

       // console.log(3.5)

        // 3. Check if product is in DB
        let product = await Product.findOne({ASIN: ASIN});

        console.log(3, product)

        // 4. if product does not exist then create it
        if(!product){

            const productInfo = await getProductInfoFromAmazonLink(amazonLink);

            console.log(4)

            product = await Product.create(productInfo);

        }


        // 5. Mark the product in the user document
        if(product){

            const user = await User.findOne({email: email});

            console.log("product", product);
            console.log("user", user)

            user.trackedProducts.push({

                  productId: product._id,
                  addedOn: Date.now(),
                  trackedPrice: minPrice

            })

            await user.save();
        }


        // 6. send the response

        res.status(201).json({

            status: 'success',
            message: 'Product-Tracked',
            product: product

        })
            


      }
      catch(err){


        res.status(400).json({

            status: 'failure',
            message: err.message

        })


      }






})


// router.post('/add',(req,res)=> {


//     res.json({

//         message: 'Success'
//     })
// } )


module.exports = router;