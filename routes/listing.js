const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");                           
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");  
const listingController = require("../controllers/listings.js");              
const multer = require('multer');                                             
const { storage } = require("../cloudConfig.js");                             
const upload = multer({ storage });                                           


//Router.route,,restructure below Index and create route
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));

//CREATE(new route) 
router.get("/new",isLoggedIn, listingController.renderNewForm);

//Router.route,,restructure below show,update and delete route,,
router.route("/:id")
.get( wrapAsync(listingController.showLIsting))
.put(isLoggedIn,isOwner, upload.single('listing[image]'),  validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing)); 


// Index Route (on browser--> localhost:8080/listings)
// router.get("/", wrapAsync(listingController.index));


// show route 
// router.get("/:id", wrapAsync(listingController.showLIsting));

//Create route
// router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//update Route
// router.put("/:id",isLoggedIn,isOwner,  validateListing, wrapAsync(listingController.updateListing));

//Delete Route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing)); 

module.exports = router;