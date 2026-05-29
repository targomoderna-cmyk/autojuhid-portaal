import '../globals.css';
'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  // Loome Supabase kliendi uue standardi järgi
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isRegistering) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) setError(error.message);
      else alert('Konto loodud! Kontrolli oma e-posti kinnituslingi saamiseks.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else {
        router.refresh();
        router.push('/');
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F19] px-4 text-white">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#111827] p-8 border border-gray-800 shadow-2xl">
        
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {isRegistering ? 'Loo konto' : 'Tere tulemast tagasi'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isRegistering ? 'Liitu autojuhid.ee portaaliga' : 'Logi sisse oma kontole'}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-900/50 p-3 text-sm text-red-300 border border-red-800">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 font-semibold text-black hover:bg-gray-100 transition duration-200"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.332 2.022 15.54 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.556-4.455 10.556-10.745 0-.724-.078-1.275-.173-1.68H12.24z"
            />
          </svg>
          Jätka Google kontoga
        </button>

        <div className="relative flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-800"></div>
          <span className="relative bg-[#111827] px-3 text-xs text-gray-500 uppercase tracking-wider">või e-mailiga</span>
        </div>

        <form className="space-y-6" onSubmit={handleEmailAuth}>
          <div>
            <label className="block text-sm font-medium text-gray-300">E-posti aadress</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-[#1F2937] border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              placeholder="nimi@firma.ee"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Parool</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-[#1F2937] border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Palun oota...' : isRegistering ? 'Loo konto' : 'Logi sisse'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="hover:text-white underline transition"
          >
            {isRegistering ? 'Sul on juba konto? Logi sisse' : 'Puudub konto? Registreeru siin'}
          </button>
        </div>

      </div>
    </div>
  );
}