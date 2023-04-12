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


app.get("/getSpecialSignal", (req, res) => {
    let instrument = [];
    instrument.push(specialBtc);
    res.send(instrument);
});



let BTC_FLAGS = ['long', 'short', 'short', 'short', 'short'];
let ETH_FLAGS = ['X', 'X', 'X', 'X', 'X'];
let LTC_FLAGS = ['X', 'X', 'X', 'X', 'X'];
let btc = { symbol: "BTCUSDT", positionAmt: 0, leverageAmt: 1, flags: BTC_FLAGS };
let eth = { symbol: "ETHUSDT", positionAmt: 0, leverageAmt: 1, flags: ETH_FLAGS };
let ltc = { symbol: "LTCUSDT", positionAmt: 0, leverageAmt: 1, flags: LTC_FLAGS };




let specialBtc = { symbol: "BTCUSDT", positionAmt: 0, leverageAmt: 1, flags: 'x' };

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

app.post("/specialsignal", (req, res) => {
    const data = req.body;
    if (data.symbol == "BTCUSDT") {
        specialBtc.positionAmt = data.positionAmt;
        specialBtc.leverageAmt = data.leverageAmt;
        specialBtc.flags = data.side;
    }
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

