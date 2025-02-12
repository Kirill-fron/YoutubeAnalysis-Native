import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {

  const { url } = await req.json()

  
  const response = await fetch(`https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lk538t2k2p1k3oos71&endpoint=${Deno.env.get("SUPABASE_URL")}/functions/v1/collection_webhook&format=json&uncompressed_webhook=true&include_errors=true`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get('BRIGHT_DATA_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify([{ url }]),
  })



  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to trigger collection" }),
      {
        headers: { 'Content-Type': 'application/json', }
      }
    )
  }
  const data = await response.json()

  return new Response(
    JSON.stringify({ data }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
})