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

//Handle POST request for email validation
app.post("/email", (req, res) => {
  const submittedEmail = req.body.email;
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(submittedEmail)) {
    return res.send(`
    <div 
        class="mb-3"
        hx-target="this"
        hx-swap="outerHTML"
        >
          <label class="form-label">Email Address</label>
          <input 
          type="email" 
          class="form-control"
          name="email"
          hx-post="/email"
          value= "${submittedEmail}"
          >
          <div class="alert alert-success" role="alert">Valid Email! Welcome back!</div>
        </div>`);
  } else {
    return res.send(`
    <div 
        class="mb-3"
        hx-target="this"
        hx-swap="outerHTML"
        >
          <label class="form-label">Email Address</label>
          <input 
          type="email" 
          class="form-control"
          name="email"
          hx-post="/email"
          value= "${submittedEmail}"         
          >
          <div class="alert alert-danger" role="alert">Invalid Email! Please enter a valid email address</div>
        </div>   
    `);
  }
});

//Start the server on specified port number
//Console refers to terminal
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
