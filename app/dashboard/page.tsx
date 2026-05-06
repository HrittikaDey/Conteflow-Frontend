'use client';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Globe, Mail, Search, Clock, CheckCircle, ArrowRight, BarChart3 } from 'lucide-react';

const TONES = ['Professional', 'Casual', 'Humorous', 'Authoritative', 'Inspirational'];
const AUDIENCES = ['Marketing Managers', 'Startup Founders', 'General Public', 'B2B Executives', 'Small Business Owners'];

interface PipelineResult {
  run_id: string;
  blog_post: { title: string; intro: string; sections: { heading: string; body: string }[]; conclusion: string; cta: string; word_count: number };
  social_posts: { linkedin: { post: string; hashtags: string[] }; twitter: { post: string; hashtags: string[] }; instagram: { caption: string; hashtags: string[]; emoji_hook: string } };
  email_newsletter: { subject_line: string; preview_text: string; opening_paragraph: string; main_sections: { heading: string; body: string }[]; cta_button_text: string; closing_paragraph: string };
  seo_data: { meta_title: string; meta_description: string; focus_keyword: string; secondary_keywords: string[]; faq: { question: string; answer: string }[]; estimated_read_time: string };
}

// Copy to clipboard
function copyText(text: string, label: string, setCopied: (s: string) => void) {
  navigator.clipboard.writeText(text);
  setCopied(label);
  setTimeout(() => setCopied(''), 2000);
}

// Download as file
function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Build markdown from blog post
function buildMarkdown(blog: any): string {
  return `# ${blog.title}

${blog.intro}

${blog.sections?.map((s: any) => `## ${s.heading}\n\n${s.body}`).join('\n\n')}

${blog.conclusion}

**${blog.cta}**
`;
}

// Build social text file
function buildSocialText(social: any): string {
  return `=== LINKEDIN ===
${social.linkedin.post}

Hashtags: ${social.linkedin.hashtags?.map((h: string) => '#' + h).join(' ')}

=== TWITTER / X ===
${social.twitter.post}

Hashtags: ${social.twitter.hashtags?.map((h: string) => '#' + h).join(' ')}

=== INSTAGRAM ===
${social.instagram.emoji_hook}

${social.instagram.caption}

Hashtags: ${social.instagram.hashtags?.map((h: string) => '#' + h).join(' ')}
`;
}

// Build email HTML
function buildEmailHTML(email: any): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1a1a2e;">
  <h1 style="font-size:26px;margin-bottom:8px;">${email.subject_line}</h1>
  <p style="color:#888;font-size:13px;margin-bottom:28px;">${email.preview_text}</p>
  <p style="font-size:15px;line-height:1.7;margin-bottom:24px;">${email.opening_paragraph}</p>
  ${email.main_sections?.map((s: any) => `
  <div style="margin-bottom:24px;padding-left:16px;border-left:3px solid #6c63ff;">
    <h2 style="color:#6c63ff;font-size:17px;margin-bottom:8px;">${s.heading}</h2>
    <p style="font-size:15px;line-height:1.7;color:#444;">${s.body}</p>
  </div>`).join('')}
  <p style="font-size:15px;line-height:1.7;margin-bottom:28px;">${email.closing_paragraph}</p>
  <div style="text-align:center;margin-bottom:32px;">
    <a href="#" style="padding:14px 32px;background:#6c63ff;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">${email.cta_button_text}</a>
  </div>
  <p style="color:#999;font-size:12px;text-align:center;">Sent via Conteflow</p>
</body>
</html>`;
}

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [audience, setAudience] = useState('Marketing Managers');
  const [loading, setLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState<string[]>([]);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [activeTab, setActiveTab] = useState('blog');
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  const agents = [
    { id: 1, name: 'Blog Writer', icon: '📝', color: '#7c6ef7' },
    { id: 2, name: 'Social Media', icon: '📱', color: '#f06292' },
    { id: 3, name: 'Email Newsletter', icon: '📧', color: '#4dd0e1' },
    { id: 4, name: 'SEO Optimizer', icon: '🔍', color: '#4ade80' },
  ];

  async function runPipeline() {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    setError('');
    setAgentStatus([]);

    const delays = [1000, 20000, 35000, 50000];
    delays.forEach((delay, i) => {
      setTimeout(() => {
        setAgentStatus(prev => [...prev, agents[i].name]);
      }, delay);
    });

    try {
      const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 120000);

const res = await fetch('/api/pipeline', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ topic, tone: tone.toLowerCase(), audience }),
  signal: controller.signal,
});

