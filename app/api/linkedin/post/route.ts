import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { post, hashtags } = await req.json();

    // Get LinkedIn token from Supabase
    const { data: connection } = await supabase
      .from('user_connections')
      .select('buffer_access_token, user_email')
      .eq('buffer_token_type', 'linkedin')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!connection?.buffer_access_token) {
      return NextResponse.json(
        { error: 'LinkedIn not connected' },
        { status: 401 }
      );
    }

    const token = connection.buffer_access_token;

    // Get user profile to get person URN
    const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const profile = await profileRes.json();

    // Build post text
    const fullText = post + '\n\n' +
      hashtags?.map((h: string) => `#${h}`).join(' ');

    // Post to LinkedIn
    const postRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        author: `urn:li:person:${profile.sub}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: fullText },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    const postData = await postRes.json();

    if (!postRes.ok) {
      return NextResponse.json(
        { error: 'LinkedIn posting failed', details: postData },
        { status: 500 }
      );
    }

    console.log('LinkedIn post published!');
    return NextResponse.json({ success: true, post_id: postData.id });

  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to post', details: String(err) },
      { status: 500 }
    );
  }
}