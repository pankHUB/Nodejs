const fs = require("fs");

const requestHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write(
      '<html><head><title>Hello</title></head><body><h1>Node JS Refresher</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body></html>'
    );
    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk); //data from stream
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); //buffer
      const message = parsedBody.split("=")[1]; //geting value required
      fs.writeFile("message.text", `${message}`, (error) => {
        res.statusCode = 302; //reverse to given url
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  // ctrl+c
  //process.exit();

  res.write(
    `<html><head>hello</head><body><h1>Hello NodeJs html reponse</h1></body></html>`
  );
};

module.exports = requestHandler;