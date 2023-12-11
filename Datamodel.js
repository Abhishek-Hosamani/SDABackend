const mongoose = require('mongoose')

const ProductDataSchema = new mongoose.Schema(
    {
        productName: String,
        categoryName: String,
        description: String,
        image: String
    },
)

const ProductData = mongoose.model('ProductData', ProductDataSchema)
module.exports = ProductData