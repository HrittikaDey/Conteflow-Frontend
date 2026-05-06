import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { ArrowRight, Target, Zap, Heart } from 'lucide-react';

export default function About() {
  return (
    <main style={{ background: '#08080f', minHeight: '100vh', color: '#f0f0f5' }}>
      <Navbar />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', padding: '140px 24px 80px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#a89fff', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>Our story</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px', background: 'linear-gradient(135deg, #fff 0%, #c8c0ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            We got tired of the content treadmill.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Every marketer knows the pain — writing a blog post, then rewriting it for LinkedIn, then adapting it for email, then figuring out SEO. The same idea, four times, four different tools. We built Conteflow to end that.
          </p>
        </div>

        {/* Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '80px' }}>
          {[
            { icon: <Target size={24} />, title: 'Our mission', desc: 'Make professional content creation accessible to every business — not just ones with large marketing teams.', color: '#6c63ff' },
            { icon: <Zap size={24} />, title: 'Our approach', desc: 'Four specialized AI agents working in parallel, each trained for their specific channel and purpose.', color: '#f06292' },
            { icon: <Heart size={24} />, title: 'Our promise', desc: 'Your content always sounds like you. Brand voice, tone, audience — all preserved across every channel.', color: '#4ade80' },
          ].map(item => (
            <div key={item.title} style={{ padding: '28px', background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px' }}>
              <div style={{ color: item.color, marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div style={{ padding: '48px', background: 'rgba(108,99,255,0.05)', border: '0.5px solid rgba(108,99,255,0.15)', borderRadius: '20px', marginBottom: '60px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>Why we built this</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '16px' }}>
            Conteflow was born out of frustration. As marketers ourselves, we spent hours every week doing the same thing — taking one good idea and manually reshaping it for every platform. A blog post became a LinkedIn article, then a tweet thread, then an email, then we had to figure out keywords. Each step was manual, slow, and error-prone.
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '16px' }}>
            We knew AI could do this — but not the generic, one-shot tools that existed. We needed a pipeline. Four specialized agents, each an expert in their channel, all reading the same source material and producing coherent, on-brand output simultaneously.
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
            That's Conteflow. Built by marketers, for marketers. We obsess over the details — tone consistency, platform-specific formatting, SEO best practices — so you don't have to.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '60px' }}>
          {[
            { num: '500+', label: 'Marketers using Conteflow' },
            { num: '10,000+', label: 'Pipeline runs completed' },
            { num: '60s', label: 'Average generation time' },
          ].map(stat => (
            <div key={stat.label} style={{ padding: '28px 20px', background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 900, background: 'linear-gradient(135deg, #6c63ff, #f06292)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>{stat.num}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '48px', background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(240,98,146,0.07))', border: '0.5px solid rgba(108,99,255,0.2)', borderRadius: '20px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Ready to try it?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', marginBottom: '28px' }}>Join Conteflow free. No credit card needed.</p>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', color: '#fff', textDecoration: 'none', fontSize: '15px', fontWeight: 600, boxShadow: '0 8px 24px rgba(108,99,255,0.35)' }}>
            Get started free <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </main>
  );
}