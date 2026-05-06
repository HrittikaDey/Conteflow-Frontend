'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const path = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      padding: '0 32px', height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #6c63ff, #f06292, #ff9800)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', fontWeight: 900, color: '#fff',
          fontFamily: 'Playfair Display, serif',
          boxShadow: '0 4px 20px rgba(108,99,255,0.4)'
        }}>C</div>
        <span style={{
          fontFamily: 'Playfair Display, serif', fontSize: '22px',
          fontWeight: 700, background: 'linear-gradient(135deg, #fff 0%, #a89fff 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>Conteflow</span>
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' },
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/history', label: 'History' },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{
            padding: '8px 16px', borderRadius: '8px', fontSize: '14px',
            color: path === link.href ? '#fff' : 'rgba(255,255,255,0.5)',
            background: path === link.href ? 'rgba(255,255,255,0.08)' : 'transparent',
            textDecoration: 'none', transition: 'all 0.2s'
          }}>{link.label}</Link>
        ))}
      </div>

      {/* Auth buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {user ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <User size={14} color="rgba(255,255,255,0.5)" />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
            <button onClick={signOut} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', background: 'rgba(239,68,68,0.1)', border: '0.5px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={13} /> Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', border: '0.5px solid rgba(255,255,255,0.12)' }}>
              Sign in
            </Link>
            <Link href="/signup" style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '14px', background: 'linear-gradient(135deg, #6c63ff, #9c8ef7)', color: '#fff', textDecoration: 'none', fontWeight: 500, boxShadow: '0 4px 15px rgba(108,99,255,0.35)' }}>
              Get started free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}