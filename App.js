const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { Router } = require('express');
const router = Router();
const authController = require('./controllers/authController');
const itemController = require('./controllers/itemController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');

const auth = require('./middlewares/auth');


//--------------------------Database--------------------------------------
mongoose.connect("mongodb://localhost/auth_demo", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database connected successfully');
    })
    .catch((err) => console.log(`database error : ${err}`));



app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));

//-----------------------Registration&Login-----------------------------------------
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded(
    { extended: true }
))
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/register", (req, res) => {
    res.render("register");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post('/register', authController.signup);
app.post('/login', authController.login);
app.get('/user', auth, authController.get_user);

//------------------------Items----------------------------------------
// app.get("/items", (req, res) => {
//     res.render("additems");
// });

// app.get('/getitems',itemController.get_items);
// //admin
// app.post('/items',itemController.post_item);
// app.put('/items/:id',itemController.update_item);
// app.delete('/deleteitems/:id',itemController.delete_item);

//------------------------Cart----------------------------------------
// app.get("/cart/:id", (req, res) => {
//     res.render("addcartitem");
// });
// app.get('/cart/:id',cartController.get_cart_items);
// app.post('/cart/:id',cartController.add_cart_item);
// app.delete('/cart/:userId/:itemId',cartController.delete_item);
//------------------------Order----------------------------------------

// app.get('/order/:id',orderController.get_orders);
// app.post('/order/:id',orderController.checkout);

//----------------------------------------------------------------
app.listen(process.env.PORT || 3033, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started At Port 3033");
    }

});
//----------------------------------------------------------------
