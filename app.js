var express = require('express');
const Razorpay = require('razorpay');
var app = express();
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

var instance = new Razorpay({
  key_id: 'rzp_test_s80zzTHF2x596N',
  key_secret: 'loXlv6Uo1mpUWxS5tumu32h1',
});
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/order', async function (req, res) {
  var options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    payment_capture: '1',
    receipt: uuidv4(),
  };
  await instance.orders.create(options, function (err, order) {
    res.send(order);
  });
});

app.get('/:id', async function (req, res) {
  try {
    const result = await instance.orders.fetch(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port 4000`);
});
