-- Create profiles table for user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create heart_rate_measurements table for BPM data
create table if not exists public.heart_rate_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  bpm integer not null check (bpm >= 30 and bpm <= 250),
  measured_at timestamp with time zone not null default now(),
  status text not null check (status in ('normal', 'warning', 'danger')),
  created_at timestamp with time zone default now()
);

-- Create alerts table for health alerts
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  alert_type text not null check (alert_type in ('high_bpm', 'low_bpm', 'irregular', 'emergency')),
  bpm integer not null,
  message text not null,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  acknowledged boolean default false,
  created_at timestamp with time zone default now()
);

-- Create suggestions table for personalized health recommendations
create table if not exists public.suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('exercise', 'nutrition', 'sleep', 'hydration', 'breathing', 'stress')),
  title text not null,
  description text not null,
  impact text not null check (impact in ('low', 'medium', 'high')),
  time_estimate text not null,
  completed boolean default false,
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

-- Create indexes for better query performance
create index if not exists idx_heart_rate_user_measured on public.heart_rate_measurements(user_id, measured_at desc);
create index if not exists idx_alerts_user_created on public.alerts(user_id, created_at desc);
create index if not exists idx_suggestions_user_category on public.suggestions(user_id, category);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.heart_rate_measurements enable row level security;
alter table public.alerts enable row level security;
alter table public.suggestions enable row level security;

-- RLS Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- RLS Policies for heart_rate_measurements
create policy "Users can view their own measurements"
  on public.heart_rate_measurements for select
  using (auth.uid() = user_id);

create policy "Users can insert their own measurements"
  on public.heart_rate_measurements for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own measurements"
  on public.heart_rate_measurements for update
  using (auth.uid() = user_id);

create policy "Users can delete their own measurements"
  on public.heart_rate_measurements for delete
  using (auth.uid() = user_id);

-- RLS Policies for alerts
create policy "Users can view their own alerts"
  on public.alerts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own alerts"
  on public.alerts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own alerts"
  on public.alerts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own alerts"
  on public.alerts for delete
  using (auth.uid() = user_id);

-- RLS Policies for suggestions
create policy "Users can view their own suggestions"
  on public.suggestions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own suggestions"
  on public.suggestions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own suggestions"
  on public.suggestions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own suggestions"
  on public.suggestions for delete
  using (auth.uid() = user_id);
