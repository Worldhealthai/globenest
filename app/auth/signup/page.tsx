'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, MapPin, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    userType: 'arriving' as 'arriving' | 'leaving',
  })

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic
    console.log('Signup:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card padding="lg" className="shadow-hard">
            <div className="mb-8">
              <a href="/" className="inline-block mb-4">
                <h1 className="text-3xl font-bold">
                  <span className="text-primary">Globe</span>
                  <span className="text-secondary">Nest</span>
                </h1>
              </a>
              <h2 className="text-3xl font-bold mb-2">Join GlobeNest</h2>
              <p className="text-gray-600">
                Start your relocation journey today
              </p>
            </div>

            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'arriving' })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.userType === 'arriving'
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">✈️</div>
                  <div className="font-semibold">Arriving</div>
                  <div className="text-xs text-gray-600">Moving to London</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'leaving' })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.userType === 'leaving'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="font-semibold">Leaving</div>
                  <div className="text-xs text-gray-600">Departing London</div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                icon={<User size={18} />}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={<Mail size={18} />}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                icon={<Lock size={18} />}
                required
              />

              <Input
                label="Current/Target Location in London"
                type="text"
                placeholder="e.g., Camden, Shoreditch"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                icon={<MapPin size={18} />}
              />

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <Button type="submit" fullWidth size="lg">
                Create Account
                <ArrowRight className="ml-2" size={20} />
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" fullWidth>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button type="button" variant="outline" fullWidth>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-gray-600">
              Already have an account?{' '}
              <a href="/auth/login" className="text-primary font-semibold hover:underline">
                Log in
              </a>
            </div>
          </Card>
        </motion.div>

        {/* Right Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-bold mb-4">
                Your London Journey
                <br />
                <span className="text-secondary">Starts Here</span>
              </h3>
              <p className="text-xl text-gray-600">
                Join thousands of expats who've found their perfect place
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">Verified Community</div>
                    <div className="text-sm text-gray-600">All users verified for safety</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">Smart Matching</div>
                    <div className="text-sm text-gray-600">AI-powered room & flatmate matches</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">Save Money</div>
                    <div className="text-sm text-gray-600">Affordable furniture & essentials</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
