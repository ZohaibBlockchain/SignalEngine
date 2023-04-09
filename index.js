import express from "express";
const app = express();
const port = 3000;
import bodyParser from "body-parser";
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to the signal Engine");
});


app.get("/getsignals", (req, res) => {
    let instrument = [];
    instrument.push(btc);
    // instrument.push(eth);
    // instrument.push(ltc);
    res.send(instrument);
});


let BTC_FLAGS = ['X', 'X', 'X', 'X', 'X'];
let ETH_FLAGS = ['X', 'X', 'X', 'X', 'X'];
let LTC_FLAGS = ['X', 'X', 'X', 'X', 'X'];
let btc = { symbol: "BTCUSDT", positionAmt: 0, leverageAmt: 1, flags: BTC_FLAGS };
let eth = { symbol: "ETHUSDT", positionAmt: 0, leverageAmt: 1, flags: ETH_FLAGS };
let ltc = { symbol: "LTCUSDT", positionAmt: 0, leverageAmt: 1, flags: LTC_FLAGS };


app.post("/recivesignal", (req, res) => {
    const data = req.body;
    if (data.symbol == "BTCUSDT") {
        btc.positionAmt = data.positionAmt;
        btc.leverageAmt = data.leverageAmt;
        btc.flags[data.flag] = data.side;
    }
    else if (data.symbol == "ETHUSDT") {
        eth.positionAmt = data.positionAmt;
        eth.leverageAmt = data.leverageAmt;
        eth.flags[data.flag] = data.side;
    }
    else if (data.symbol == "LTCUSDT") {
        ltc.positionAmt = data.positionAmt;
        ltc.leverageAmt = data.leverageAmt;
        ltc.flags[data.flag] = data.side;
    }
    console.log('BTC: ', btc, 'ETH: ', eth, 'LTC: ', ltc);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


process.on('uncaughtException', function (err) {
    console.log(err);
});


process.on('TypeError', function (err) {
    console.log(err);
});







// {"symbol": "ETHUSDT",
//   "side": "long",
//   "positionAmt": 10,
//   "leverageAmt": 10,
//   "flag":1
// }