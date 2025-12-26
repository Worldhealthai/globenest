'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Home, ShoppingBag, MessageCircle, Shield, Users, Zap, Globe, Heart, CheckCircle2, Sparkles, TrendingUp, Award } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
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
      gradient: 'from-primary/20 via-primary/10 to-transparent',
    },
    {
      icon: ShoppingBag,
      title: 'Instant Marketplace',
      description: 'Buy and sell furniture, appliances, and essentials. Connect with expats leaving and arriving.',
      gradient: 'from-secondary/20 via-secondary/10 to-transparent',
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'Chat directly with matches. Schedule viewings, negotiate prices, and build trust before meeting.',
      gradient: 'from-accent/30 via-accent/15 to-transparent',
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'Every user is verified. Review system ensures reliability and builds a trustworthy community.',
      gradient: 'from-primary/20 via-primary/10 to-transparent',
    },
    {
      icon: Users,
      title: 'Expat Community',
      description: 'Connect with people who understand your journey. Share tips, experiences, and make friends.',
      gradient: 'from-secondary/20 via-secondary/10 to-transparent',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Find what you need in minutes, not weeks. Our smart algorithm connects the right people instantly.',
      gradient: 'from-accent/30 via-accent/15 to-transparent',
    },
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Create Your Profile',
      description: 'Tell us about yourself, your move date, and what you\'re looking for.',
      icon: Sparkles,
    },
    {
      step: 2,
      title: 'Browse & Match',
      description: 'Swipe through rooms, flatmates, and marketplace items tailored to your needs.',
      icon: Heart,
    },
    {
      step: 3,
      title: 'Connect & Arrange',
      description: 'Message matches, schedule viewings, and finalize your relocation plans.',
      icon: MessageCircle,
    },
    {
      step: 4,
      title: 'Move In & Thrive',
      description: 'Settle into your new home with everything you need, backed by our community.',
      icon: Award,
    },
  ]

  const stats = [
    { value: '10K+', label: 'Active Users', icon: Users },
    { value: '5K+', label: 'Successful Matches', icon: Heart },
    { value: '£2M+', label: 'Items Traded', icon: TrendingUp },
    { value: '4.9/5', label: 'User Rating', icon: Award },
  ]

  return (
    <div className="hidden md:block min-h-screen mesh-gradient overflow-hidden">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Floating orbs background - hidden on mobile, subtle on desktop */}
        <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="hidden md:block absolute top-40 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />
        <div className="hidden md:block absolute bottom-20 left-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-20"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 inline-block"
              >
                <Image
                  src="/logo.png"
                  alt="GlobeNest"
                  width={120}
                  height={120}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 mx-auto drop-shadow-2xl"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block mb-8"
              >
                <Badge variant="secondary" className="glass-secondary px-6 py-2 text-base">
                  🌍 London's #1 Expat Platform
                </Badge>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-6 sm:mb-8 text-balance leading-tight relative z-30 text-gray-900">
                <span className="block mb-2">Your New Life in</span>
                <span className="block text-primary">
                  London Starts Here
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto text-balance px-4">
                Connect with expats leaving as you arrive. Find housing, flatmates, and everything you need to set up home.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="glow-pulse px-10 py-6 text-lg" onClick={() => {}}>
                    Get Started Free
                    <ArrowRight className="ml-3" size={24} />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" className="glass px-10 py-6 text-lg border-2" onClick={() => {}}>
                    Watch Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Hero Cards - App Preview */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-20 relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  { icon: Home, title: 'Find Rooms', desc: 'Swipe to match', color: 'primary', gradient: 'from-primary/30 to-primary/5' },
                  { icon: ShoppingBag, title: 'Marketplace', desc: 'Buy & sell easily', color: 'secondary', gradient: 'from-secondary/30 to-secondary/5' },
                  { icon: MessageCircle, title: 'Connect', desc: 'Message securely', color: 'accent', gradient: 'from-accent/40 to-accent/5' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="float"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div className={`glass aspect-[9/16] rounded-3xl p-8 flex flex-col items-center justify-center bg-gradient-to-br ${item.gradient} card-hover-effect`}>
                      <div className="relative mb-6">
                        <div className={`absolute inset-0 bg-${item.color} blur-2xl opacity-50 rounded-full`} />
                        <item.icon className={`w-20 h-20 text-${item.color} relative z-10`} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-2xl mb-3">{item.title}</h3>
                      <p className="text-gray-600 text-lg">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-12 backdrop-blur-xl">
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
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-primary rounded-3xl p-10"
            >
              <Badge variant="warning" className="mb-6 text-lg px-4 py-2">⚠️ The Problem</Badge>
              <h2 className="text-5xl font-bold mb-8">
                Relocation Shouldn't Be This Hard
              </h2>
              <div className="space-y-5 text-gray-700 text-lg">
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
                    className="flex items-start"
                  >
                    <span className="text-red-500 mr-3 text-2xl">✗</span>
                    {problem}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-secondary rounded-3xl p-10"
            >
              <Badge variant="success" className="mb-6 text-lg px-4 py-2">✓ The Solution</Badge>
              <h2 className="text-5xl font-bold mb-8">
                Everything in <span className="text-primary">One Place</span>
              </h2>
              <div className="space-y-5 text-gray-700 text-lg">
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
                    className="flex items-start"
                  >
                    <CheckCircle2 className="text-green-500 mr-3 flex-shrink-0 mt-1" size={24} />
                    {solution}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">Features</p>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Everything You Need to Relocate Smart
              </h2>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                The ultimate toolkit for expats moving to London
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`glass rounded-3xl p-8 h-full card-hover-effect bg-gradient-to-br ${feature.gradient} backdrop-blur-xl`}>
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-xl opacity-40 rounded-full" />
                    <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                      <feature.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">How It Works</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              From Landing to <span className="text-primary">Living</span> in 4 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />

            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass rounded-3xl p-8 text-center h-full card-hover-effect backdrop-blur-xl">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-xl opacity-50" />
                    <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                      {step.step}
                    </div>
                  </div>
                  <div className="mb-4">
                    <step.icon className="w-12 h-12 mx-auto text-secondary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient-fast opacity-90" />
        <div className="absolute inset-0 backdrop-blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-dark rounded-3xl p-16 backdrop-blur-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <Globe className="w-24 h-24 mx-auto text-white drop-shadow-2xl" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
              Ready to Make London Home?
            </h2>
            <p className="text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
              Join thousands of expats who've already found their perfect place with GlobeNest
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" className="px-12 py-6 text-xl shadow-2xl" onClick={() => {}}>
                  Start Your Journey
                  <ArrowRight className="ml-3" size={24} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="glass border-white/30 text-white hover:bg-white/20 px-12 py-6 text-xl backdrop-blur-xl" onClick={() => {}}>
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-dark text-white py-16 px-4 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="GlobeNest Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <div className="text-3xl font-bold">
                  <span className="text-primary">Globe</span>
                  <span className="text-secondary">Nest</span>
                </div>
              </div>
              <p className="text-white/70 text-lg">
                Connect. Relocate. Thrive.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Product</h4>
              <ul className="space-y-3 text-white/70 text-lg">
                <li><a href="/rooms" className="hover:text-white transition-colors">Find Rooms</a></li>
                <li><a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Company</h4>
              <ul className="space-y-3 text-white/70 text-lg">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Support</h4>
              <ul className="space-y-3 text-white/70 text-lg">
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/safety" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-lg">
            <p>&copy; 2024 GlobeNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
