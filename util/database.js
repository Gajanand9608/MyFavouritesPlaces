import * as SQLite from "expo-sqlite";
import { Place } from "../model/place";

let database;

export async function init() {
  try {
    database = await SQLite.openDatabaseAsync("places");

    console.log("Database opened! ");
    await createTable();
  } catch (error) {
    console.error("Error initializing the database:", error);
    throw error;
  }
}

async function createTable() {
  try {
    await database.execAsync(`CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`);

    console.log("Table created or already exists.");
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}

export async function insertPlace(place) {
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    console.log("inserted successfully");
    console.log(result);
  } catch (error) {
    console.error("Error inserting place:", error);
    throw error;
  }
}

export async function fetchPlaces() {
  try {
    const allRows = await database.getAllAsync("SELECT * FROM places");
    const places = [];
    for (const row of allRows) {
      places.push(
        new Place(
          row.title,
          row.imageUri,
          {
            address: row.address,
            lat: row.lat,
            lng: row.lng,
          },
          row.id
        )
      );
    }
    return places;
  } catch (error) { 
    console.error("Error fetching places:", error);
    throw error;
  }
}

export async function getPlaceDetailWithId(id){
  try {
    const firstRow = await database.getFirstAsync('SELECT * FROM places WHERE id = ?', [id]);
    console.log("First row fetched successfully ->  " + firstRow.title + " " + firstRow.imageUri + " " + firstRow.address + " " + firstRow.lat + " " + firstRow.lng + " " + firstRow.id);
    const place = new Place(
      firstRow.title,
      firstRow.imageUri,
      {
        address: firstRow.address,
        lat: firstRow.lat,
        lng: firstRow.lng,
      },
      firstRow.id
    );
    console.log("Place fetched successfully ->  " + place.address + " " + place.location.lat + " " + place.location.lng);
    return place;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}