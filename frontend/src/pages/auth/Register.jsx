import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import companyLogo from '../../assets/company-logo.jpg';

const Register = () => {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm_password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm_password) {
      return setError('Passwords do not match.');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.full_name } },
      });
      if (signUpError) throw signUpError;
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl border border-border bg-surface flex items-center justify-center p-1 shadow-lg">
              <img src={companyLogo} alt="Company Logo" className="w-full h-full object-contain rounded-xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-textMain">Create an account</h1>
          <p className="text-textMuted text-sm mt-1">Join the Inventory & Sales Management System</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-xl">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-textMain">Registration Successful!</h3>
              <p className="text-sm text-textMuted">Check your email to verify your account. Redirecting to login...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 flex items-start space-x-3 p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-textMain mb-2">Full Name</label>
                  <input
                    name="full_name" type="text" placeholder="Abebe Ketema"
                    value={form.full_name} onChange={handleChange} required
                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMain mb-2">Email Address</label>
                  <input
                    name="email" type="email" placeholder="you@company.com"
                    value={form.email} onChange={handleChange} required
                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMain mb-2">Password</label>
                  <div className="relative">
                    <input
                      name="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
                      value={form.password} onChange={handleChange} required
                      className="w-full bg-background border border-border rounded-xl py-3 px-4 pr-12 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted hover:text-textMain transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMain mb-2">Confirm Password</label>
                  <input
                    name="confirm_password" type="password" placeholder="Re-enter password"
                    value={form.confirm_password} onChange={handleChange} required
                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 mt-2">
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Creating account...</span></>
                  ) : (
                    <><UserPlus className="w-4 h-4" /><span>Create Account</span></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-textMuted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Sign In</Link>
        </p>
        <p className="text-center text-xs text-textMuted mt-2">
          &copy; 2025 Inventory & Sales Management System
        </p>
      </div>
    </div>
  );
};

export default Register;
