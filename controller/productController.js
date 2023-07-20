import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
import SSLCommerzPayment from "sslcommerz-lts";
dotenv.config();

// payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANR_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};

// get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting product",
        });
    }
}

// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");;

        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting Single product",
        });
    }
}

// geting product 
export const productPhotoController = async (req, res) =>{
    try{
        const product = await productModel.findById(req.params.pid).select("photo");

        if(product.photo.data){
            res.set("Content-type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting Single photo",
        });
    }
}

// delete product
export const deleteProductController = async (req, res) => {
  try{
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");

    res.status(200).send({
        success: true,
        message: "Product Deleted successfully"
    })
  }catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        error,
        message: "Error in Deleting Single photo",
    });
}
}

//upate producta
export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req,res) =>{
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).select("-photo").skip((page-1) * perPage).limit(perPage).sort({createdAt: -1});

    res.status(200).send({
      success: true,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per Page",
      error,
    });
  }
}

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// GET product by category
export const productCategoryController = async (req, res) =>{
  try {
    const category = await categoryModel.findOne({slug: req.params.slug});
    const products = await productModel.find({category}).populate("category");

    res.status(200).send({
      success: true,
      category,
      products,
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting  product by category",
      error,
    });
  }
}
//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// baksh
export const baskPayment = async (req, res) =>{
  /** 
    * Create ssl session request 
    */
  const { cart, auth } = req.body;
  let total = 0;
  cart.map((i) => {
    total += i.price;
  });
  
  const order = new orderModel({
    products: cart,
    buyer: auth?.user,
  }).save();

  const data = {
    total_amount: total,
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
      return res.status(200).json({url: data?.GatewayPageURL});
    }
    else {
      return res.status(400).json({
        message: "Session was not successful"
      });
    }
  });


} 