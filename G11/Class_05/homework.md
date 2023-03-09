# Online-shop application

## Requirements:

1. Init new project called, online_shop;
2. Install necessery dependencies ( express, uuid );
3. It is up to you to use commonjs or es6 modules syntax for importing and exporting;
4. Create a json file products.json;
5. The product should have the following properties: id (string), name(string), price(number), rating(string), description(string), category(string), isInStock(boolean);
6. Using the router from express, create the following routes for the CRUD (create/read/update/delete) operation:
   NOTE: Think for which routes you are going to use path params, and think of the API method you are going to use.
   - Get all products
   - Get product by id
   - Add new product
   - Edit a product by id
   - Remove a product by id
   - Remove all products from the products.json
   - Set product to be out of stock by id
7. Create a middleware that will log the endpoint requested to our server. EXAMPLE: `Request on the route /pruducts was mate at 10:22`

### BONUS:

- Instead of logging the message with the middleware (step 7), save that message in a file called logs.txt;
- Create one more json file called; cart.json
- Create route for add product (by id) to cart;
- The functionallity for adding to cart, should access the products.json, find the product with the coresponding id
  and it should add the product in the cart.json. If a product with such ID is not existing return 404 with the message: "Product does not exist"

## NOTE:

- The bonus is not mendatory, it is here as an additional challenge.
