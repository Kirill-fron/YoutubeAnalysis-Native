import { AppState, Platform } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ''

const customStorage = Platform.select({
  web: {
    getItem: (key: string) => {
      try {
        return Promise.resolve(localStorage.getItem(key))
      } catch {
        return Promise.resolve(null)
      }
    },
    setItem: (key: string, value: string) => {
      try {
        localStorage.setItem(key, value)
        return Promise.resolve()
      } catch {
        return Promise.resolve()
      }
    },
    removeItem: (key: string) => {
      try {
        localStorage.removeItem(key)
        return Promise.resolve()
      } catch {
        return Promise.resolve()
      }
    },
  },
  default: AsyncStorage,
})


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customStorage,
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