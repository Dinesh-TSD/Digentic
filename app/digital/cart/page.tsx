'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  X,
  ChevronRight,
  Shield,
  RefreshCw,
  Download,
} from 'lucide-react';
import { DIGITAL_PRODUCTS } from '@/lib/digital-products';

/* ─────────────────────── types ─────────────────────── */
interface CartItem {
  productId: string;
  quantity: number;
}

/* ─────────────────────── seed cart ─────────────────── */
const INITIAL_CART: CartItem[] = [
  { productId: '1', quantity: 1 },
  { productId: '2', quantity: 1 },
  { productId: '4', quantity: 1 },
];

/* ─────────────────────── component ─────────────────── */
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  /* helpers */
  function getProduct(id: string) {
    return DIGITAL_PRODUCTS.find((p) => p.id === id);
  }

  function updateQty(productId: string, delta: number) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(productId: string) {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  /* pricing */
  const subtotal = cartItems.reduce((sum, item) => {
    const p = getProduct(item.productId);
    return sum + (p?.price ?? 0) * item.quantity;
  }, 0);

  const VALID_COUPONS: Record<string, number> = { DIGENTIC20: 20, LAUNCH10: 10 };
  const discountPct = appliedCoupon ? VALID_COUPONS[appliedCoupon] ?? 0 : 0;
  const discountAmt = Math.round((subtotal * discountPct) / 100);
  const taxRate = 0.18;
  const taxAmt = Math.round((subtotal - discountAmt) * taxRate);
  const total = subtotal - discountAmt + taxAmt;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code.');
      setAppliedCoupon(null);
    }
  }

  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* header bar */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/digital" className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[#ff8c00]">
            Digital Store
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span className="text-xs text-[#ff8c00]">Cart</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* title */}
        <h1 className="mb-8 flex items-center gap-3 text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/15">
            <ShoppingCart className="h-5 w-5 text-[#ff8c00]" />
          </span>
          Your Cart
          {!isEmpty && (
            <span className="rounded-full bg-[#ff8c00] px-2.5 py-0.5 text-sm font-bold text-white">
              {cartItems.length}
            </span>
          )}
        </h1>

        {isEmpty ? (
          /* empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-24 text-center"
          >
            <ShoppingBag className="mb-4 h-16 w-16 text-[#ff8c00] opacity-40" />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Your cart is empty</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href="/digital"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:opacity-90"
            >
              <ShoppingBag className="h-4 w-4" /> Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* ── Cart Items (left 2/3) ── */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => {
                  const p = getProduct(item.productId);
                  if (!p) return null;
                  const lineTotal = (p.price ?? 0) * item.quantity;

                  return (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 transition-all hover:border-orange-600/40"
                    >
                      {/* image */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>

                      {/* info */}
                      <div className="flex flex-1 flex-col justify-between gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/digital/${p.slug}`}
                              className="text-sm font-bold text-[var(--text-primary)] hover:text-[#ff8c00] transition-colors line-clamp-2"
                            >
                              {p.title}
                            </Link>
                            <p className="mt-0.5 text-xs text-[var(--text-muted)]">{p.type}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="shrink-0 rounded-lg p-1.5 text-[var(--text-muted)] transition-colors hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          {/* quantity */}
                          <div className="flex items-center gap-1 rounded-lg border border-[#ff8c00] px-1">
                            <button
                              onClick={() => updateQty(item.productId, -1)}
                              className="p-1.5 text-[#ff8c00] hover:text-orange-700 transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm font-semibold text-[var(--text-primary)]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.productId, 1)}
                              className="p-1.5 text-[#ff8c00] hover:text-orange-700 transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* subtotal */}
                          <div className="text-right">
                            {p.originalPrice && (
                              <p className="text-xs text-[var(--text-muted)] line-through">
                                ₹{p.originalPrice}
                              </p>
                            )}
                            <p className="text-base font-bold text-[#ff8c00]">₹{lineTotal}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* coupon */}
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <Tag className="h-4 w-4 text-[#ff8c00]" /> Have a coupon?
                </p>
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponError(''); }}
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#ff8c00] focus:outline-none focus:ring-1 focus:ring-[#ff8c00]"
                    onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                  />
                  <button
                    onClick={applyCoupon}
                    className="rounded-xl bg-[#ff8c00] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-700"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="mt-2 text-xs text-red-400">{couponError}</p>
                )}
                {appliedCoupon && (
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-orange-600/10 px-3 py-2">
                    <Tag className="h-3.5 w-3.5 text-[#ff8c00]" />
                    <span className="text-xs font-semibold text-[#ff8c00]">
                      {appliedCoupon} — {discountPct}% OFF applied!
                    </span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="ml-auto text-[var(--text-muted)] hover:text-[#ff8c00]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  Try: <span className="font-mono font-semibold text-[#ff8c00]">DIGENTIC20</span> or{' '}
                  <span className="font-mono font-semibold text-[#ff8c00]">LAUNCH10</span>
                </p>
              </div>

              {/* continue shopping */}
              <Link
                href="/digital"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#ff8c00] hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* ── Order Summary (right 1/3) ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
                <h3 className="mb-5 text-lg font-bold text-[var(--text-primary)]">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">
                      Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
                    </span>
                    <span className="font-semibold text-[#ff8c00]">₹{subtotal}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between">
                      <span className="text-green-400">
                        Discount ({discountPct}% off)
                      </span>
                      <span className="font-semibold text-green-400">−₹{discountAmt}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">GST (18%)</span>
                    <span className="text-[var(--text-muted)]">₹{taxAmt}</span>
                  </div>

                  <div className="border-t border-[var(--border-color)] pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-[var(--text-primary)]">Total</span>
                      <span className="text-xl font-extrabold text-orange-gradient">₹{total}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/digital/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-gradient py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:opacity-90 hover:shadow-orange-600/40"
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Link>

                {/* trust */}
                <div className="mt-5 space-y-2">
                  {[
                    { icon: <Shield className="h-3.5 w-3.5 text-[#ff8c00]" />, text: 'Secure 256-bit SSL checkout' },
                    { icon: <Download className="h-3.5 w-3.5 text-[#ff8c00]" />, text: 'Instant digital download' },
                    { icon: <RefreshCw className="h-3.5 w-3.5 text-[#ff8c00]" />, text: '7-day money-back guarantee' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      {icon}{text}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
