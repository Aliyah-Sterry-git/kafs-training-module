import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jyhthsqxvcmdmrclrecn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5aHRoc3F4dmNtZG1yY2xyZWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzOTYzODIsImV4cCI6MjA4Mzk3MjM4Mn0.gdpzqS0mhbZif9saTBIwLYNqyNFZ5GSJTQshv2SIcT8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
