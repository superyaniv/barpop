require('dotenv').config();

const get_bar_pop = require('./index.js');

get_bar_pop('ChIJFxdaWqkB-IgRGyTaUpflA9I', process.env.GMAPS_API_KEY).then(data => {
    console.log(data); 
 });