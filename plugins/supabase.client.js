import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY = '<YOUR-KEY>'
export default ({ app }, inject) => {
  const supabaseUrl = 'https://gahabcozujgypflnezml.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhaGFiY296dWpneXBmbG5lem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MzA2NzcsImV4cCI6MjAyMTQwNjY3N30.7ssxqlGdJh6uWyOCu77M5SyV9PBMIEdyeG4i5ZGsDs4'
  const supabase = createClient(supabaseUrl, supabaseKey)

  inject('supabase', supabase)
}