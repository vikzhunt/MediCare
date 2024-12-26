const express = require('express')
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded ({extended: false}))
const router = express.Router();

require("dotenv").config();

const dbConnect = require('./Configs/database');
dbConnect();
const PORT = process.env.PORT




// app.get('/payments/:paymentId', async(req, res)=>{
//     const paymentId = req.params.paymentId;


//     try{
//         const payment = await razorpay.payments.fetch(paymentId);

//         if(!payment)
//             return res.status(500).json("error getting payment record")

//         res.json({
//             staus: payment.status,
//             method:payment.method,
//             amount: payment.amount,
//             currency: payment.currency,
//             email: payment.email,
//             contact: payment.contact,
//         })
//     }

//     catch(e){
//         return res.status(500).json("failed to fetch payment record")
//     }
// })

// app.post('/verify-payment', (req, res) => {
//     const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const generated_signature = crypto
//       .createHmac('sha256', 'YOUR_KEY_SECRET')
//       .update(order_id + '|' + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature === razorpay_signature) {
//       res.send({ status: 'success', message: 'Payment verified successfully' });
//     } 

//     else {
//       res.status(400).send({ status: 'failure', message: 'Invalid signature' });
//     }
//   });


app.post('/orders', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const { amount, currency, receipt } = req.body;
        if (!amount || !currency || !receipt) {
            return res.status(400).json({ error: "Missing required fields: amount, currency, or receipt" });
        }

        const options = { amount, currency, receipt };
        const order = await razorpay.orders.create(options);

        if (!order)
            return res.status(500).send("error not getting options")

        res.json(order);
    }

    catch (e) {
        return res.status(500).json("Enterd catch block");
    }
})

const routeMount = require('./Routes/doctor')
app.use('/api/v1', routeMount)



app.get('/', (req, res) => {
    res.send("Backend started");
})

app.listen(PORT, () => {
    console.log(`Server instantiated on Port: ${PORT}`);
})

