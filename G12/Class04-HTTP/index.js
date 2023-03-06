import * as http from "node:http";

console.log(http);

// Creating the server listener function
const server = http.createServer((request, response) => {
  //   console.log(request);

  //   Importhing things we need from request object
  //   console.log("Important properties of request");
  //   console.log(request.method, request.url, request.headers, request.statusCode);

  const method = request.method;
  const url = request.url;

  if (url === "/") {
    // Simple response
    response.setHeader("Content-Type", "text/html");
    response.write("<h1>Welcome to the first server</h1>");
    return response.end();
  }

  if (url === "/something") {
    response.setHeader("Content-Type", "text/html");
    response.write("<h1>You are on the /something page</h1>");
    return response.end();
  }

  if (url === "/error") {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html");
    response.write("<h1>Page doesn't exist.ERROR 404!");
    return response.end();
  }

  if (url === "/user") {
    response.setHeader("Content-Type", "application/json");
    const user = {
      firstName: "John",
      lastName: "Doe",
    };
    response.write(JSON.stringify(user));
    return response.end();
  }

  if (url == "/add-movie") {
    response.setHeader("Content-Type", "text/html");
    response.write(`
    <form action="/movies" method="POST" >
    <input type="text" name="movieName" />
    <button>SUBMIT!</button>
    </form>
    `);
    return response.end();
  }

  if (url === "/movies" && method === "POST") {
    response.setHeader("Content-Type", "text/html");
    response.write("<h1>We are at /movies route</h1>");

    const chunksReceived = [];

    request.on("data", chunk => {
      console.log(chunk);
      chunksReceived.push(chunk);
    });

    request.on("end", () => {
      const parsedData = Buffer.concat(chunksReceived).toString();

      const data = parsedData.split("=");
      const movieName = data[1].split("+").join(" ");

      console.log("The movie is: ", movieName);
      // console.log(parsedData);
    });

    return response.end();
  }

  return response.end();
});

// Starting the server on the designated port
server.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
