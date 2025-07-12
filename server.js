const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const fs = require("fs");
const rsvpRoutes = require('./routes/rsvpRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', rsvpRoutes);

const db = require('./db/knex');


//   
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
