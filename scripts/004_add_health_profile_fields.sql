-- Add health profile fields to profiles table
alter table public.profiles
add column if not exists sex text check (sex in ('male', 'female', 'other')),
add column if not exists age integer check (age >= 18 and age <= 120),
add column if not exists smoker boolean default false,
add column if not exists hypertension boolean default false,
add column if not exists family_history boolean,
add column if not exists medical_history text;

-- Create risk_assessments table for AI predictions
create table if not exists public.risk_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  risk_level text not null check (risk_level in ('low', 'medium', 'high', 'critical')),
  risk_percentage decimal(5,2) not null check (risk_percentage >= 0 and risk_percentage <= 100),
  factors jsonb not null,
  recommendations text[],
  assessed_at timestamp with time zone not null default now(),
  created_at timestamp with time zone default now()
);

-- Create anomaly_detections table for pattern detection
create table if not exists public.anomaly_detections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  anomaly_type text not null check (anomaly_type in ('arrhythmia', 'tachycardia', 'bradycardia', 'irregular_pattern')),
  bpm_at_detection integer not null,
  confidence_score decimal(5,2) not null check (confidence_score >= 0 and confidence_score <= 100),
  description text not null,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  action_taken text,
  detected_at timestamp with time zone not null default now(),
  created_at timestamp with time zone default now()
);

-- Create indexes
create index if not exists idx_risk_assessments_user_assessed on public.risk_assessments(user_id, assessed_at desc);
create index if not exists idx_anomaly_detections_user_detected on public.anomaly_detections(user_id, detected_at desc);

-- Enable RLS
alter table public.risk_assessments enable row level security;
alter table public.anomaly_detections enable row level security;

-- RLS Policies for risk_assessments
create policy "Users can view their own risk assessments"
  on public.risk_assessments for select
  using (auth.uid() = user_id);

create policy "Users can insert their own risk assessments"
  on public.risk_assessments for insert
  with check (auth.uid() = user_id);

-- RLS Policies for anomaly_detections
create policy "Users can view their own anomaly detections"
  on public.anomaly_detections for select
  using (auth.uid() = user_id);

create policy "Users can insert their own anomaly detections"
  on public.anomaly_detections for insert
  with check (auth.uid() = user_id);
