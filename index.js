const express = require('express');
const axios = require('axios');
const port = process.env.PORT || 3000;

const app = express();

app.get("/", async (req, res) => {


    var home ={
        
    };

    var response = {
        "status": "online",
        "enter gst and get details" : "enter as param",
    };
    res.send(response);
});


// all news
app.get('/getInfo/:gst', async (req, res) => {

    var gst = req.params.gst;

    const url = "https://cleartax.in/f/compliance-report/"+gst+"/";

    var myResponse = {};

    axios.get(url).then((response) => {
        console.log(response.data)
        myResponse["gst"] = response.data?.taxpayerInfo?.gstin;
        myResponse["trademarkName"] = response.data?.taxpayerInfo?.tradeNam;
        myResponse["name"] = response.data?.taxpayerInfo?.lgnm;
        myResponse["type"] = response.data?.taxpayerInfo?.ctb;
        myResponse["status"] = response.data?.taxpayerInfo?.sts;


        res.json(myResponse);

    }).catch(function (error) {
        console.log(error);
        res.send({
            status: error.status,
            message: error.message,
        });
    });


});


app.listen(port, () => {
    console.log('running on port ' + port);
});
