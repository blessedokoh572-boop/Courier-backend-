// Wake server automatically
fetch("https://buka-courier.onrender.com");

// CREATE SHIPMENT
async function createShipment() {
  try {
    let shipment = {
      trackingId: Math.random().toString(36).substring(7),
      sender: document.getElementById("sender").value,
      receiver: document.getElementById("receiver").value,
      pickup: document.getElementById("pickup").value,
      destination: document.getElementById("destination").value,
      weight: document.getElementById("weight").value,
      status: "Processing"
    };

    await fetch("https://buka-courier.onrender.com/ship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(shipment)
    });

    alert("Shipment booked! Tracking ID: " + shipment.trackingId);

  } catch (error) {
    alert("Error booking shipment");
    console.error(error);
  }
}


// TRACK SHIPMENT
async function trackPackage() {
  try {
    let id = document.getElementById("trackingId").value;

    let res = await fetch(`https://buka-courier.onrender.com/api/track/${id}`);
    let data = await res.json();

    document.getElementById("result").innerText =
      data ? `Status: ${data.status}` : "Not found";

  } catch (error) {
    document.getElementById("result").innerText = "Error connecting to server";
    console.error(error);
  }
}