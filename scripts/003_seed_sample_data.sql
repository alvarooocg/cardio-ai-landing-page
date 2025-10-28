-- This script seeds sample data for testing purposes
-- Note: This will only work after a user has signed up and confirmed their email

-- Insert sample heart rate measurements for the last 7 days
-- Replace 'YOUR_USER_ID' with actual user ID after signup
-- This is just example data structure - actual seeding should be done after user creation

-- Example of how data would be inserted (commented out as it needs a real user_id):
/*
insert into public.heart_rate_measurements (user_id, bpm, measured_at, status) values
  (auth.uid(), 72, now() - interval '7 days', 'normal'),
  (auth.uid(), 75, now() - interval '6 days', 'normal'),
  (auth.uid(), 68, now() - interval '5 days', 'normal'),
  (auth.uid(), 82, now() - interval '4 days', 'normal'),
  (auth.uid(), 78, now() - interval '3 days', 'normal'),
  (auth.uid(), 95, now() - interval '2 days', 'warning'),
  (auth.uid(), 88, now() - interval '1 day', 'normal'),
  (auth.uid(), 74, now(), 'normal');

insert into public.suggestions (user_id, category, title, description, impact, time_estimate) values
  (auth.uid(), 'exercise', 'Morning Walk', 'Start your day with a 20-minute walk to improve cardiovascular health', 'high', '20 min'),
  (auth.uid(), 'nutrition', 'Increase Fiber Intake', 'Add more whole grains and vegetables to your diet', 'medium', '5 min'),
  (auth.uid(), 'sleep', 'Consistent Sleep Schedule', 'Go to bed and wake up at the same time every day', 'high', '0 min'),
  (auth.uid(), 'hydration', 'Drink More Water', 'Aim for 8 glasses of water throughout the day', 'medium', '2 min');
*/

-- Note: Actual data seeding will be done through the application after user authentication
