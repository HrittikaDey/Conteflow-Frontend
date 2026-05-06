'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!email || !password) return setError('Please fill in all fields');
    setLoading(true);
    setError('');

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    if (data.user) {
      window.location.href = '/dashboard';
    }
  }

  return (
    <main style={{ background: '#08080f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <Navbar />
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 700, background: 'linear-gradient(135deg, #fff, #a89fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
            Welcome back
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
            Sign in to your Conteflow account
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '36px' }}>
          {error && (
            <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '0.5px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#f87171', fontSize: '14px' }}>
              {error}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@company.com"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px 12px 40px', color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
              <span style={{ fontSize: '12px', color: '#a89fff', cursor: 'pointer' }}>Forgot password?</span>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input value={password} onChange={e => setPassword(e.target.value)} type={show ? 'text' : 'password'} placeholder="••••••••"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 40px 12px 40px', color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
              <button onClick={() => setShow(!show)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : <><span>Sign in</span><ArrowRight size={16} /></>}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: '#a89fff', textDecoration: 'none' }}>Sign up free</Link>
          </div>
        </div>
      </div>
    </main>
  );
}