const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;

const exampleGraph = {
  tasks: [
    {
      id: 0,
      name: 'coucou jeannot',
      pos: { x: 0, y: 90 },
    },
    {
      id: 1,
      name: 'hector is a definitly a great hero',
      pos: { x: 0, y: 0 },
    },
  ],
  dependencies: [{ predecessor: 0, successor: 1 }],
};

// WARNING: The following allows ANY origin to access the server
// Specify CORS options to restrict it
// See https://github.com/expressjs/cors
app.use(cors());

app.get('/graph/:id', (req, res) => {
  res.send(exampleGraph);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
