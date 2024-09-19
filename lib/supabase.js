import 'react-native-url-polyfill/auto'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dwrccskggthsjpvvudgs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3cmNjc2tnZ3Roc2pwdnZ1ZGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2ODkwODYsImV4cCI6MjA0MjI2NTA4Nn0.h65M74lE_lwPsIb26tfhGBeFMny_SXKTPozvIkfJx6Q"


// real DB is this comment using test DB above 
// const supabaseUrl = "https://enkusmhrgphzpvbcpnfi.supabase.co"
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVua3VzbWhyZ3BoenB2YmNwbmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2Mzk5MzksImV4cCI6MjA0MjIxNTkzOX0.oPlBv7H_inz6b-_ZrBcwz8SIee6Eb-xWvFN5thq2GdE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})