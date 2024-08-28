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


//Handle POST requests for contacts search
app.post("/search", async(req, res) => {
  const searchTerm = req.body.search.toLowerCase();
  if (!searchTerm) {
    return res.send("<tr></tr>");
  }
  
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  const searchResults = users.filter( (user)=> {
    const name = user.name.toLowerCase();
    const email = user.email.toLowerCase();

    return name.includes(searchTerm) || email.includes(searchTerm);
  })

  //map method gets all users that have the search term included in the name and email address
  //displays results in rows (as strings)
  const searchResultHtml = searchResults
  .map((user) => `
  <tr>
  <td>${user.name}</td>
  <td>${user.email}</td>
  </tr>
  `).join("");

  res.send(searchResultHtml);
})
//Start the server on specified port number
//Console refers to terminal
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


