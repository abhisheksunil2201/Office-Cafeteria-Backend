const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cors = require('cors');

const app = express();

// middleware
// app.use(cors({
//   credentials: true,
// }));
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin))
      return callback(null, true)

    callback(new Error('Not allowed by CORS'));
  }
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = "mongodb+srv://office_admin:OfficeCafe123@cluster0.xeodj.mongodb.net/OfficeCafe";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);

