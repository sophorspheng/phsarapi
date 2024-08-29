require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dqam4so8m',
  api_key: '923626278262269',
  api_secret: 'rbm0iP7OzeXFC5H2p2zk5ZmV_s0'
});

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zando2'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  // destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to handle image upload
// Route to handle image upload
app.post('/upload-image', upload.single('image'), (req, res) => {
  const { image_name } = req.body;
  const imageFile = req.file;

  // Check if image name already exists
  const checkSql = 'SELECT * FROM images WHERE image_name = ?';
  db.query(checkSql, [image_name], (checkErr, checkResults) => {
    if (checkErr) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (checkResults.length > 0) {
      // Image name already exists
      fs.unlinkSync(imageFile.path); // Remove the file from local uploads folder
      return res.status(400).json({ error: 'Image name already exists' });
    } 

    // Upload to Cloudinary
    cloudinary.uploader.upload(imageFile.path, (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Cloudinary upload failed' });
      }

      // Save image details in the database
      const sql = 'INSERT INTO images (image_name, image_path) VALUES (?, ?)';
      db.query(sql, [image_name, result.secure_url], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Database insertion failed' });
        }

        // Remove the file from local uploads folder after uploading to Cloudinary
        fs.unlinkSync(imageFile.path);

        res.status(200).json({ message: 'Image uploaded and saved successfully', imageUrl: result.secure_url });
      });
    });
  });
});


// Route to handle image update by image_name
app.put('/update-image', upload.single('image'), (req, res) => {
  const { image_name } = req.body;
  const imageFile = req.file;

  // Check if the image with the given name exists
  const checkSql = 'SELECT * FROM images WHERE image_name = ?';
  db.query(checkSql, [image_name], (checkErr, checkResults) => {
    if (checkErr) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (checkResults.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Get the current image details
    const oldImageUrl = checkResults[0].image_path;

    // Upload the new image to Cloudinary
    cloudinary.uploader.upload(imageFile.path, (uploadError, result) => {
      if (uploadError) {
        return res.status(500).json({ error: 'Cloudinary upload failed' });
      }

      // Delete the ohttps://res.cloudinary.com/dqam4so8m/image/upload/v1724934767/pm6lbrbspvqntnxpoas4.pngld image from Cloudinary
      consthttps://res.cloudinary.com/dqam4so8m/image/upload/v1724934767/pm6lbrbspvqntnxpoas4.png oldPublicId = oldImageUrl.split('/').pop().split('.')[0];
      cloudinary.uploader.destroy(oldPublicId, (destroyError) => {
        if (destroyError) {
          return res.status(500).json({ error: 'Failed to delete old image from Cloudinary' });
        }

        // Update image details in the database
        const updateSql = 'UPDATE images SET image_path = ? WHERE image_name = ?';
        db.query(updateSql, [result.secure_url, image_name], (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ error: 'Database update failed' });
          }

          // Remove the file from local uploads folder
          fs.unlinkSync(imageFile.path);

          res.status(200).json({ message: 'Image updated successfully', imageUrl: result.secure_url });
        });
      });
    });
  });
});


// testing


app.get('/get-images1', (req, res) => {
  const sql = 'SELECT * FROM images WHERE image_name	= "cm1"';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});
app.get('/get-images2', (req, res) => {
  const sql = 'SELECT * FROM images WHERE image_name	= "cm2"';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});
app.get('/get-images3', (req, res) => {
  const sql = 'SELECT * FROM images WHERE image_name	= "cm3"';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});
app.get('/get-images4', (req, res) => {
  const sql = 'SELECT * FROM images WHERE image_name	= "cm4"';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});
app.get('/get-images5', (req, res) => {
  const sql = 'SELECT * FROM images WHERE image_name	= "cm5"';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});
app.get('/get-images6', (req, res) => {
  const sql = 'SELECT * FROM images WHERE image_name	= "cm6"';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
