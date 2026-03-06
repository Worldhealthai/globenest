'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Home, ShoppingBag, MessageCircle, Shield, Users, Zap, Globe, Heart, CheckCircle2, Sparkles, TrendingUp, Award, Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Image from 'next/image'
import AppHome from '@/components/features/AppHome'

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* Mobile: Show App Home */}
      <div className="md:hidden">
        <AppHome />
      </div>

      {/* Desktop: Show Marketing Landing Page */}
      <MarketingLanding />
    </>
  )
}

function MarketingLanding() {
  const features = [
    {
      icon: Home,
      title: 'Smart Room Matching',
      description: 'Swipe through verified rooms and flatmates. Match based on lifestyle, budget, and location preferences.',
      gradient: 'from-primary/20 via-primary/5 to-transparent',
      iconGradient: 'from-primary-400 to-primary-600',
      glow: 'rgba(139, 92, 246, 0.3)',
    },
    {
      icon: ShoppingBag,
      title: 'Instant Marketplace',
      description: 'Buy and sell furniture, appliances, and essentials. Connect with expats leaving and arriving.',
      gradient: 'from-secondary/20 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary-400 to-secondary-600',
      glow: 'rgba(34, 211, 238, 0.3)',
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'Chat directly with matches. Schedule viewings, negotiate prices, and build trust before meeting.',
      gradient: 'from-accent/20 via-accent/5 to-transparent',
      iconGradient: 'from-pink-400 to-rose-600',
      glow: 'rgba(244, 114, 182, 0.3)',
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'Every user is verified. Review system ensures reliability and builds a trustworthy community.',
      gradient: 'from-primary/20 via-primary/5 to-transparent',
      iconGradient: 'from-primary-400 to-primary-600',
      glow: 'rgba(139, 92, 246, 0.3)',
    },
    {
      icon: Users,
      title: 'Expat Community',
      description: 'Connect with people who understand your journey. Share tips, experiences, and make friends.',
      gradient: 'from-secondary/20 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary-400 to-secondary-600',
      glow: 'rgba(34, 211, 238, 0.3)',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Find what you need in minutes, not weeks. Our smart algorithm connects the right people instantly.',
      gradient: 'from-accent/20 via-accent/5 to-transparent',
      iconGradient: 'from-pink-400 to-rose-600',
      glow: 'rgba(244, 114, 182, 0.3)',
    },
  ]

  const howItWorks = [
    { step: 1, title: 'Create Your Profile', description: "Tell us about yourself, your move date, and what you're looking for.", icon: Sparkles, color: 'from-primary to-primary-700' },
    { step: 2, title: 'Browse & Match', description: 'Swipe through rooms, flatmates, and marketplace items tailored to your needs.', icon: Heart, color: 'from-secondary-500 to-secondary-700' },
    { step: 3, title: 'Connect & Arrange', description: 'Message matches, schedule viewings, and finalise your relocation plans.', icon: MessageCircle, color: 'from-accent to-pink-600' },
    { step: 4, title: 'Move In & Thrive', description: 'Settle into your new home with everything you need, backed by our community.', icon: Award, color: 'from-primary-600 to-secondary-600' },
  ]

  const stats = [
    { value: '10K+', label: 'Active Users', icon: Users, color: 'from-primary/20 to-primary/5', iconColor: 'text-primary-400' },
    { value: '5K+', label: 'Successful Matches', icon: Heart, color: 'from-secondary/20 to-secondary/5', iconColor: 'text-secondary-400' },
    { value: '£2M+', label: 'Items Traded', icon: TrendingUp, color: 'from-accent/20 to-accent/5', iconColor: 'text-accent' },
    { value: '4.9/5', label: 'User Rating', icon: Star, color: 'from-primary/20 to-primary/5', iconColor: 'text-primary-400' },
  ]

  return (
    <div className="hidden md:block min-h-screen overflow-hidden" style={{ background: 'var(--color-background)' }}>

      {/* ─── HERO ───────────────────────────────── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative aurora-bg">

        {/* Animated background orbs */}
        <div className="absolute top-10 left-10 w-[600px] h-[600px] rounded-full pointer-events-none orb-drift"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)' }} />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)', animation: 'orbDrift 16s ease-in-out infinite reverse' }} />
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 70%)', animation: 'orbDrift 20s ease-in-out infinite 4s' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 inline-block"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-2xl rounded-full" style={{ background: 'rgba(139,92,246,0.6)' }} />
                <Image
                  src="/logo.png"
                  alt="GlobeNest"
                  width={120}
                  height={120}
                  className="w-20 h-20 md:w-28 md:h-28 mx-auto relative z-10 logo-blend"
                  priority
                />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-8"
            >
              <div className="gradient-border inline-block">
                <div className="px-6 py-2 rounded-[1.4rem] text-sm font-semibold gradient-text">
                  🌍 London&apos;s #1 Expat Platform
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 text-balance leading-tight">
                <span className="block mb-2 text-white/90">Your New Life in</span>
                <span className="block gradient-text">
                  London Starts Here
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-8 sm:mb-12 max-w-3xl mx-auto text-balance px-4">
                Connect with expats leaving as you arrive. Find housing, flatmates, and everything you need to set up home — all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button className="glow-pulse inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #06B6D4 100%)' }}>
                    Get Started Free
                    <ArrowRight size={22} />
                  </button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button className="glass inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold text-white/80 rounded-2xl border border-white/20 hover:border-white/40 transition-all">
                    Watch Demo
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Hero Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-24 relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: Home, title: 'Find Rooms', desc: 'Swipe to match', gradient: 'from-primary/30 to-primary/5', glow: '#8B5CF6' },
                  { icon: ShoppingBag, title: 'Marketplace', desc: 'Buy & sell easily', gradient: 'from-secondary/30 to-secondary/5', glow: '#22D3EE' },
                  { icon: MessageCircle, title: 'Connect', desc: 'Message securely', gradient: 'from-accent/30 to-accent/5', glow: '#F472B6' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
                    whileHover={{ y: -12 }}
                    className="float"
                    style={{ animationDelay: `${index * 0.6}s` }}
                  >
                    <div className={`glass aspect-[9/14] rounded-3xl p-8 flex flex-col items-center justify-center bg-gradient-to-br ${item.gradient} card-hover-effect`}
                      style={{ boxShadow: `0 20px 60px -10px ${item.glow}40` }}>
                      <div className="relative mb-6">
                        <div className="absolute inset-0 blur-2xl opacity-60 rounded-full" style={{ background: item.glow }} />
                        <item.icon className="w-20 h-20 relative z-10" style={{ color: item.glow }} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-2xl mb-3 text-white">{item.title}</h3>
                      <p className="text-white/60 text-base">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────── */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-3xl p-12 gradient-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${stat.color} border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                  <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM / SOLUTION ────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">

            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-primary rounded-3xl p-10"
            >
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-full text-red-400 text-sm font-semibold mb-6">
                ⚠️ The Problem
              </div>
              <h2 className="text-4xl font-bold mb-8 text-white">
                Relocation Shouldn&apos;t Be This Hard
              </h2>
              <div className="space-y-4 text-white/70 text-base">
                {[
                  'Fragmented platforms (Facebook, Gumtree, SpareRoom)',
                  'No verification = unreliable connections',
                  'High costs for furniture and setup',
                  'Zero community support for expats',
                ].map((problem, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-red-400 mt-0.5 text-xl leading-none">✗</span>
                    {problem}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-secondary rounded-3xl p-10"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full text-emerald-400 text-sm font-semibold mb-6">
                ✓ The Solution
              </div>
              <h2 className="text-4xl font-bold mb-8 text-white">
                Everything in <span className="gradient-text">One Place</span>
              </h2>
              <div className="space-y-4 text-white/70 text-base">
                {[
                  'Single platform for housing, flatmates & marketplace',
                  'Verified profiles with reviews & ratings',
                  'Affordable second-hand items from expats leaving',
                  'Trusted community built for relocators',
                ].map((solution, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
                    {solution}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] gradient-text mb-4">Features</p>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Everything You Need to{' '}
                <span className="gradient-text">Relocate Smart</span>
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto">
                The ultimate toolkit for expats moving to London
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`glass rounded-3xl p-8 h-full card-hover-effect bg-gradient-to-br ${feature.gradient}`}
                  style={{ boxShadow: `0 4px 30px -5px ${feature.glow}` }}>
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 blur-xl opacity-60 rounded-2xl" style={{ background: feature.glow }} />
                    <div className="relative rounded-2xl p-4" style={{ background: `linear-gradient(135deg, ${feature.glow}33, ${feature.glow}11)`, border: `1px solid ${feature.glow}44` }}>
                      <feature.icon className="w-8 h-8" style={{ color: feature.glow }} strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/55 text-base leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle section bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] gradient-text mb-4">How It Works</p>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              From Landing to{' '}
              <span className="gradient-text">Living</span> in 4 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(to right, rgba(139,92,246,0.6), rgba(34,211,238,0.6), rgba(244,114,182,0.6))' }} />

            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass rounded-3xl p-8 text-center h-full card-hover-effect">
                  <div className="relative inline-block mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl glow-pulse`}
                      style={{ '--tw-shadow-color': 'transparent' } as React.CSSProperties}>
                      {step.step}
                    </div>
                  </div>
                  <div className="mb-4">
                    <step.icon className="w-10 h-10 mx-auto text-white/40" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient-fast opacity-80" />
        <div className="absolute inset-0" style={{ backdropFilter: 'blur(80px)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-dark rounded-3xl p-16"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <Globe className="w-20 h-20 mx-auto text-white drop-shadow-2xl" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Ready to Make London Home?
            </h2>
            <p className="text-xl mb-10 text-white/70 max-w-2xl mx-auto">
              Join thousands of expats who&apos;ve already found their perfect place with GlobeNest
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glow-pulse inline-flex items-center gap-3 px-12 py-5 text-lg font-bold text-white rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)' }}
              >
                Start Your Journey
                <ArrowRight size={22} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass inline-flex items-center px-12 py-5 text-lg font-semibold text-white rounded-2xl border border-white/20 hover:border-white/40 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────── */}
      <footer className="glass-dark text-white py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.png" alt="GlobeNest Logo" width={48} height={48} className="w-10 h-10 logo-blend" />
                <div className="text-2xl font-bold gradient-text">GlobeNest</div>
              </div>
              <p className="text-white/50 text-sm">Connect. Relocate. Thrive.</p>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white/90">Product</h4>
              <ul className="space-y-3 text-white/50 text-sm">
                {[['Find Rooms', '/rooms'], ['Marketplace', '/marketplace'], ['How It Works', '/how-it-works']].map(([label, href]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white/90">Company</h4>
              <ul className="space-y-3 text-white/50 text-sm">
                {[['About Us', '/about'], ['Blog', '/blog'], ['Careers', '/careers']].map(([label, href]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white/90">Support</h4>
              <ul className="space-y-3 text-white/50 text-sm">
                {[['Help Center', '/help'], ['Safety', '/safety'], ['Contact', '/contact']].map(([label, href]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-white/30 text-sm">
            <p>© 2024 GlobeNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
