'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { createClient } from '@supabase/supabase-js';
import { Clock, FileText, Globe, Mail, Search, ArrowRight, RotateCcw } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Run {
  id: string;
  created_at: string;
  topic: string;
  audience: string;
  tone: string;
  status: string;
  blog_title: string;
  blog_word_count: number;
  blog_published: boolean;
  social_published: boolean;
  email_sent: boolean;
  seo_focus_keyword: string;
}

export default function History() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRuns();
  }, []);

  async function fetchRuns() {
    setLoading(true);
    const { data, error } = await supabase
      .from('pipeline_runs')
      .select('id, created_at, topic, audience, tone, status, blog_title, blog_word_count, blog_published, social_published, email_sent, seo_focus_keyword')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching runs:', error);
    } else {
      setRuns(data || []);
    }
    setLoading(false);
  }

  const filtered = runs.filter(run =>
    run.topic?.toLowerCase().includes(search.toLowerCase()) ||
    run.blog_title?.toLowerCase().includes(search.toLowerCase())
  );

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  function timeAgo(dateStr: string) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  }

  return (
    <main style={{ background: '#08080f', minHeight: '100vh', color: '#f0f0f5' }}>
      <Navbar />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 24px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Run History
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
              {runs.length} pipeline runs saved
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={fetchRuns} style={{ padding: '10px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <RotateCcw size={14} /> Refresh
            </button>
            <Link href="/dashboard" style={{ padding: '10px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              New run <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by topic or title..."
            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 14px 12px 40px', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Total runs', value: runs.length, color: '#6c63ff' },
            { label: 'Blog posts', value: runs.filter(r => r.blog_title).length, color: '#f06292' },
            { label: 'Published', value: runs.filter(r => r.blog_published).length, color: '#4ade80' },
            { label: 'This week', value: runs.filter(r => new Date(r.created_at) > new Date(Date.now() - 7 * 86400000)).length, color: '#4dd0e1' },
          ].map(stat => (
            <div key={stat.label} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Playfair Display, serif', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Runs list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>
            Loading runs...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>
            {search ? 'No runs match your search' : 'No runs yet — generate your first content!'}
            <br />
            <Link href="/dashboard" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 24px', borderRadius: '8px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', color: '#fff', textDecoration: 'none', fontSize: '14px' }}>
              Generate content
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(run => (
              <div key={run.id} style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px 24px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                      {run.blog_title || run.topic}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                      {run.topic}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                    <Clock size={12} />
                    {timeAgo(run.created_at)}
                  </div>
                </div>

                {/* Meta tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                  {run.tone && (
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(108,99,255,0.1)', color: '#a89fff', border: '0.5px solid rgba(108,99,255,0.2)' }}>
                      {run.tone}
                    </span>
                  )}
                  {run.audience && (
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(240,98,146,0.1)', color: '#f06292', border: '0.5px solid rgba(240,98,146,0.2)' }}>
                      {run.audience}
                    </span>
                  )}
                  {run.seo_focus_keyword && (
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '0.5px solid rgba(74,222,128,0.2)' }}>
                      🔑 {run.seo_focus_keyword}
                    </span>
                  )}
                  {run.blog_word_count && (
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
                      {run.blog_word_count} words
                    </span>
                  )}
                </div>

                {/* Channel status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { icon: <FileText size={13} />, label: 'Blog', done: !!run.blog_title },
                      { icon: <Globe size={13} />, label: 'Social', done: run.social_published },
                      { icon: <Mail size={13} />, label: 'Email', done: run.email_sent },
                      { icon: <Search size={13} />, label: 'SEO', done: !!run.seo_focus_keyword },
                    ].map(channel => (
                      <div key={channel.label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: channel.done ? '#4ade80' : 'rgba(255,255,255,0.25)' }}>
                        {channel.icon} {channel.label}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
                    {formatDate(run.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}