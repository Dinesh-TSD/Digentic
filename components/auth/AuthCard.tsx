'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getSession, useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hexagon,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  initialMode?: 'login' | 'register';
}

function getAuthErrorMessage(error: string | null): string {
  if (!error) return '';
  switch (error) {
    case 'CredentialsSignin':
      return 'Invalid email or password. Please try again.';
    case 'OAuthSignin':
      return 'Could not initialize social sign-in. Please try again.';
    case 'OAuthCallback':
      return 'Error occurred during social authentication callback. Please try again.';
    case 'OAuthCreateAccount':
      return 'Could not create an account with this social provider.';
    case 'EmailCreateAccount':
      return 'Could not create account with this email.';
    case 'Callback':
      return 'Authentication callback failed. Please check your provider settings.';
    case 'OAuthAccountNotLinked':
      return 'An account with this email already exists. Sign in with your original method to link them.';
    case 'EmailSignin':
      return 'Check your email for the sign-in link.';
    case 'SessionRequired':
      return 'Please sign in to access this page.';
    case 'AccessDenied':
      return 'Sign in was cancelled or access was denied. If you were redirected here, you may not have permission to access that area.';
    case 'Configuration':
      return 'OAuth provider is not properly configured. Check CLIENT_ID and CLIENT_SECRET in your environment.';
    default:
      return 'An authentication error occurred. Please try again.';
  }
}

export function AuthCard({ initialMode = 'login' }: AuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const errorParam = searchParams.get('error');

  const { status: sessionStatus } = useSession();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI states
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState(getAuthErrorMessage(errorParam));
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (errorParam) {
      setErrorMessage(getAuthErrorMessage(errorParam));
    }
  }, [errorParam]);

  // Redirect already-authenticated users away from auth pages
  useEffect(() => {
    if (sessionStatus !== 'authenticated') return;

    // If there's a specific callbackUrl that differs from the auth page itself, honour it
    if (callbackUrl && callbackUrl !== '/' && !callbackUrl.startsWith('/auth')) {
      router.replace(callbackUrl);
      return;
    }

    // No specific destination → route by role
    getSession().then((session) => {
      const userRole = (session?.user as any)?.role;
      if (userRole === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    });
  }, [sessionStatus, callbackUrl, router]);

  // Sync mode with URL if changed
  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
    const targetUrl = newMode === 'login' ? '/auth/login' : '/auth/register';
    window.history.replaceState(null, '', targetUrl);
  };

  /**
   * After successful auth, fetch session to determine user role.
   * Admin → /admin, User → /dashboard.
   * If a callbackUrl was explicitly provided (not the default '/'), honour it.
   */
  const redirectByRole = async (explicitCallback?: string) => {
    try {
      const session = await getSession();
      const role = (session?.user as any)?.role;

      // If the caller passed a specific callbackUrl (not the root default), use it
      if (explicitCallback && explicitCallback !== '/') {
        router.push(explicitCallback);
        router.refresh();
        return;
      }

      // Role-based default destination
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      router.refresh();
    } catch {
      // Fallback if session fetch fails
      router.push('/dashboard');
      router.refresh();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage('Invalid email or password. Please try again.');
        setLoading(false);
      } else {
        await redirectByRole(callbackUrl);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to create account.');
        setLoading(false);
        return;
      }

      setSuccessMessage('Account created! Signing you in...');

      const loginRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        switchMode('login');
        setSuccessMessage('Account created! Please sign in below.');
      } else {
        await redirectByRole(callbackUrl);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      setErrorMessage('');
      setSocialLoading(provider);
      // For OAuth we must let NextAuth handle the full redirect flow.
      // We pass /dashboard as callbackUrl; admins are then redirected
      // to /admin by the proxy middleware on /dashboard.
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (err) {
      console.error(`Error during ${provider} sign in:`, err);
      setErrorMessage(
        `Could not initiate ${provider === 'google' ? 'Google' : 'GitHub'} sign-in. Please try again.`
      );
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <Hexagon className="h-8 w-8 text-[#ff8c00]" fill="currentColor" />
            <span className="text-2xl font-bold tracking-tight text-white dark:text-white [html:not(.dark)_&]:text-gray-950">
              <span className="bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                DIGENTIC
              </span>{' '}
              TECH
            </span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login'
              ? 'Sign in to access your courses, digital assets, and dashboard'
              : 'Join DIGENTIC TECH to access top-tier AI engineering resources'}
          </p>
        </div>

        {/* Card: DARK: bg-[#111111] border-[#1f1f1f], LIGHT: bg-white border-[#e0e0e0] */}
        <div className="rounded-2xl border bg-white border-[#e0e0e0] dark:bg-[#111111] dark:border-[#1f1f1f] p-7 sm:p-8 shadow-xl">
          {/* Toggle Switch */}
          <div className="relative mb-6 grid grid-cols-2 rounded-xl bg-gray-100 dark:bg-[#181818] p-1 border border-gray-200 dark:border-[#262626]">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={cn(
                'relative z-10 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 text-center rounded-lg',
                mode === 'login'
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              {mode === 'login' && (
                <motion.div
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] shadow-md shadow-orange-500/25"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => switchMode('register')}
              className={cn(
                'relative z-10 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 text-center rounded-lg',
                mode === 'register'
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              {mode === 'register' && (
                <motion.div
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] shadow-md shadow-orange-500/25"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">Create Account</span>
            </button>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs sm:text-sm text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs sm:text-sm text-emerald-500">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Social Sign-In Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              disabled={loading || !!socialLoading}
              onClick={() => handleOAuthSignIn('google')}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 transition-all hover:border-[#ff8c00] hover:text-[#ff8c00] dark:hover:border-[#ff8c00] dark:hover:text-[#ff8c00] disabled:opacity-50"
            >
              {socialLoading === 'google' ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#ff8c00]" />
              ) : (
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Google</span>
            </button>

            <button
              type="button"
              disabled={loading || !!socialLoading}
              onClick={() => handleOAuthSignIn('github')}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 transition-all hover:border-[#ff8c00] hover:text-[#ff8c00] dark:hover:border-[#ff8c00] dark:hover:text-[#ff8c00] disabled:opacity-50"
            >
              {socialLoading === 'github' ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#ff8c00]" />
              ) : (
                <svg className="h-4 w-4 shrink-0 fill-currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              )}
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="w-full border-t border-[#e0e0e0] dark:border-[#262626]"></div>
            <span className="bg-white dark:bg-[#111111] px-3 text-[11px] uppercase tracking-wider text-gray-400">
              Or with email
            </span>
          </div>

          {/* Animated Form Switch */}
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
                    >
                      Password
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs font-medium text-[#ff8c00] hover:text-[#ff6b35] transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Sign In Button: Orange gradient */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:opacity-95 hover:shadow-orange-500/30 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('register')}
                    className="font-semibold text-[#ff8c00] hover:text-[#ff6b35] transition-colors"
                  >
                    Switch to Register
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="register-form"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="reg-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="reg-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Password (min 8 chars)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-confirm"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="reg-confirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Create Account Button: Orange gradient */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:opacity-95 hover:shadow-orange-500/30 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="font-semibold text-[#ff8c00] hover:text-[#ff6b35] transition-colors"
                  >
                    Switch to Sign In
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
