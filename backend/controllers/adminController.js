const propertySchema = require("../schemas/propertyModel");
const userSchema = require("../schemas/userModel");
const bookingSchema = require("../schemas/bookingModel");

// Utility function for sending success response
const sendSuccessResponse = (res, message, data = null) => {
  return res.status(200).send({
    success: true,
    message: message,
    data: data,
  });
};

// Utility function for sending error response
const sendErrorResponse = (res, message, statusCode = 400) => {
  return res.status(statusCode).send({
    success: false,
    message: message,
  });
};

const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find({});
    if (!allUsers || allUsers.length === 0) {
      return sendErrorResponse(res, "No users found", 401);
    } else {
      return sendSuccessResponse(res, "All users", allUsers);
    }
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    return sendErrorResponse(res, "Failed to retrieve users");
  }
};

const handleStatusController = async (req, res) => {
  const { userid, status } = req.body;
  try {
    const user = await userSchema.findByIdAndUpdate(
      userid,
      { granted: status },
      { new: true }
    );

    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }

    return sendSuccessResponse(res, `User has been ${status}`);
  } catch (error) {
    console.error("Error in handleStatusController:", error);
    return sendErrorResponse(res, "Failed to update user status");
  }
};

const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await propertySchema.find({});
    if (!allProperties || allProperties.length === 0) {
      return sendErrorResponse(res, "No properties found", 401);
    } else {
      return sendSuccessResponse(res, "All properties", allProperties);
    }
  } catch (error) {
    console.error("Error in getAllPropertiesController:", error);
    return sendErrorResponse(res, "Failed to retrieve properties");
  }
};

const getAllBookingsController = async (req, res) => {
  try {
    const allBookings = await bookingSchema.find();
    return sendSuccessResponse(res, "All bookings", allBookings);
  } catch (error) {
    console.error("Error in getAllBookingsController:", error);
    return sendErrorResponse(res, "Failed to retrieve bookings");
  }
};

module.exports = {
  getAllUsersController,
  handleStatusController,
  getAllPropertiesController,
  getAllBookingsController,
};