clearTimeout(timeoutId);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Pipeline failed');
      setResult(data);
      setAgentStatus(agents.map(a => a.name));
    } catch (err) {
      setError('Pipeline failed. Make sure your Bun server is running on port 3000.');
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { id: 'blog', label: 'Blog Post', icon: <Globe size={14} /> },
    { id: 'social', label: 'Social Media', icon: <Zap size={14} /> },
    { id: 'email', label: 'Email', icon: <Mail size={14} /> },
    { id: 'seo', label: 'SEO Data', icon: <Search size={14} /> },
  ];

  return (
    <main style={{ minHeight: '100vh', padding: '0 0 80px' }}>
      <Navbar />
      {/* Toast notification */}
{copied && (
  <div style={{
    position: 'fixed', bottom: '32px', left: '50%',
    transform: 'translateX(-50%)', zIndex: 999,
    background: '#1a1a2e', border: '0.5px solid rgba(74,222,128,0.4)',
    borderRadius: '100px', padding: '10px 20px',
    display: 'flex', alignItems: 'center', gap: '8px',
    fontSize: '14px', color: '#4ade80', fontWeight: 500,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    animation: 'slide-up 0.3s ease'
  }}>
    ✓ {copied} copied
  </div>
)}

      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,110,247,0.12) 0%, transparent 70%)', animation: 'pulse-glow 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '30%', right: '-15%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,98,146,0.08) 0%, transparent 70%)', animation: 'pulse-glow 10s ease-in-out infinite reverse' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', padding: '100px 0 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,110,247,0.1)', border: '0.5px solid rgba(124,110,247,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#7c6ef7' }}>
            <Sparkles size={13} />
            AI Content Marketing Pipeline
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', background: 'linear-gradient(135deg, #f0f0f5 0%, #8888aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            One topic.<br />Four channels. Done.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Type a topic. Four AI agents generate your blog, social posts, email newsletter, and SEO data — simultaneously.
          </p>
        </motion.div>

        {/* Input card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '20px', padding: '32px', marginBottom: '24px' }}>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Your content topic</label>
            <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. How AI is transforming content marketing in 2025..."
              rows={3}
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '0.5px solid var(--border)', borderRadius: '12px', padding: '14px 16px', color: 'var(--text-primary)', fontSize: '15px', fontFamily: 'var(--font-body)', resize: 'none', outline: 'none', transition: 'border-color 0.2s', lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = 'rgba(124,110,247,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Tone</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TONES.map(t => (
                  <button key={t} onClick={() => setTone(t)} style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '13px', border: '0.5px solid', borderColor: tone === t ? '#7c6ef7' : 'var(--border)', background: tone === t ? 'rgba(124,110,247,0.15)' : 'transparent', color: tone === t ? '#7c6ef7' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Audience</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {AUDIENCES.map(a => (
                  <button key={a} onClick={() => setAudience(a)} style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '13px', border: '0.5px solid', borderColor: audience === a ? '#f06292' : 'var(--border)', background: audience === a ? 'rgba(240,98,146,0.15)' : 'transparent', color: audience === a ? '#f06292' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={runPipeline} disabled={loading || !topic.trim()} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: loading ? 'rgba(124,110,247,0.2)' : 'linear-gradient(135deg, #7c6ef7, #9c8ef7)', border: 'none', color: '#fff', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-display)', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s', opacity: !topic.trim() ? 0.5 : 1 }}>
            {loading ? (
              <>
                <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                Pipeline running...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate all content
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {error && (
            <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '0.5px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '14px' }}>
              {error}
            </div>
          )}
        </motion.div>

        {/* Agent progress */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={13} /> Pipeline running — this takes about 60 seconds
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
                {agents.map((agent, i) => {
                  const done = agentStatus.includes(agent.name);
                  const active = agentStatus.length === i;
                  return (
                    <div key={agent.id} style={{ padding: '16px 12px', borderRadius: '12px', border: '0.5px solid', borderColor: done ? agent.color + '40' : 'var(--border)', background: done ? agent.color + '10' : 'transparent', textAlign: 'center', transition: 'all 0.4s' }}>
                      <div style={{ fontSize: '22px', marginBottom: '6px' }}>{agent.icon}</div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: done ? agent.color : active ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: '6px' }}>{agent.name}</div>
                      <div style={{ fontSize: '11px', color: done ? agent.color : active ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                        {done ? '✓ Done' : active ? 'Running...' : 'Waiting'}
                      </div>
                      {active && <div style={{ height: '2px', background: agent.color, borderRadius: '2px', marginTop: '8px', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%' }} />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Social connections banner */}
<div style={{
  padding: '16px 20px',
  background: 'rgba(255,255,255,0.02)',
  border: '0.5px solid rgba(255,255,255,0.08)',
  borderRadius: '12px', marginBottom: '16px'
}}>
  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
    🔗 Connect your social accounts to auto-post
  </div>
  <div style={{ display: 'flex', gap: '8px' }}>
    <button
      onClick={() => {
        const clientId = '86kg8zpq9jbo07';
        const redirectUri = encodeURIComponent('http://localhost:3001/api/linkedin/callback');
        const scope = encodeURIComponent('openid profile email w_member_social');
        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      }}
      style={{
        padding: '8px 20px', borderRadius: '8px', fontSize: '13px',
        fontWeight: 600, border: 'none', cursor: 'pointer',
        background: '#0077b5', color: '#fff'
      }}>
      Connect LinkedIn
    </button>
  </div>
</div>

              {/* Success banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'rgba(74,222,128,0.08)', border: '0.5px solid rgba(74,222,128,0.25)', borderRadius: '12px', marginBottom: '20px' }}>
                <CheckCircle size={18} color="#4ade80" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#4ade80' }}>All 4 agents completed successfully!</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Run ID: {result.run_id} · Saved to database</div>
                </div>
              </div>
              {/* Master export */}
<div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
  <button
    onClick={() => downloadFile(buildMarkdown(result.blog_post), result.blog_post.slug + '.md', 'text/markdown')}
    style={{ padding: '10px 16px', borderRadius: '10px', background: 'rgba(74,222,128,0.1)', border: '0.5px solid rgba(74,222,128,0.25)', color: '#4ade80', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    ⬇️ Blog .md
  </button>
  <button
    onClick={() => downloadFile(buildSocialText(result.social_posts), 'social-posts.txt', 'text/plain')}
    style={{ padding: '10px 16px', borderRadius: '10px', background: 'rgba(74,222,128,0.1)', border: '0.5px solid rgba(74,222,128,0.25)', color: '#4ade80', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    ⬇️ Social .txt
  </button>
  <button
    onClick={() => downloadFile(buildEmailHTML(result.email_newsletter), 'email.html', 'text/html')}
    style={{ padding: '10px 16px', borderRadius: '10px', background: 'rgba(74,222,128,0.1)', border: '0.5px solid rgba(74,222,128,0.25)', color: '#4ade80', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    ⬇️ Email .html
  </button>
  <button
    onClick={() => copyText(
      'BLOG: ' + result.blog_post.title + '\n\nLINKEDIN: ' + result.social_posts.linkedin.post + '\n\nEMAIL SUBJECT: ' + result.email_newsletter.subject_line + '\n\nSEO KEYWORD: ' + result.seo_data.focus_keyword,
      'All content summary'
    )}
    style={{ padding: '10px 16px', borderRadius: '10px', background: 'rgba(74,222,128,0.1)', border: '0.5px solid rgba(74,222,128,0.25)', color: '#4ade80', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    📋 Copy summary
  </button>
</div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '20px' }}>
                {[
                  { label: 'Blog words', value: result.blog_post.word_count, color: '#7c6ef7' },
                  { label: 'Social posts', value: 3, color: '#f06292' },
                  { label: 'Email sections', value: result.email_newsletter.main_sections?.length || 3, color: '#4dd0e1' },
                  { label: 'SEO keywords', value: result.seo_data.secondary_keywords?.length || 8, color: '#4ade80' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-display)', color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Tab navigation */}
              <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: activeTab === tab.id ? 'rgba(124,110,247,0.2)' : 'transparent', color: activeTab === tab.id ? '#7c6ef7' : 'var(--text-secondary)', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}>
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '16px', padding: '28px' }}>

                  {activeTab === 'blog' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <Globe size={18} color="#7c6ef7" />
                        <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{result.blog_post.title}</h2>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>{result.blog_post.intro}</p>
                      {result.blog_post.sections?.map((section, i) => (
                        <div key={i} style={{ marginBottom: '20px', paddingLeft: '16px', borderLeft: '2px solid rgba(124,110,247,0.3)' }}>
                          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#7c6ef7', marginBottom: '8px' }}>{section.heading}</h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{section.body}</p>
                        </div>
                      ))}
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{result.blog_post.conclusion}</p>
                      <div style={{ padding: '14px 18px', background: 'rgba(124,110,247,0.08)', border: '0.5px solid rgba(124,110,247,0.2)', borderRadius: '10px', fontSize: '14px', color: '#7c6ef7', fontWeight: 500 }}>
                        CTA: {result.blog_post.cta}
                      </div>
                      {/* Blog export buttons */}
<div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
  <button onClick={() => copyText(buildMarkdown(result.blog_post), 'Blog post', setCopied)}
    style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'rgba(124,110,247,0.1)', border: '0.5px solid rgba(124,110,247,0.3)', color: '#7c6ef7', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    📋 Copy blog
  </button>
  <button onClick={() => downloadFile(buildMarkdown(result.blog_post), result.blog_post.slug + '.md', 'text/markdown')}
    style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'rgba(124,110,247,0.1)', border: '0.5px solid rgba(124,110,247,0.3)', color: '#7c6ef7', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    ⬇️ Download .md
  </button>
</div>
                    </div>
                  )}

                  {activeTab === 'social' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {[
                        { name: 'LinkedIn', color: '#0077b5', post: result.social_posts.linkedin.post, tags: result.social_posts.linkedin.hashtags },
                        { name: 'Twitter / X', color: '#1da1f2', post: result.social_posts.twitter.post, tags: result.social_posts.twitter.hashtags },
                        { name: 'Instagram', color: '#f06292', post: result.social_posts.instagram.caption, tags: result.social_posts.instagram.hashtags },
                      ].map(platform => (
                        <div key={platform.name} style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '0.5px solid var(--border)', borderRadius: '12px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: platform.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{platform.name}</div>
                          <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '12px' }}>{platform.post}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {platform.tags?.slice(0, 5).map((tag, i) => (
                              <span key={i} style={{ fontSize: '12px', color: platform.color, background: platform.color + '15', padding: '3px 10px', borderRadius: '100px' }}>#{tag}</span>
                            ))}
                            {/* Social export buttons */}
<div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
  <button onClick={() => copyText(buildSocialText(result.social_posts), 'Social posts', setCopied)}
    style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'rgba(240,98,146,0.1)', border: '0.5px solid rgba(240,98,146,0.3)', color: '#f06292', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    📋 Copy all social posts
  </button>
  <button onClick={() => downloadFile(buildSocialText(result.social_posts), 'social-posts.txt', 'text/plain')}
    style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'rgba(240,98,146,0.1)', border: '0.5px solid rgba(240,98,146,0.3)', color: '#f06292', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    ⬇️ Download .txt
  </button>
  <button
  onClick={async () => {
    try {
      const res = await fetch('/api/linkedin/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: result.social_posts.linkedin.post,
          hashtags: result.social_posts.linkedin.hashtags
        })
      });
      const data = await res.json();
      if (data.success) {
        setCopied('Posted to LinkedIn');
      } else {
        alert(data.error || 'Connect LinkedIn first');
      }
    } catch {
      alert('Connect LinkedIn first');
    }
  }}
  style={{
    flex: 1, padding: '10px', borderRadius: '8px',
    background: '#0077b5', border: 'none',
    color: '#fff', fontSize: '13px',
    fontWeight: 600, cursor: 'pointer'
  }}>
  🚀 Post to LinkedIn
</button>
</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'email' && (
                    <div>
                      <div style={{ padding: '16px', background: 'rgba(77,208,225,0.05)', border: '0.5px solid rgba(77,208,225,0.2)', borderRadius: '10px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>SUBJECT LINE</div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#4dd0e1' }}>{result.email_newsletter.subject_line}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Preview: {result.email_newsletter.preview_text}</div>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>{result.email_newsletter.opening_paragraph}</p>
                      {result.email_newsletter.main_sections?.map((section, i) => (
                        <div key={i} style={{ marginBottom: '16px', paddingLeft: '16px', borderLeft: '2px solid rgba(77,208,225,0.3)' }}>
                          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#4dd0e1', marginBottom: '6px' }}>{section.heading}</h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{section.body}</p>
                        </div>
                      ))}
                      <div style={{ padding: '12px 20px', background: 'rgba(77,208,225,0.1)', border: '0.5px solid rgba(77,208,225,0.3)', borderRadius: '8px', display: 'inline-block', marginTop: '8px', fontSize: '14px', fontWeight: 600, color: '#4dd0e1' }}>
                        {/* Email export buttons */}
<div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
  <button onClick={() => copyText(result.email_newsletter.opening_paragraph + '\n\n' + result.email_newsletter.main_sections?.map((s: any) => s.heading + '\n' + s.body).join('\n\n'), 'Email')}
    style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'rgba(77,208,225,0.1)', border: '0.5px solid rgba(77,208,225,0.3)', color: '#4dd0e1', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    📋 Copy email
  </button>
  <button onClick={() => downloadFile(buildEmailHTML(result.email_newsletter), 'email-newsletter.html', 'text/html')}
    style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'rgba(77,208,225,0.1)', border: '0.5px solid rgba(77,208,225,0.3)', color: '#4dd0e1', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
    ⬇️ Download .html
  </button>
</div>
                        {result.email_newsletter.cta_button_text} →
                      </div>
                    </div>
                  )}

                  {activeTab === 'seo' && (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                        {[
                          { label: 'Meta title', value: result.seo_data.meta_title, color: '#4ade80' },
                          { label: 'Focus keyword', value: result.seo_data.focus_keyword, color: '#4ade80' },
                          { label: 'Read time', value: result.seo_data.estimated_read_time, color: '#4ade80' },
                          { label: 'Meta description', value: result.seo_data.meta_description, color: '#4ade80' },
                        ].map(item => (
                          <div key={item.label} style={{ padding: '14px', background: 'rgba(74,222,128,0.05)', border: '0.5px solid rgba(74,222,128,0.15)', borderRadius: '10px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Secondary keywords</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {result.seo_data.secondary_keywords?.map((kw, i) => (
                            <span key={i} style={{ fontSize: '13px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '4px 12px', borderRadius: '100px', border: '0.5px solid rgba(74,222,128,0.2)' }}>{kw}</span>
                          ))}
                        </div>
                      </div>
                      {result.seo_data.faq?.length > 0 && (
                        <div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>FAQ section</div>
                          {result.seo_data.faq.map((item, i) => (
                            <div key={i} style={{ marginBottom: '12px', padding: '14px', background: 'rgba(255,255,255,0.02)', border: '0.5px solid var(--border)', borderRadius: '10px' }}>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: '#4ade80', marginBottom: '6px' }}>Q: {item.question}</div>
                              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>A: {item.answer}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats footer */}
        {!loading && !result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginTop: '8px' }}>
            {[
              { icon: <Zap size={16} />, label: 'Agents working in parallel', value: '4 AI agents' },
              { icon: <BarChart3 size={16} />, label: 'Channels covered', value: 'Blog · Social · Email · SEO' },
              { icon: <Clock size={16} />, label: 'Average generation time', value: '~60 seconds' },
            ].map(stat => (
              <div key={stat.label} style={{ padding: '16px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
