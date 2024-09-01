const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const { populate } = require("../models/review.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const{storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing)
);


router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing)
);


//index route
// router.get("/", wrapAsync(listingController.index));
//new route

//show route
// router.get("/:id", wrapAsync(listingController.showListing));
//Create Route
// router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListing));
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));
//update route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));
//Delete route
// router.delete("/:id", isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


module.exports = router;