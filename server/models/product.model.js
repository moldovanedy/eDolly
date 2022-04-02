// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 3,
//     },
//     price: {
//         type: Number,
//         required: true,
//         default: 0,
//     },
//     stock: { type: Number, required: true, default: 0 },
//     priceBeforeDiscount: { type: Number },
//     category: {
//         type: String,
//         required: true,
//     },
//     multimedia: [
//         {
//             type: String,
//             //required: true,
//             minlength: 1,
//             /* se stocheaza in baza de date caile catre fisiere (imagini, videoclipuri sau obiecte 3D) */
//         },
//     ],
//     description: {
//         type: String,
//         required: true,
//         minLength: 20,
//         /* se scrie textul, iar pentru imagini și videoclipuri se pune [img: caleFișier] sau [video: caleFișier] */
//     },
//     specifications: {
//         type: String,
//         required: true,
//         /*
//         se va afișa sub formă de tabel, dar în baza de date va fi stocat sub forma:
//         caracteristică.valoare;caracteristică.valoare1,valoare2,valoare3 [...]
//         */
//     },
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;
