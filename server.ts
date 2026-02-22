// server.ts (Supabase Version)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);
    const headers = { "Access-Control-Allow-Origin": "*" };

    // API VERSION 1
    if (url.pathname === "/api/v1/inventory") {
      const { data, error } = await supabase.from('items').select('*');
      return Response.json(data || [], { headers });
    }

    // API VERSION 2
    if (url.pathname === "/api/v2/inventory") {
      const { data, error } = await supabase.from('items').select('*');
      const transformed = (data || []).map(i => ({
        id: i.id,
        productTitle: i.name,
        stock: i.qty
      }));
      return Response.json(transformed, { headers });
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log("✅ Supabase Backend running at http://localhost:3001");