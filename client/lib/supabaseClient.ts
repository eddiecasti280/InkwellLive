import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsvrkioetizbiyqcqssw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdnJraW9ldGl6Yml5cWNxc3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTI3OTYsImV4cCI6MjA2ODIyODc5Nn0.vv2TbnNY-mNilD9ONlvPjZ-xasncd4M192asSiZedWs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);