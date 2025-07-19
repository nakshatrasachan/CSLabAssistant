const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
//mongodb://localhost:27017/CSLabAssistant
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/CSLabAssistant', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));



app.use('/api/auth', authRoutes);

// app.get('/',(req,res)=>{
//     res.send("Hey there!");
// })















// App Running
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})