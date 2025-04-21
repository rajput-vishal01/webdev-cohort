import { serve } from "bun";
serve({
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response("Hello World !", { status: 200 });
    } else if (url.pathname === "/login") {
      return new Response("login !", { status: 200 });
    } else {
      return new Response("404 Not found", { status: 404 });
    }
  },

  port: 3000,
  hostname: "127.0.0.1",
});
