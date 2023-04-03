const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./.env" });

// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use(cors({
//   origin:[`http://localhost:5173`,`http://localhost:3000`],
//   credentials:true}));

mongoose.connect(process.env.DBURL).then(()=>{
    app.listen(8080, (req, resp) => {
        console.log("server is up and running");
      });
}).catch(err=>console.log(err))

