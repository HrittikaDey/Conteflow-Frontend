'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { ArrowRight, Zap, Globe, Mail, Search, CheckCircle, Star } from 'lucide-react';

export default function Home() {
  return (
    <main style={{ background: '#08080f', minHeight: '100vh', color: '#f0f0f5' }}>
      <Navbar />

      {/* Background effects */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,98,146,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,152,0,0.05) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <section style={{ padding: '160px 24px 100px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(108,99,255,0.1)', border: '0.5px solid rgba(108,99,255,0.3)', borderRadius: '100px', padding: '6px 18px', marginBottom: '32px', fontSize: '13px', color: '#a89fff' }}>
            <Zap size={13} fill="#a89fff" /> Powered by 4 AI agents working in parallel
          </div>

          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(42px,7vw,88px)', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px' }}>
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #c8c0ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One topic.</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #f06292, #ff9800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Four channels.</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #c8c0ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Done.</span>
          </h1>

          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7, fontWeight: 300 }}>
            Conteflow's AI pipeline generates your blog post, social media variants, email newsletter, and SEO metadata — simultaneously. No copy-pasting. No switching tools.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', borderRadius: '12px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 30px rgba(108,99,255,0.4)' }}>
              Start for free <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', borderRadius: '12px', border: '0.5px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '16px' }}>
              Try the demo
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginLeft: '8px' }}>Loved by 500+ marketers</span>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#a89fff', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>How it works</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff' }}>Four agents. One click.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { num: '01', icon: <Globe size={22} />, title: 'Blog Post', desc: 'Full 950-word article with intro, sections, conclusion and CTA', color: '#6c63ff' },
              { num: '02', icon: <Zap size={22} />, title: 'Social Media', desc: 'Platform-specific posts for LinkedIn, Twitter/X and Instagram', color: '#f06292' },
              { num: '03', icon: <Mail size={22} />, title: 'Email Newsletter', desc: 'Complete email with subject line, body, and CTA button', color: '#4dd0e1' },
              { num: '04', icon: <Search size={22} />, title: 'SEO Data', desc: 'Meta title, description, keywords, and FAQ section', color: '#4ade80' },
            ].map(item => (
              <div key={item.num} style={{ padding: '28px 24px', background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '36px', fontWeight: 900, fontFamily: 'Playfair Display, serif', color: 'rgba(255,255,255,0.04)' }}>{item.num}</div>
                <div style={{ color: item.color, marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#f06292', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Why Conteflow</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff' }}>Built different.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { title: 'Live agent progress', desc: 'Watch each AI agent complete in real time — no spinners, no guessing.' },
              { title: 'Brand voice memory', desc: 'Upload your brand guidelines once. Every output sounds like you.' },
              { title: 'Per-agent regeneration', desc: "Not happy with the LinkedIn post? Redo just that — not everything." },
              { title: 'Duplicate content detector', desc: 'Prevents writing about the same topic twice and killing your SEO.' },
              { title: 'Multi-format export', desc: 'Download as Markdown, Word, PDF or CSV — whatever your workflow needs.' },
              { title: 'Saved to database', desc: 'Every run saved permanently. Browse history, clone past runs, compare.' },
            ].map(f => (
              <div key={f.title} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '14px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle size={18} color="#6c63ff" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>{f.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#4ade80', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Pricing</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff' }}>Simple and transparent.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              { name: 'Starter', price: 'Free', desc: 'Perfect for trying Conteflow', features: ['5 pipeline runs/month', 'All 4 agents', 'Export to Markdown', 'Run history (7 days)'], color: '#6c63ff', cta: 'Get started free', href: '/signup' },
              { name: 'Pro', price: '$29/mo', desc: 'For serious content creators', features: ['Unlimited pipeline runs', 'Brand voice memory', 'Per-agent regeneration', 'Priority generation speed', 'Run history (forever)', 'Multi-format export'], color: '#f06292', cta: 'Start Pro trial', href: '/signup', popular: true },
              { name: 'Team', price: '$79/mo', desc: 'For marketing teams', features: ['Everything in Pro', 'Up to 5 team members', 'Shared brand library', 'Analytics dashboard', 'API access', 'Priority support'], color: '#4ade80', cta: 'Contact us', href: '/about' },
            ].map(plan => (
              <div key={plan.name} style={{ padding: '32px 28px', background: plan.popular ? 'rgba(240,98,146,0.06)' : 'rgba(255,255,255,0.02)', border: `0.5px solid ${plan.popular ? 'rgba(240,98,146,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '20px', position: 'relative' }}>
                {plan.popular && <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #f06292, #ff9800)', borderRadius: '0 0 10px 10px', padding: '4px 16px', fontSize: '11px', fontWeight: 600, color: '#fff' }}>MOST POPULAR</div>}
                <div style={{ fontSize: '13px', color: plan.color, fontWeight: 600, marginBottom: '8px' }}>{plan.name}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>{plan.price}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>{plan.desc}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                      <CheckCircle size={14} color={plan.color} /> {f}
                    </div>
                  ))}
                </div>
                <Link href={plan.href} style={{ display: 'block', padding: '12px', borderRadius: '10px', background: plan.popular ? 'linear-gradient(135deg, #f06292, #ff9800)' : `rgba(255,255,255,0.06)`, color: '#fff', textDecoration: 'none', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section style={{ padding: '80px 24px', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: '60px 40px', background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(240,98,146,0.1))', border: '0.5px solid rgba(108,99,255,0.25)', borderRadius: '24px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Ready to 10x your content output?</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>Join 500+ marketers who publish across all channels in 60 seconds.</p>
            <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', borderRadius: '12px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 30px rgba(108,99,255,0.4)' }}>
              Start for free <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, background: 'linear-gradient(135deg, #fff, #a89fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>Conteflow</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>Build. Transform. Distribute content at scale.</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            {[{ href: '/about', label: 'About' }, { href: '/dashboard', label: 'Dashboard' }, { href: '/signin', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{l.label}</Link>
            ))}
          </div>
          <div style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>© 2025 Conteflow. All rights reserved.</div>
        </footer>

      </div>
    </main>
  );
}