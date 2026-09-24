'use client';

import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import type { Course } from '@/lib/courses-data';

const LEVEL_STYLES: Record<Course['level'], string> = {
  Beginner: 'bg-orange-100 text-orange-700 dark:bg-[#ff8c00]/10 dark:text-[#ff8c00]',
  Intermediate: 'bg-orange-200 text-orange-700 dark:bg-[#ff8c00]/20 dark:text-[#ff8c00]',
  Advanced: 'bg-[#ff8c00] text-white',
};

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Razorpay configuration - replace with your actual key
  const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_demo';

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error('Failed to load Razorpay');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/courses/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setCourse(result.data);
        } else {
          setError(result.error || 'Course not found');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();

    // Get session
    const getSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        setSession(data);
      } catch (e) {
        console.error('Failed to get session:', e);
      }
    };
    getSession();
  }, [id]);

  const handlePayment = async () => {
    if (!session?.user) {
      router.push(`/auth/signin?callbackUrl=/courses/${id}/payment`);
      return;
    }

    if (!course || !razorpayLoaded) {
      setPaymentError('Payment system not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Create order on backend
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          amount: course.price,
          currency: 'INR',
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        throw new Error(orderResult.error || 'Failed to create payment order');
      }

      const order = orderResult.data;

      // Open Razorpay checkout
      const options: any = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Digentic Tech',
        description: course.title,
        image: '/images/logo.png',
        order_id: order.id,
        handler: async (response: any) => {
          // Verify payment on backend
          try {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: course.id,
              }),
            });

            const verifyResult = await verifyResponse.json();

            if (verifyResult.success) {
              // Enroll user after successful payment
              const enrollResponse = await fetch(`/api/courses/${id}/enroll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
              });
              
              const enrollResult = await enrollResponse.json();
              
              if (enrollResult.success) {
                router.push(`/courses/${id}/learn/${course.curriculum[0]?.lessons[0]?.id ?? '1'}?payment=success`);
                router.refresh();
              } else {
                throw new Error('Payment verified but enrollment failed');
              }
            } else {
              throw new Error(verifyResult.error || 'Payment verification failed');
            }
          } catch (err) {
            console.error('Payment verification error:', err);
            setPaymentError('Payment successful but verification failed. Please contact support.');
            setIsProcessing(false);
          }
        },
        prefill: {
          name: session.user.name || '',
          email: session.user.email || '',
        },
        notes: {
          course_id: course.id,
          user_id: session.user.id || session.user._id || '',
        },
        theme: {
          color: '#ff8c00',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        setPaymentError(response.error?.description || 'Payment failed. Please try again.');
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentError(err instanceof Error ? err.message : 'An error occurred during payment');
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff8c00] border-t-transparent" />
          <p className="text-sm text-[#666666] dark:text-[#94a3b8]">Loading payment page...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-12 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href={`/courses/${id}/enroll`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#666666] transition-colors hover:text-[#ff8c00] dark:text-[#94a3b8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Enrollment
        </Link>

        {/* Course Header */}
        <div className="mb-8 rounded-xl border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={320}
                height={180}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <span className={`mb-3 inline-block rounded-md px-3 py-1 text-xs font-bold ${LEVEL_STYLES[course.level]}`}>
                {course.level}
              </span>
              <h1 className="mb-3 text-2xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                  {course.title}
                </span>
              </h1>
              <div className="mb-4 text-3xl font-extrabold text-[#ff8c00]">
                ₹{course.price.toLocaleString('en-IN')}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, label: 'Lifetime access' },
                  { icon: ShieldCheck, label: 'Certificate' },
                  { icon: ShieldCheck, label: '30-day guarantee' },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 rounded-full bg-[#ff8c00] px-3 py-1 text-xs font-semibold text-white">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="rounded-xl border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <h2 className="mb-6 text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Secure Payment</h2>

          {/* Payment Method - Razorpay */}
          <div className="mb-6 rounded-lg border border-[#e0e0e0] p-4 dark:border-[#1f1f1f]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ff8c00]/10">
                <CreditCard className="h-6 w-6 text-[#ff8c00]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Razorpay</h3>
                <p className="text-sm text-[#666666] dark:text-[#94a3b8]">
                  Credit/Debit Card, UPI, Net Banking, Wallets
                </p>
              </div>
            </div>
          </div>

          {/* Security badges */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-[#666666] dark:text-[#94a3b8]">
            <div className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-[#ff8c00]" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#ff8c00]" />
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#ff8c00]" />
              <span>Instant Enrollment</span>
            </div>
          </div>

          {paymentError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                {paymentError}
              </div>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing || !razorpayLoaded}
            className="w-full rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-3.5 text-base font-bold text-white transition-all hover:shadow-lg hover:shadow-[#ff8c00]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Processing...
              </span>
            ) : !razorpayLoaded ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Loading payment gateway...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pay ₹{course.price.toLocaleString('en-IN')}
              </span>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-[#666666] dark:text-[#94a3b8]">
            By proceeding, you agree to our{' '}
            <Link href="/terms" className="text-[#ff8c00] hover:underline">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#ff8c00] hover:underline">Privacy Policy</Link>.
          </p>

          <p className="mt-2 text-center text-xs text-[#666666] dark:text-[#94a3b8]">
            Your payment is secured by Razorpay. We don't store your card details.
          </p>
        </div>

        {/* Order Summary */}
        <div className="mt-6 rounded-xl border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <h3 className="mb-4 text-base font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-[#666666] dark:text-[#94a3b8]">
              <span>{course.title}</span>
              <span className="font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">₹{course.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[#666666] dark:text-[#94a3b8]">
              <span>GST (18%)</span>
              <span className="font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">
                ₹{(course.price * 0.18).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="border-t border-[#e0e0e0] pt-3 dark:border-[#1f1f1f]">
              <div className="flex justify-between font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
                <span>Total</span>
                <span>₹{(course.price * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}