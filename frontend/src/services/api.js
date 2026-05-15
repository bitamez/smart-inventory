import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallback to placeholder values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key-replace-with-real-key'

// Check if Supabase is properly configured
const isSupabaseConfigured = 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder-anon-key-replace-with-real-key' &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')

// Log configuration status
if (!isSupabaseConfigured) {
  console.warn(
    '%c⚠️ Supabase Configuration Required',
    'color: orange; font-size: 14px; font-weight: bold;'
  )
  console.warn(
    '%cThe app is running with placeholder Supabase credentials.\n' +
    'To enable full functionality:\n\n' +
    '1. Create a Supabase project at https://supabase.com\n' +
    '2. Get your credentials from: https://app.supabase.com/project/_/settings/api\n' +
    '3. Update the .env file in the frontend directory with:\n' +
    '   VITE_SUPABASE_URL=your-project-url\n' +
    '   VITE_SUPABASE_ANON_KEY=your-anon-key\n' +
    '4. Restart the development server\n',
    'color: orange;'
  )
}

// Create Supabase client with placeholder values (won't crash but won't work either)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export configuration status for other modules to check
export const isConfigured = isSupabaseConfigured

export const handleError = (error) => {
  console.error('API Error:', error)
  
  // Provide helpful message if Supabase is not configured
  if (!isSupabaseConfigured && error.message) {
    return {
      error: 'Supabase is not configured. Please check the console for setup instructions.',
      data: null
    }
  }
  
  return {
    error: error.message || 'An unexpected error occurred',
    data: null
  }
}
