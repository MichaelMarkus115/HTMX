import express from "express";

//Initialize express and save to const to get access to express methods
const app = express();

//Parse URL encoded bodies(as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

//Host static files from public folder
app.use(express.static("public"));

//Parse JSON bodies(as sent by API clients)
//Requests sent and responses recieved in JSON format
app.use(express.json());

let currentPrice = 60;

app.get("/get-price", (req, res) => {
  currentPrice = currentPrice + Math.random() * 2 - 1;
  res.send(`$ ${currentPrice.toFixed(1)}`);
});

//Start the server on specified port number
//Console refers to terminal
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


