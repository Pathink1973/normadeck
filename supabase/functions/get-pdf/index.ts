import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
  'Access-Control-Expose-Headers': 'Location'
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, // No Content for OPTIONS
      headers: corsHeaders 
    });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing ID parameter' }), { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Verify authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabaseClient
      .from('normas')
      .select('pdf_url')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      return new Response(JSON.stringify({ error: 'Database query failed' }), { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    if (!data || !data.pdf_url) {
      return new Response(JSON.stringify({ error: 'PDF not found' }), { 
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Return the PDF URL in the Location header
    return new Response(JSON.stringify({ url: data.pdf_url }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Location': data.pdf_url
      }
    });

  } catch (error) {
    console.error('Error in get-pdf function:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { 
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});