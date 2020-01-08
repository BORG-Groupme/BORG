import {getData} from "./utils";
import {receiver} from "./receiver";

let express = require("express");
let bodyParser = require("body-parser");
export const app = express();
app.use(bodyParser.json());

getData((data) => {
	for(let i in data.clients) {
		receiver(data.clients[i].token);
	}
}, "data");

app.listen(3000);
