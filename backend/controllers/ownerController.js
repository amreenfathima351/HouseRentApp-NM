const bookingSchema = require("../schemas/bookingModel");
const propertySchema = require("../schemas/propertyModel");
const userSchema = require("../schemas/userModel");

const addPropertyController = async (req, res) => {
  try {
    let images = [];
    if (req.files) {
      images = req.files.map((file) => ({
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      }));
    }

    const user = await userSchema.findById(req.body.userId);

    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }

    const newPropertyData = new propertySchema({
      ...req.body,
      propertyImage: images,
      ownerId: user._id,
      ownerName: user.name,
      isAvailable: "Available",
    });

    await newPropertyData.save();
    return sendSuccessResponse(res, "New Property has been stored");
  } catch (error) {
    console.error("Error in addPropertyController:", error);
    return sendErrorResponse(res, "Failed to add property");
  }
};

const getAllOwnerPropertiesController = async (req, res) => {
  const { userId } = req.body;
  try {
    const getAllProperties = await propertySchema.find();
    const updatedProperties = getAllProperties.filter(
      (property) => property.ownerId.toString() === userId
    );
    return sendSuccessResponse(res, "Owner's properties", updatedProperties);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

const deletePropertyController = async (req, res) => {
  const propertyId = req.params.propertyid;
  try {
    const property = await propertySchema.findByIdAndDelete(propertyId);

    if (!property) {
      return sendErrorResponse(res, "Property not found", 404);
    }

    return sendSuccessResponse(res, "The property is deleted");
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, "Failed to delete property", 500);
  }
};

const updatePropertyController = async (req, res) => {
  const { propertyid } = req.params;
  try {
    const property = await propertySchema.findByIdAndUpdate(
      propertyid,
      {
        ...req.body,
        ownerId: req.body.userId,
      },
      { new: true }
    );

    if (!property) {
      return sendErrorResponse(res, "Property not found", 404);
    }

    return sendSuccessResponse(res, "Property updated successfully.");
  } catch (error) {
    console.error("Error updating property:", error);
    return sendErrorResponse(res, "Failed to update property", 500);
  }
};

const getAllBookingsController = async (req, res) => {
  const { userId } = req.body;
  try {
    const getAllBookings = await bookingSchema.find();
    const updatedBookings = getAllBookings.filter(
      (booking) => booking.ownerID.toString() === userId
    );
    return sendSuccessResponse(res, "All bookings", updatedBookings);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

const handleAllBookingstatusController = async (req, res) => {
  const { bookingId, propertyId, status } = req.body;
  try {
    const booking = await bookingSchema.findByIdAndUpdate(
      bookingId,
      {
        bookingStatus: status,
      },
      { new: true }
    );

    const property = await propertySchema.findByIdAndUpdate(
      propertyId,
      {
        isAvailable: status === "booked" ? "Unavailable" : "Available",
      },
      { new: true }
    );

    if (!booking || !property) {
      return sendErrorResponse(res, "Booking or Property not found", 404);
    }

    return sendSuccessResponse(
      res,
      `Changed the status of property to ${status}`
    );
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

module.exports = {
  addPropertyController,
  getAllOwnerPropertiesController,
  deletePropertyController,
  updatePropertyController,
  getAllBookingsController,
  handleAllBookingstatusController,
};
