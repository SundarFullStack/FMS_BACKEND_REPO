// const router = require("express").Router();
// const CartCollection = require("../../Models/Application/Cart");
// const OrderCollection = require("../../Models/Application/Order");



// // API for generating html page for invoice copy print

// router.post("/getBillReport", async (req, res) => {
//     try {
  
//       const { startDate,endDate } = await req.body;
  
//         // For filter order id between matched dates

//         const pipeline1 = [
//             {
//                 $match: {
//                     OrderDate: {
//                         $gte:new Date(startDate) ,
//                         $lte:new Date(endDate) 
//                     }
//                 }
//             }
//         ];

//         const matchedId = await OrderCollection.aggregate(pipeline1);

//         console.log("matchedId", matchedId);
        
//         // For Fetching cart details using order Id

//       const pipeline2 = [
      
//         {
//           $match: {
//           OrderId:matchedId
//         }
//       },
      
//         {
//           $lookup: {
//             from: "Order",
//             localField: "OrderId",
//             foreignField: "_id",
//             as:"Data"
//           }
//         }
//       ]
      
//       const orderDetails = await CartCollection.aggregate(pipeline2);
  
//       console.log("orderDetails",orderDetails);
  
//       const OrderTotalPrice = await OrderCollection.findOne({ _id: matchedId });
  
//       const totalPrice = OrderTotalPrice.totalPrice;
  
//       console.log("totalPrice",totalPrice);
  
//       if (orderDetails && totalPrice) {

//       }
     
//     } catch (error) {
//       console.log("Error Occurred:", error)
//     }
//   })

// module.exports = router;