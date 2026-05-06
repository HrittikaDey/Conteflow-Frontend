'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!name || !email || !password) return setError('Please fill in all fields');
    if (password.length < 8) return setError('Password must be at least 8 characters');

    setLoading(true);
    setError('');

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      setDone(true);
    }
  }

  if (done) return (
    <main style={{ background: '#08080f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <div style={{ textAlign: 'center', maxWidth: '400px', padding: '24px' }}>
        <CheckCircle size={48} color="#4ade80" style={{ marginBottom: '20px' }} />
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
          Check your email!
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '28px', lineHeight: 1.6 }}>
          We sent a confirmation link to <strong style={{ color: '#fff' }}>{email}</strong>. Click it to activate your account.
        </p>
        <Link href="/signin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '10px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', color: '#fff', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}>
          Go to Sign in <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );

  return (
    <main style={{ background: '#08080f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <Navbar />
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 700, background: 'linear-gradient(135deg, #fff, #a89fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
            Create account
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
            Start generating content for free
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '36px' }}>
          {error && (
            <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '0.5px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#f87171', fontSize: '14px' }}>
              {error}
            </div>
          )}

          {/* Name field */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Your name" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px 12px 40px', color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
            </div>
          </div>

          {/* Email field */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@company.com" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px 12px 40px', color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input value={password} onChange={e => setPassword(e.target.value)} type={show ? 'text' : 'password'} placeholder="Min. 8 characters" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 40px 12px 40px', color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
              <button onClick={() => setShow(!show)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating account...' : <><span>Create account</span><ArrowRight size={16} /></>}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
            Already have an account?{' '}
            <Link href="/signin" style={{ color: '#a89fff', textDecoration: 'none' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </main>
  );
}