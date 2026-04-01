require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//  CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.log(" Error:", err));

//  SCHEMA
const shipmentSchema = new mongoose.Schema({
  trackingID: String,
  sender: String,
  receiver: String,
  address: String,
  weight: Number,
  status: {
    type: String,
    default: "In Transit"
  }
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

//  CREATE SHIPMENT
app.post("/api/shipments", async (req, res) => {
  const { sender, receiver, address, weight } = req.body;

  const trackingID = "TRK" + Math.floor(Math.random() * 1000000);

  const shipment = new Shipment({
    trackingID,
    sender,
    receiver,
    address,
    weight
  });

  await shipment.save();

  res.json({
    message: "Shipment created",
    trackingID
  });
});

//  TRACK SHIPMENT
app.get("/api/track/:id", async (req, res) => {
  const shipment = await Shipment.findOne({
    trackingID: req.params.id
  });

  if (!shipment) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(shipment);
});

//  ROOT TEST
app.get("/", (req, res) => {
  res.send("Courier API is running ");
});

//  START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));