const mongoose = require("mongoose");
const handleError = require("./handleError");

function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError({ res, message: "Invalid ObjectId ", status: 400 });
  }

  next();
}

module.exports = validateObjectId;
