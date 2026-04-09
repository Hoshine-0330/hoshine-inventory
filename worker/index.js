export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const GIST_ID = '43ffe83c0ec12aa8545e98402da415bc';
    const GITHUB_TOKEN = env.GITHUB_TOKEN;
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // 读取 Gist
    if (url.pathname === '/read') {
      const resp = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'User-Agent': 'hoshine-inventory' }
      });
      const data = await resp.json();
      const content = data.files['inventory.json']?.content || '[]';
      return new Response(content, {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // 写入 Gist
    if (url.pathname === '/write' && request.method === 'POST') {
      const body = await request.text();
      const resp = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent': 'hoshine-inventory'
        },
        body: JSON.stringify({
          description: 'hoshine inventory (私有)',
          files: { 'inventory.json': { content: body } }
        })
      });
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
