import compat from "core-js-compat";

export default {
  async fetch(request, env, ctx) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
    };

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      const url = new URL(request.url);

      const targets =
        url.searchParams.get("targets") || url.searchParams.get("query");

      if (!targets) {
        return new Response(
          JSON.stringify({
            error: 'Missing "targets" or "query" parameter',
            example: "/?targets=> 0.5%, last 2 versions",
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      const { list } = compat({ targets: targets });

      const response = {
        targets: targets,
        polyfills: list,
        count: list.length,
        timestamp: new Date().toISOString(),
      };

      return new Response(JSON.stringify(response, null, 2), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: error.message,
          hint: "Check your browserslist query syntax",
          example: "/?targets=last 2 versions, not dead",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
  },
};
