const express = require('express');
const path = require('path'); // move this above dotenv
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') }); // fixed path usage
const cors = require('cors');
const connectDB = require('./config/db.js');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const hodRoutes = require('./routes/hodRoutes.js');
const engineerRoutes = require('./routes/engineerRoutes.js');
const employeeRoutes = require('./routes/employeeRoutes.js');
const complaintRoutes = require("./routes/complaintRoutes");




// Route mounting
app.use('/api/hod', hodRoutes);
app.use('/api/engineer', engineerRoutes);
app.use('/api/employee', employeeRoutes);
app.use("/api/complaints", complaintRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Complaint Management System API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("MONGO_URI:", process.env.MONGO_URI); // debug log
});
