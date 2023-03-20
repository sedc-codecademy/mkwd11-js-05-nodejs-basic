import express from "express";

const cookieRouter = express.Router();

//Returning simple cookie;

//localhost:3000/cart
cookieRouter.get("/cart", (req, res) => {
  // key value pairs
  /**
   * Generate cookie from the server
   *
   * first parameter is the key
   * second parameter is the value
   *
   * cookie will be saved in the users browser
   */
  res.cookie("name", "John Doe");
  res.cookie("cart", ["Banana", "Orange"]);

  res.send("<h1>Here you see the cart route</h1>");
});

cookieRouter.get("/read_cart", (req, res) => {
  const cookies = req.cookies; // read the cookies that came along with the request;

  console.log(cookies);

  res.send({ message: `Cookie` });
});

cookieRouter.get("/premium", (req, res) => {
  const cookies = req.cookies;
  console.log("COOKIES FROM PREMIUM ROUTE", cookies);

  const userMe = cookies.user_me;

  if(userMe !== undefined && userMe.loggedIn === true) {
    res.send('<h1>You may procceed you are logged in</h1>')
  }else {
    res.status(403).send("<h1>Please login to access this route.</h1>")
  }
 
});

cookieRouter.post("/login", (req, res) => {
    const body = req.body;

    const user = {
        username: "bob",
        password: "bob_123"
    };

    if(body.username === user.username && body.password === user.password){
        res.cookie("user_me", { loggedIn: true, permission: "admin" });
        res.send({message: "Logged in successffuly."})
    }else {
        res.status(403).send({message: "Wrong user name or password"})
    }

});

cookieRouter.post('/logout' , (req,res) => {
    res.clearCookie("user_me");

    res.send({message:"Logout success."})
});
export default cookieRouter;
