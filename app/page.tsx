'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Home, ShoppingBag, MessageCircle, Shield, Users, Zap, Globe, Heart, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function LandingPage() {
  const features = [
    {
      icon: Home,
      title: 'Smart Room Matching',
      description: 'Swipe through verified rooms and flatmates. Match based on lifestyle, budget, and location preferences.',
      color: 'text-primary',
    },
    {
      icon: ShoppingBag,
      title: 'Instant Marketplace',
      description: 'Buy and sell furniture, appliances, and essentials. Connect with expats leaving and arriving.',
      color: 'text-secondary',
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'Chat directly with matches. Schedule viewings, negotiate prices, and build trust before meeting.',
      color: 'text-accent',
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'Every user is verified. Review system ensures reliability and builds a trustworthy community.',
      color: 'text-primary',
    },
    {
      icon: Users,
      title: 'Expat Community',
      description: 'Connect with people who understand your journey. Share tips, experiences, and make friends.',
      color: 'text-secondary',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Find what you need in minutes, not weeks. Our smart algorithm connects the right people instantly.',
      color: 'text-accent',
    },
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Create Your Profile',
      description: 'Tell us about yourself, your move date, and what you\'re looking for.',
    },
    {
      step: 2,
      title: 'Browse & Match',
      description: 'Swipe through rooms, flatmates, and marketplace items tailored to your needs.',
    },
    {
      step: 3,
      title: 'Connect & Arrange',
      description: 'Message matches, schedule viewings, and finalize your relocation plans.',
    },
    {
      step: 4,
      title: 'Move In & Thrive',
      description: 'Settle into your new home with everything you need, backed by our community.',
    },
  ]

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '5K+', label: 'Successful Matches' },
    { value: '£2M+', label: 'Items Traded' },
    { value: '4.9/5', label: 'User Rating' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-secondary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-6">
                🌍 London's #1 Expat Platform
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
                Your New Life in London
                <br />
                <span className="text-primary">Starts Here</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
                Connect with expats leaving as you arrive. Find housing, flatmates, and everything you need to set up home—all in one trusted platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" onClick={() => {}}>
                  Get Started Free
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => {}}>
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            {/* Hero Image/Illustration Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 relative"
            >
              <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 shadow-hard">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Mock App Screenshots */}
                  <Card hover padding="sm" className="aspect-[9/16] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Home className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <h3 className="font-bold mb-2">Find Rooms</h3>
                      <p className="text-sm text-gray-600">Swipe to match</p>
                    </div>
                  </Card>
                  <Card hover padding="sm" className="aspect-[9/16] bg-gradient-to-br from-secondary/5 to-secondary/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-secondary" />
                      <h3 className="font-bold mb-2">Marketplace</h3>
                      <p className="text-sm text-gray-600">Buy & sell easily</p>
                    </div>
                  </Card>
                  <Card hover padding="sm" className="aspect-[9/16] bg-gradient-to-br from-accent/5 to-accent/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 text-accent" />
                      <h3 className="font-bold mb-2">Connect</h3>
                      <p className="text-sm text-gray-600">Message securely</p>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="warning" className="mb-4">The Problem</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Relocation Shouldn't Be This Hard
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Fragmented platforms (Facebook, Gumtree, SpareRoom)
                </p>
                <p className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  No verification = unreliable connections
                </p>
                <p className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  High costs for furniture and setup
                </p>
                <p className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Zero community support for expats
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="success" className="mb-4">The Solution</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Everything in <span className="text-primary">One Place</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0" size={20} />
                  Single platform for housing, flatmates & marketplace
                </p>
                <p className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0" size={20} />
                  Verified profiles with reviews & ratings
                </p>
                <p className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0" size={20} />
                  Affordable second-hand items from expats leaving
                </p>
                <p className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0" size={20} />
                  Trusted community built for relocators
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="text-secondary">Relocate Smart</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built the ultimate toolkit for expats moving to London
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover padding="lg" className="h-full">
                  <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              From Landing to <span className="text-primary">Living</span> in 4 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -ml-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make London Home?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of expats who've already found their perfect place with GlobeNest
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" onClick={() => {}}>
                Start Your Journey
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => {}} className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-primary">Globe</span>
                <span className="text-secondary">Nest</span>
              </div>
              <p className="text-gray-400">
                Connect. Relocate. Thrive.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/rooms" className="hover:text-white">Find Rooms</a></li>
                <li><a href="/marketplace" className="hover:text-white">Marketplace</a></li>
                <li><a href="/how-it-works" className="hover:text-white">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-white">Help Center</a></li>
                <li><a href="/safety" className="hover:text-white">Safety</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GlobeNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
