require("dotenv").config();

const cloudnary = require("cloudinary").v2;

console.log(cloudnary.config().cloud_name);
