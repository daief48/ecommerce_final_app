import express from "express"
import colors from "colors";
import SSLCommerzPayment from "sslcommerz-lts";
import bodyParser from "body-parser";
import dotenv  from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

//configure env
dotenv.config();

// database env
connectDB();

// rest object
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// middelware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/",(req,res) =>{
    res.send("Hi")
})


  
  app.get('/ssl-request',  (req, res) => {
  
    /** 
    * Create ssl session request 
    */
  
    const data = {
      total_amount: 100,
      currency: 'BDT',
      tran_id: 'REF123',
      success_url: `${process.env.ROOT}/ssl-payment-success`,
      fail_url: `${process.env.ROOT}/ssl-payment-fail`,
      cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
      shipping_method: 'No',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Daief',
      cus_email: 'daiefsikder4500@gmail.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01924529986',
      cus_fax: '01711111111',
      multi_card_name: 'mastercard',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D',
      ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
    };
  
    const sslcommerz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) //true for live default false for sandbox
    sslcommerz.init(data).then(data => {
  
      //process the response that got from sslcommerz 
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters
  
      if (data?.GatewayPageURL) {
        return res.status(200).redirect(data?.GatewayPageURL);
      }
      else {
        return res.status(400).json({
          message: "Session was not successful"
        });
      }
    });
  
  });

  app.post("/ssl-payment-notification", async (req, res) => {

    /** 
    * If payment notification
    */
  
    return res.status(200).json(
      {
        data: req.body,
        message: 'Payment notification'
      }
    );
  })
  
  app.post("/ssl-payment-success", async (req, res) => {
  
    /** 
    * If payment successful 
    */
  
    return res.status(200).json(
      {
        data: req.body,
        message: 'Payment success'
      }
    );
  })
  
  app.post("/ssl-payment-fail", async (req, res) => {
  
    /** 
    * If payment failed 
    */
  
    return res.status(200).json(
      {
        data: req.body,
        message: 'Payment failed'
      }
    );
  })
  
  app.post("/ssl-payment-cancel", async (req, res) => {
  
    /** 
    * If payment cancelled 
    */
  
    return res.status(200).json(
      {
        data: req.body,
        message: 'Payment cancelled'
      }
    );
  })
  
// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () =>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})