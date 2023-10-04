// import axios from "axios";

// export default axios.create({baseURL:'http://10.12.0.220:5500'});    // for emulator
// export default axios.create({baseURL:'http://10.0.7.75:5500'});         // for phone with same wifi
// export default axios.create({baseURL:'https://healthtracker-jwpl.onrender.com'});

// axios.js

import axios from 'axios';
import qs from 'qs';

export default axios.create({
  baseURL: 'https://healthtracker-jwpl.onrender.com', // Replace with your API base URL
//   timeout: 5000, // Set a timeout for requests if needed
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [data => qs.stringify(data)], // Convert data to URL-encoded format
});
