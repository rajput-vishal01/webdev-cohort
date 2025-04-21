//write a fn to create users table in postgres

import { Client } from "pg";

const client = new Client({
  connectionString:
    "addYourPostgresKey",
});

async function createUserTable() {
  await client.connect();
  const result = await client.query(`

    CREATE TABLE users (
  id SERIAL PRIMARY KEY,                                  -- auto-increment integer key :contentReference[oaicite:0]{index=0}
  username VARCHAR(50) UNIQUE NOT NULL,                   -- username must be unique and not null :contentReference[oaicite:1]{index=1}
  password VARCHAR(255) NOT NULL,                         -- store hashed passwords safely :contentReference[oaicite:2]{index=2}
  created_at TIMESTAMP WITH TIME ZONE 
  DEFAULT CURRENT_TIMESTAMP NOT NULL                      -- records creation time by default :contentReference[oaicite:3]{index=3}
);

    `);

  console.log(result);
}

// createUserTable()

/*

Never send the user recieved query directly to the DB. It can lead to a SQL Injection Attack

*/

// async function insertData() {
//   await client.connect();
//   const result = await client.query(`
//   INSERT INTO users (username, password) VALUES
//   ('alice', 's3cureP@ss1'),
//   ('bob',   '7y&jKl90');

//     `);

//   console.log(result);
// }

// insertData();

/*
 Never send the user-received query directly to the DB. It can lead to a SQL Injection Attack
*/

async function insertData(username: string, password: string) {
  // await client.connect();

  // Parameterized SQL query: $1, $2 are placeholders
  const insertQuery = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;                                           -- return the inserted row for confirmation
  `;
  const values = [username, password];

  try {
    const res = await client.query(insertQuery, values);
    console.log("Insert result:", res.rows[0]);
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    await client.end();
  }
}

// insertData("alice212", "s3cureP@ss1");


async function updateData(id:number, newUsername:string, newPassword:string) {
  await client.connect();

  const updateQuery = `
    UPDATE users 
    SET username = $1, password = $2
    WHERE id = $3
    RETURNING *;                                            -- return the updated row
  `;
  const values = [newUsername, newPassword, id];

  try {
    const res = await client.query(updateQuery, values);
    console.log("Update result:", res.rows[0]);
  } catch (err) {
    console.error("Error updating data:", err);
  } finally {
    await client.end();
  }
}


// updateData(1, 'alice_new', 'n3wH@sh3dP@ss');

async function deleteData(id:number) {
  // await client.connect();

  const deleteQuery = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *;                                            -- return the deleted row
  `;
  const values = [id];

  try {
    const res = await client.query(deleteQuery, values);
    console.log("Delete result:", res.rows[0]);
  } catch (err) {
    console.error("Error deleting data:", err);
  } finally {
    await client.end();
  }
}

// deleteData(2);