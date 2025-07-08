const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const fs = require("fs");
const rsvpRoutes = require('./routes/rsvpRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', rsvpRoutes);


app.listen(4000, () => console.log("Server running on http://localhost:4000"));