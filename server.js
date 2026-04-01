const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect("mongodb+srv://admin:Special_12@cluster0.qyfihfs.mongodb.net/courierDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(" Error:", err));

// SCHEMA
const shipmentSchema = new mongoose.Schema({
  trackingId: String,
  sender: String,
  receiver: String,
  pickup: String,
  destination: String,
  weight: String,
  status: String
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

// CREATE SHIPMENT
app.post("/ship", async (req, res) => {
  const shipment = new Shipment(req.body);
  await shipment.save();
  res.send({ message: "Shipment saved" });
});

// TRACK SHIPMENT
app.get("/api/track/:id", async (req, res) => {
  const shipment = await Shipment.findOne({ trackingId: req.params.id });
  res.json(shipment || null);
});

// UPDATE STATUS (ADMIN FEATURE)
app.put("/api/update/:id", async (req, res) => {
  const shipment = await Shipment.findOneAndUpdate(
    { trackingId: req.params.id },
    { status: req.body.status },
    { new: true }
  );
  res.json(shipment);
});

// HOME
app.get("/", (req, res) => {
  res.send("Buka Courier API with DB ");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});