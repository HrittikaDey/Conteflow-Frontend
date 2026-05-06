import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(
      new URL('/dashboard?error=linkedin_denied', req.url)
    );
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch(
      'https://www.linkedin.com/oauth/v2/accessToken',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
          client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET!
        })
      }
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error('LinkedIn token error:', tokenData);
      return NextResponse.redirect(
        new URL('/dashboard?error=token_failed', req.url)
      );
    }

    // Get LinkedIn user profile
    const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const profile = await profileRes.json();

    // Save token to Supabase
    await supabase.from('user_connections').upsert({
      user_email: profile.email || 'user@conteflow.com',
      buffer_access_token: tokenData.access_token,
      buffer_token_type: 'linkedin',
      connected_at: new Date().toISOString()
    });

    console.log('LinkedIn connected for:', profile.email);

    return NextResponse.redirect(
      new URL('/dashboard?linkedin=connected', req.url)
    );

  } catch (err) {
    console.error('LinkedIn OAuth error:', err);
    return NextResponse.redirect(
      new URL('/dashboard?error=oauth_failed', req.url)
    );
  }
}