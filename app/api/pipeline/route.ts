import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type PipelineRequest = {
  topic?: string;
  tone?: string;
  audience?: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'content';
}

function buildPipelineResult(topic: string, tone: string, audience: string) {
  const normalizedTone = titleCase(tone || 'professional');
  const title = `${titleCase(topic)}: A Practical Guide for ${audience}`;
  const keywords = [
    topic.toLowerCase(),
    `${topic.toLowerCase()} strategy`,
    `${audience.toLowerCase()} marketing`,
    'content marketing',
    'AI workflow',
    'growth strategy',
  ];

  return {
    run_id: crypto.randomUUID(),
    blog_post: {
      slug: slugify(topic),
      title,
      intro: `For ${audience}, ${topic} is no longer a side conversation. It is becoming a practical lever for clearer positioning, faster execution, and more useful customer communication.`,
      sections: [
        {
          heading: 'Why this matters now',
          body: `${topic} helps teams move from scattered ideas to focused campaigns. A ${normalizedTone.toLowerCase()} approach keeps the message credible while still giving people a clear reason to act.`,
        },
        {
          heading: 'How to put it to work',
          body: `Start with one audience pain point, turn it into a concrete promise, and reuse that promise across blog, social, email, and search content. This keeps every channel aligned without making the content feel repetitive.`,
        },
        {
          heading: 'What to measure',
          body: `Track engagement quality, qualified responses, conversion paths, and search intent. The strongest signal is not more output by itself, but whether the content creates better conversations with ${audience.toLowerCase()}.`,
        },
      ],
      conclusion: `${topic} works best when it is treated as a system: one clear idea, adapted thoughtfully for each channel.`,
      cta: 'Turn your next topic into a complete campaign.',
      word_count: 520,
    },
    social_posts: {
      linkedin: {
        post: `${topic} is becoming a real advantage for ${audience} when it is tied to a clear customer problem, not just another trend. The teams winning with it are using one strong idea across multiple channels with discipline and consistency.`,
        hashtags: ['ContentMarketing', 'GrowthStrategy', 'AIWorkflow'],
      },
      twitter: {
        post: `${topic} works when it is specific: one audience, one problem, one useful promise. Then adapt it across blog, social, email, and SEO.`,
        hashtags: ['Marketing', 'ContentStrategy', 'AI'],
      },
      instagram: {
        emoji_hook: 'New campaign idea',
        caption: `${topic} can become more than a post idea. Build it into a full campaign for ${audience}: educate, invite, follow up, and make the next step obvious.`,
        hashtags: ['marketingtips', 'contentstrategy', 'smallbusinessmarketing'],
      },
    },
    email_newsletter: {
      subject_line: `${titleCase(topic)}: what to do next`,
      preview_text: `A simple way for ${audience} to turn one topic into a useful campaign.`,
      opening_paragraph: `${topic} is easier to execute when the message is focused before the channels are chosen.`,
      main_sections: [
        {
          heading: 'Start with the audience',
          body: `Choose one problem ${audience.toLowerCase()} already care about and write directly to that moment.`,
        },
        {
          heading: 'Reuse the core idea',
          body: `A blog post can explain the idea, social can sharpen it, email can personalize it, and SEO can make it discoverable.`,
        },
      ],
      cta_button_text: 'Build the campaign',
      closing_paragraph: `The result is content that feels connected, useful, and easier to ship.`,
    },
    seo_data: {
      meta_title: `${titleCase(topic)} for ${audience}`,
      meta_description: `Learn how ${audience.toLowerCase()} can use ${topic.toLowerCase()} to build clearer, more effective content campaigns.`,
      focus_keyword: topic.toLowerCase(),
      secondary_keywords: keywords,
      faq: [
        {
          question: `How can ${audience.toLowerCase()} use ${topic.toLowerCase()}?`,
          answer: `They can start with a specific customer problem, create one central message, and adapt it across the channels their audience already uses.`,
        },
        {
          question: `What tone works best for ${topic.toLowerCase()} content?`,
          answer: `A ${normalizedTone.toLowerCase()} tone works well when it is clear, specific, and grounded in practical examples.`,
        },
      ],
      estimated_read_time: '4 min read',
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as PipelineRequest;
    const topic = body.topic?.trim();
    const tone = body.tone?.trim() || 'professional';
    const audience = body.audience?.trim() || 'General Public';

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const result = buildPipelineResult(topic, tone, audience);

    if (supabase) {
      await supabase.from('pipeline_runs').insert({
        id: result.run_id,
        topic,
        audience,
        tone: titleCase(tone),
        status: 'completed',
        blog_title: result.blog_post.title,
        blog_word_count: result.blog_post.word_count,
        blog_published: false,
        social_published: false,
        email_sent: false,
        seo_focus_keyword: result.seo_data.focus_keyword,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Pipeline failed' },
      { status: 500 }
    );
  }
}
