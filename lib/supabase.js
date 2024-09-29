import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xyzwrvzugwgwynliyyzj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5endydnp1Z3dnd3lubGl5eXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5OTEyMTksImV4cCI6MjA0MjU2NzIxOX0.RPxzichJIYxm4XSwPKsmhZXe_mSTkKifnlzDAKg6AmE"


// const supabaseUrl = "https://dwrccskggthsjpvvudgs.supabase.co"
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3cmNjc2tnZ3Roc2pwdnZ1ZGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2ODkwODYsImV4cCI6MjA0MjI2NTA4Nn0.h65M74lE_lwPsIb26tfhGBeFMny_SXKTPozvIkfJx6Q"

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