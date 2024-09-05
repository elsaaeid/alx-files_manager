// server.js
import express from 'express';
import allRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// Load all routes
app.use('/', allRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
