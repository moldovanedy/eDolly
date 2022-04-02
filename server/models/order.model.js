// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const orderSchema = new Schema({
//     products: {[
//     {
//         name: String,
//         price: Number,
//         quantity: Number
//     }]},
//     delivery: {
//         method: { type: String }, //curier sau easybox
//         courier: { type: String }, //FanCourier, Cargus sau GLS
//         payment: { type: String } //cash sau card
//     },
//     totalPrice: { type: String },
//     adress: {
//         type: mongoose.Mixed,
//         county: {
//             type: String,
//             required: true
//         },
//         city: {
//             type: String,
//             required: true
//         },
//         exactAdress: {
//             type: String,
//             required: true
//             /* adresa se stochează astfel: STR=strada,NR=nrBlocSauCasa,SC=scara */
//         }
//     }
// });

// const Order = mongoose.model("Order", orderSchema);

// module.exports = Order;
