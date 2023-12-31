
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const mongourl = 'mongodb+srv://sdauser:sdauser@sdadatabase.z44y6.mongodb.net/productdata?retryWrites=true&w=majority'
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Is Open")
    })
    .catch((err) => {
        console.log(err);
    })

app.use(cors());
app.use(bodyParser.json({ limit: '16mb' }));
const ProductData = require("./Datamodel");
app.use(express.json());

app.listen(9000, () => {
    console.log('Server is running on port 3000');
});

app.post('/api/products', async (req, res) => {
    const { productName, categoryName, description, image } = req.body.obj;
    console.log(req.body);
    const pr = await ProductData.create({
        productName,
        categoryName,
        description,
        image,
    });

    if (!pr) {
        return res.status(500).json({
            message: "error creating user"
        })
    }
    return res.status(201).json({
        success: true,
        message: "Course Created Successfully !",
        data: pr
    })
});

app.get('/api/category', async (req, res) => {
    // const { catname } = req.params
    // console.log(catname)
    console.log("Hello")
    const pr = await ProductData.find({}).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    });
    console.log("Correct")
    console.log(pr);
    res.json(pr);
})

app.get('/test', (req, res) => {
    res.send('hello');
})

app.get('/', async (req, res) => {
    res.status(200).json({
        message: "successfully Running"
    })
})