import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { createProductController, getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController, productFiltersController, productCountController, productListController, searchProductController } from "../controller/productController.js";

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
export default router;