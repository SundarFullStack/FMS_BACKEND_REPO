const router = require("express").Router();
const CartCollection = require("../../Models/Application/Cart");
const OrderCollection = require("../../Models/Application/Order");
const ProductCollection = require("../../Models/Application/Product");

//API for send product Name details from product table (collection)

router.post("/prodInsert", async (req, res) => {
  try {
    const { itemName, itemType } = await req.body;

    const saveProduct = new ProductCollection({
      itemName: itemName,
      itemType: itemType,
    });

    const savedProduct = await saveProduct.save();

    if (savedProduct) {
      res.status(200).json({
        success: true,
        message: "Product Saved Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error in saving product",
      });
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

// API for send all products in product collection

router.get("/getProduct", async (req, res) => {
  try {
    const itemNames = await ProductCollection.find();

    // console.log(itemNames);
    if (itemNames) {
      res.status(200).json({
        success: true,
        data: itemNames,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error in fetching data",
      });
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

// API for inserting all cart details in cart table

router.post("/cartInsert", async (req, res) => {
 try{
    const { productName, productPrice, productQuantity } = await req.body;

    //   console.log(productName, productPrice, productQuantity);
    
        const multiPrice = await productPrice * productQuantity;
    
        const saveCartItem = new CartCollection({
            productName: productName,
            productPrice: productPrice,
            productQuantity: productQuantity,
            multiPrice:multiPrice
        })
    
        const savedCartItem = await saveCartItem.save();
    
        if (savedCartItem) {
            res.status(200).json({
                success: true,
                message: "Item Added to cart Successfully",
                data:savedCartItem
            })
        } else {
            res.status(400).json({
                success: false,
                message:"Error in saving cart items"
            })
        }
 } catch (error) {
     console.log("Error Occurred:",error);
 }
});


// API for send all cart details

router.get("/getCartDetails", async (req, res) => {
    try {

        const cartDetails = await CartCollection.find({ status: "N" });

        if (cartDetails) {
            res.status(200).json({
                success: true,
                message: "Cart Details Fetched Successfully",
                data:cartDetails
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Error in fetching cart details",
            })
        }
        
    } catch (error) {
        console.log("Error Occurred:",error)
    }
})

// API for deleting cart items

router.post("/deleteCartItem", async (req, res) => {

    try{
        const {id} = req.body;
        console.log(id);
    
        const deletedItem = await CartCollection.deleteOne({_id:id});
    
        if (deletedItem) {
            
            res.status(200).json({
                success: true,
                message: "Cart Item deleted successfully",
                data:deletedItem
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Can't able to delete cart Item"
            })
        }
    } catch (error) {
        console.log("Error Occurred:",error);
    }
})

// API for save order details and update order id against its products in cart details

router.post("/genBillCopy", async (req, res) => {
  try {
    const { totalPrice} = await req.body;

    // console.log(totalPrice)

    const saveOrderDetail = new OrderCollection({
      totalPrice: totalPrice
    });

    const savedOrderDetail = await saveOrderDetail.save();

    const updateCDOrderID = await CartCollection.updateMany(
      { status: "N" },
      { $set: { OrderId: savedOrderDetail._id } },
    );
    const updateCDStatus = await CartCollection.updateMany(
      { status: "N" },
      { $set: { status: "Y"} },
    );

    console.log(updateCDOrderID,updateCDStatus)

    if (updateCDOrderID) {
      res.status(200).json({
        success: true,
        message: "Order Details saved successfully",
        data: savedOrderDetail,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error in creating order detail",
      });
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});


// API for deleting all cart items

router.post("/deleteAllCartItem", async (req, res) => {
  
  try {
    const deletedAll = await OrderCollection.deleteMany();

  if (deletedAll) {
    res.status(200).json({
      success: true,
      message: "All cart items deleted"
    })
  }
  else {
    res.status(400).json({
      success: true,
      message: "Error in deleting cart items"
    })
  }
  } catch (error) {
    console.log("Error Occurred:", error);
 }
})


module.exports = router;
