//sk_test_51MaMceG2ruHzbukz31luvL464FsQ3abGuxQjzr8d0ow7YAsGgTkr6e6SDcQf1xX9UMvbc6QC1TzlBDgaWL3nhER600BlFLRjB8
//coffe: price_1MaOZAG2ruHzbukz3sTum98m
//sunglasses: price_1MaOczG2ruHzbukz4vYXVpvf
//camera : price_1MaOe9G2ruHzbukz35FUZWBx

const express = require('express');
let cors = require('cors');
const stripe = require('stripe')('sk_test_51MaMceG2ruHzbukz31luvL464FsQ3abGuxQjzr8d0ow7YAsGgTkr6e6SDcQf1xX9UMvbc6QC1TzlBDgaWL3nhER600BlFLRjB8');


const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//send a post request to stripe

app.post('/checkout',async( req , res ) => {
    /*
        req.body.items
        [
            {
                id: 1,
                quantity: 3
            }
        ]

        stripe wants 
        [
            {
                price: 1,
                quantity: 3
            }
        ]
    */
        console.log(req.body.items);
        const items = req.body.items;
        let lineItems =[];
        items.forEach((item) =>{
            lineItems.push({
                price: item.id,
                quantity: item.quantity
            })
        })


        //initialise our session with stripe
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        })


        //send this response to the frontend. see in navigationbar.js, we have captured this in then statement as response.url.
        res.send(JSON.stringify({
            url: session.url
        }));
});

app.listen(4000,() => console.log("Listening on port 4000"));