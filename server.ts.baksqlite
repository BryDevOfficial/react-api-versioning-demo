// server.ts
import { Database } from "bun:sqlite";

// 1. Pag-abli/Himo sa SQLite file
const db = new Database("inventory.db", { create: true });

// 2. Setup sa Table ug Initial Data
db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, qty INTEGER)");
const checkData = db.query("SELECT * FROM items LIMIT 1").get();
if (!checkData) {
  db.run("INSERT INTO items (name, qty) VALUES (?, ?)", ["Saging", 100]);
  db.run("INSERT INTO items (name, qty) VALUES (?, ?)", ["Mangga", 50]);
}

// 3. Ang API Server
Bun.serve({
  port: 3001,
  fetch(req) {
    const url = new URL(req.url);
    const headers = { "Access-Control-Allow-Origin": "*" };

    // API Version 1
    if (url.pathname === "/api/v1/inventory") {
      const data = db.query("SELECT * FROM items").all();
      return Response.json(data, { headers });
    }

    // API Version 2 (Transforming keys)
    if (url.pathname === "/api/v2/inventory") {
      const raw = db.query("SELECT * FROM items").all() as any[];
      const transformed = raw.map(i => ({
        id: i.id,
        productTitle: i.name, // Rename
        stock: i.qty         // Rename
      }));
      return Response.json(transformed, { headers });
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log("✅ Backend running at http://localhost:3001");