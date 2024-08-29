// exports.uploadData = (req, res) => {
//   const { name } = req.body;
//   const files = req.files;

//   if (!files || files.length === 0) {
//     console.error("No files uploaded");
//     return res.status(400).json({ error: "No files uploaded" });
//   }

//   console.log(
//     "Files received for upload:",
//     files.map((file) => file.originalname)
//   ); // Debug log

//   const uploadPromises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       const uploadOptions = {
//         folder: "image",
//         resource_type: "image",
//         public_id: file.originalname.split(".")[0], // Use the file name without extension
//       };

//       cloudinary.uploader
//         .upload_stream(uploadOptions, (error, result) => {
//           if (error) {
//             console.error("Cloudinary upload error:", error);
//             reject(error);
//           } else {
//             resolve(result.secure_url); // Cloudinary URL of the uploaded image
//           }
//         })
//         .end(file.buffer); // End the stream with the file buffer
//     });
//   });

//   Promise.all(uploadPromises)
//     .then((imageUrls) => {
//       const query = "INSERT INTO forms (name, image_path) VALUES ?";
//       const values = imageUrls.map((imageUrl) => [name, imageUrl]);

//       db.query(query, [values], (error, results) => {
//         if (error) {
//           console.error("Database query error:", error);
//           return res.status(500).json({ error: "Database query error" });
//         }

//         console.log("Image data inserted into database:", results); // Debug log

//         res.json({ id: results.insertId, name, images: imageUrls });
//       });
//     })
//     .catch((error) => {
//       console.error("Error uploading images:", error);
//       res.status(500).json({ error: "Error uploading images" });
//     });
// };


 cloud_name: 'dqam4so8m',
  api_key: '923626278262269',
  api_secret: 'rbm0iP7OzeXFC5H2p2zk5ZmV_s0'# phsarapi
# phsarapi
