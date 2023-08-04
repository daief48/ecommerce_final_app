import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { createProductController, getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController, baskPayment } from "../controller/productController.js";

const router = express.Router();

//routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController,
    searchProductController
);

// get product
router.get("/get-product", getProductController);

// single product
router.get("/get-product/:slug",getSingleProductController);

// get photo
router.get("/product-photo/:pid",productPhotoController);

// delete product
router.delete("/product/:pid", deleteProductController);
//routes
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController,
    searchProductController
  );

// filter product
router.post('/product-filters',productFiltersController);
// product count
router.get('/product-count',productCountController);
// product per page
router.get('/product-list/:page',productListController);

// search product
router.get('/search/:keyword',searchProductController);

// similar product
router.get('/related-product/:pid/:cid',realtedProductController);

router.get("/product-category/:slug",productCategoryController);
router.post("/braintree/payment",requireSignIn, brainTreePaymentController);
//payments routes
//token
router.get("/braintree/token", braintreeTokenController);
// bkash payment
router.post('/ssl-request',baskPayment);

router.post("/ssl-payment-notification", async (req, res) => {

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

router.post("/ssl-payment-success", async (req, res) => {

  /** 
  * If payment successful 
  */

  return res.send('Payment Successfull')
})

router.post("/ssl-payment-fail", async (req, res) => {

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

router.post("/ssl-payment-cancel", async (req, res) => {

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


export default router;