import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { createProductController, getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController } from "../controller/productController.js";

const router = express.Router();

//routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
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
    updateProductController
  );
export default router;