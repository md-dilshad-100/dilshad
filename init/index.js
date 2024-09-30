const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
   .then(() => {
    console.log("connected to DB");
})
   .catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});                       //delete all previous saved DB
    initData.data = initData.data.map((obj) => ({...obj, owner : "66d8688728c87319fd3141fc"}));
    await Listing.insertMany(initData.data);            //save new DB from data.js
    console.log("Data was initialized");
};

initDB();                                              //call initDB function