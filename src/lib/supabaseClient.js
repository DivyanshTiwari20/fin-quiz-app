import { createClient } from "@supabase/supabase-js";

const superbaseUrl='https://jbcilbwocgzmoajscpzd.supabase.co';

const superbaseAnonKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiY2lsYndvY2d6bW9hanNjcHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NDE4NDksImV4cCI6MjA2NDUxNzg0OX0.qPUpWB_FmZCvEFNwICR97-J5LNWfSEhEa0xnwILS-7w';

export const superbase= createClient(superbaseUrl,superbaseAnonKey )