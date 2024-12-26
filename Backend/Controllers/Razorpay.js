const Razorpay = require('razorpay');
const RazorpaySchema = require('../Models/RazorpaySchema')

require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        console.log('route and controller tkk aa rha');


        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
        };

        console.log("entering try block");

        const order = await razorpay.orders.create(options);
        console.log(order);

        res.json({
            orderId: order.id,
            // amount: order.amount,
            // currency: order.currency,
        });
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Error creating Razorpay order');
    }
}

module.exports = { createOrder }