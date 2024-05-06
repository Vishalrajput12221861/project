const express = require('express');
const { MongoClient } = require('mongodb'); // Import MongoClient from mongodb package
const app = express();
const path = require('path');
const bodyParser = require('body-parser'); // Import body-parser middleware

// Serve static files from the public directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; // Change this to your MongoDB URI

// Database Name
const dbName = 'myDatabase'; // Change this to your database name

// Connect to MongoDB
async function connectToDB() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');

        // Get reference to the database
        const db = client.db(dbName);

        // Get reference to the collection
        const dataCollection = db.collection('userData'); // Change 'userData' to your desired collection name

        // Insert data into MongoDB when form is submitted
        app.post('/submitData', (req, res) => {
            const data = req.body.data.trim();
            const dataArray = data.split(',').map(item => Number(item.trim()));

            // Insert the data into the collection
            dataCollection.insertOne({ data: dataArray }, (err, result) => {
                if (err) {
                    console.error('Error inserting data into MongoDB:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log('Data inserted into MongoDB:', result.insertedId);
                    res.status(200).send('Data saved successfully');
                }
            });
        });

        // Close the connection
        // await client.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    // Call the function to connect to MongoDB
    connectToDB();
});
