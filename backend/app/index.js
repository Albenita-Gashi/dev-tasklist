const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using promise-based API
const cors = require('cors');
const app = express();
const port = 5000;
const BookingSchema = require("./validator/booking-schema")

const pool = mysql.createPool({
  host: 'mysql',
  user: 'my_user',
  password: 'my_password',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

// API endpoint to fetch bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/booking/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [bookingId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
});


// API endpoint to insert a booking
app.post('/api/bookings', async (req, res) => {
  const validationResult = BookingSchema.validate(req.body)
  if (validationResult.error) {
    return res.status(400)
    .json({
      error: validationResult.error.message,
      message: "A validation error occoured"
    })
  }
  
  const { service, doctor_name, start_time, end_time, date } = req.body;
  const insertQuery = 'INSERT INTO bookings (service, doctor_name, start_time, end_time, date) VALUES (?, ?, ?, ?, ?)';
  try {
    await pool.query(insertQuery, [service, doctor_name, start_time, end_time, date]);
    res.status(201).send('Booking inserted successfully');
  } catch (error) {
    console.error('Error inserting booking:', error);
    res.status(500).json({
      error: "An error occoured while booking! Try again",
      message: "Internal Server Error"
    })
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.status(200).json({ message: 'Booking deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});