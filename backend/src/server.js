const app = require('./app.js');

require('dotenv').config();

const port = process.env.MYSQL_PORT || 3333;

app.listen(port, () => console.log(`server running on port ${port}`));
