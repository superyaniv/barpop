const fetch = require('axios');
async function bar_pop(place_id, key) {

    const format_output = array => {
        return {
            hour: array[0],
            percentage: array[1]
        }
    };

    const extract_data = html => {
        let str = ['APP_INITIALIZATION_STATE=', 'window.APP_FLAGS'],
            script = html.substring(html.lastIndexOf(str[0]) + str[0].length, html.lastIndexOf(str[1]));
            // console.log(script)
        let first = eval(script),
            second = eval(first[3][6].replace(")]}'", ""));
            console.log(second[6][84])

        return second[6][84];
    };

    const process_html = html => {
        // console.log(html)
        const popular_times = extract_data(html);

        if (!popular_times) {
            return {status: 'error', message: 'No busy hour data.'};
        }

        const data = {status: 'ok'};
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        data.week = Array.from(Array(7).keys()).map(index => {
            let hours = [];
            if (popular_times[0][index] && popular_times[0][index][1]) {
                hours = Array.from(popular_times[0][index][1]).map(array => format_output(array));
            }
            return {
                day: weekdays[index],
                hours: hours
            };

        });
        const crowded_now = popular_times[7];

        if (crowded_now !== undefined) {
            data.now = format_output(crowded_now);
        }
        return data;

    };



    try {
        // const place = await gmaps.place({placeid: place_id}).asPromise();
        // const result = place.json.result;
        // const {name, formatted_address, geometry:{location}} = result;
        const {Client} = require("@googlemaps/google-maps-services-js");
        const gmaps = new Client({});
    
        gmaps
            .placeDetails({
            params: {
                place_id: place_id,
                key: key
            },
            timeout: 1000 // milliseconds
            }, fetch)
            .then(r => {
                // console.log(r.data)
                console.log(r.data.result.url)
                const html = fetch.get(r.data.result.url,{ headers: { 'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36' }  }).then(data => {
                    console.log(process_html(data.data).week[1])
                  });
                // console.log(html)
                    // return process_html(html);}
                // console.log(r.data.results[0].elevation);
            })
            .catch(e => {
            console.log(e);
            });
        // const html = await fetch_html(result.url);
        
    } catch (err) {
        return err //return {status: 'error', message: 'Error: ' + err.json.status || err};
    }


}

module.exports = bar_pop;
