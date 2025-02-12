import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const data = await req.json()
  const snapshot_id = req.headers.get('snapshot-id')

  console.log("Data:", data)
  console.log("snapshot_id:", snapshot_id)

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )

  const { error } =
    await supabase.from('yt_channels').insert(
      data.map((item: any) => ({
        id: item.id,
        url: item.url,
        handle: item.handle,
        banner_img: item.banner_img,
        profile_image: item.profile_image,
        name: item.name,
        subscribers: item.subscribers,
        videos_count: item.videos_count,
        created_date: item.created_date,
        views: item.views,
        Description: item.Description,
        location: item.Details.location,
      }))
    )
  await supabase.from("scrape_jobs").update({
    status: "ready",
    channel_id: data[0].id
  }).eq(
    "id",
    snapshot_id,
  );

  return new Response(
    JSON.stringify({ status: "ok" }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    },
  )
})

