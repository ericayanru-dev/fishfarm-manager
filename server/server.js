const express = require('express');
const app = express();

// Serve frontend files
app.use(express.static('src'));


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
