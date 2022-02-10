const SQL = require("sql-template-strings");
const dbPromise = require("./database");

// Retrieves location data from place name

async function retrieveLon(place){
    const db = await dbPromise;
    const lon = await db.get(SQL`select lon from locations where place = ${place}`);

    return lon;
}

async function retrieveLat(place){
    const db = await dbPromise;
    const lat = await db.get(SQL`select lat from locations where place = ${place}`);

    return lat;
}

module.exports = {
    retrieveLat,
    retrieveLon
};