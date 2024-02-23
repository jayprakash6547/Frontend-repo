const stripe = require('stripe')('sk_test_51OEyihABUs0uvloe8Erh2KVEsgKk1HRchFITbExNIgj1ESoBFvoIINrEskieJnHY3JcjyFxhJ5t33rrkqRoDQw2Y00gSCg2L8g');


const { catchAsyncErros } = require("../middlewares/catchAsyncErrors");

const YOUR_DOMAIN = 'http://localhost:3000';


exports.checkOut = catchAsyncErros(async (req, res, next) => {

    const { orderSummary, orderType } = req.body;
    // console.log(orderSummary);
    // res.send(orderSummary);

    let line_items = [];

    if (orderType === "subscription") {
        line_items = orderSummary.items.map((elem) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: elem.name,

                    },
                    unit_amount: Math.round(100 * elem.price),
                },
                quantity: elem.noOfMonth,
            }
        });
    }
    else if (orderType === "service") {
        line_items = orderSummary.items.map((elem) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: elem.name,

                    },
                    unit_amount: Math.round(100 * elem.price),
                },
                quantity: elem.noOfMonth,
            }
        });
    }




    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [...line_items],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/payment/success`,
        cancel_url: `${YOUR_DOMAIN}/payment/failure`,
    });
    console.log(session.id);
    res.send({ id: session.id });

});


