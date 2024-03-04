const router = require("express").Router();
const CartCollection = require("../../Models/Application/Cart");
const OrderCollection = require("../../Models/Application/Order");

// API for generating html page for invoice copy print

router.post("/getBillReport", async (req, res) => {
  try {
    const { startDate, endDate } = await req.body;

    console.log(startDate, endDate);

    // For filter order id between matched dates

    const matchCriteria = {
      orderDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    //Aggregation pipeline

    const pipeline = [
      {
        $match: matchCriteria,
      },
    ];

    //Aggregate operation

    const result = await OrderCollection.aggregate(pipeline);

    // console.log("result", result);

    // For Fetching cart details using order Id

    let OrderCartItems = [];

    for (i = 0; i < result.length; i++) {
      const items = await CartCollection.find({ OrderId: result[i]._id });

      // console.log("items", items);

      for (j = 0; j < items.length; j++) {
        // console.log(items[j]);
        OrderCartItems.push(items[j]);
      }
    }

      let resultArray = [];

      for (k = 0; k < result.length; k++){
        //   console.log(result[0]);
          for (l = 0; l < OrderCartItems.length; l++){
              if (result[k]._id == OrderCartItems[l].OrderId) {
                   const newOne = {
                      ...OrderCartItems[l],
                      OrderDate: result[k].orderDate,
                      OrderPrice:result[k].totalPrice
                  }
                  console.log("newOne", newOne);
                  resultArray.push(newOne);
              }
          }
      }


    //  console.log("resultArray", resultArray);

      if (result.length > 0 && OrderCartItems.length > 0 && resultArray.length >0) {
          res.status(200).json({
              success: true,
              message: "Billing report fetched successfully",
              OrderDetails: resultArray,
             
         })
      } else {
          res.status(200).json({
           success:false,
           message:"No data available"
       })
      }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

module.exports = router;
