// server.ts (MySQL Version)
import mysql from 'mysql2/promise';

// 1. Setup MySQL Connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'inventory_db'
});

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);
    const headers = { "Access-Control-Allow-Origin": "*" };

    // API VERSION 1
    if (url.pathname === "/api/v1/inventory") {
      // Manguha sa data gikan sa MySQL table
      const [rows] = await pool.query("SELECT * FROM items");
      return Response.json(rows, { headers });
    }

    // API VERSION 2 (Transformation)
    if (url.pathname === "/api/v2/inventory") {
      const [rows] = await pool.query("SELECT * FROM items") as any[];
      const transformed = rows.map(i => ({
        id: i.id,
        productTitle: i.item_name, // MySQL column name is item_name
        stock: i.qty
      }));
      return Response.json(transformed, { headers });
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log("✅ MySQL Backend running at http://localhost:3001");