-- Homepage testimonials / Google reviews (admin-managed)
-- Run in the Supabase SQL editor after 010_pricing.sql.

create table if not exists public.yogmandu_testimonials (
  id            text        primary key,
  name          text        not null default '',
  stars         integer     not null default 5,
  status        text        not null default 'Active',
  display_order integer     not null default 0,
  data          jsonb       not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists yogmandu_testimonials_order_idx
  on public.yogmandu_testimonials(display_order asc, created_at asc);

alter table public.yogmandu_testimonials enable row level security;

-- Seed with the real Google reviews (no-op if rows already exist).
insert into public.yogmandu_testimonials (id, name, stars, status, display_order, data) values
  ($$rev-shraddha-timalsena$$, $$Shraddha Timalsena$$, 5, 'Active', 0, $${"id": "rev-shraddha-timalsena", "quote": "Yogmandu Yoga is a beautiful, calming space with incredible instructors who truly care. Every class feels grounding and uplifting. It's the perfect place to reconnect with yourself and your practice.", "name": "Shraddha Timalsena", "when": "a year ago", "stars": 5, "color": "#F7941D", "status": "Active", "displayOrder": 0}$$::jsonb),
  ($$rev-george-h$$, $$George H.$$, 5, 'Active', 1, $${"id": "rev-george-h", "quote": "Absolutely fantastic experience! The yoga teachers create a welcoming environment. Their expertise and guidance in each session helped me improve my flexibility and overall well-being. If you're in Kathmandu and seeking a yoga experience, Yogmandu is the place to be.", "name": "George H.", "when": "2 years ago", "stars": 5, "color": "#6B2D8B", "status": "Active", "displayOrder": 1}$$::jsonb),
  ($$rev-love-thakur$$, $$Love Thakur$$, 5, 'Active', 2, $${"id": "rev-love-thakur", "quote": "I've been practicing yoga for years, but my sessions at Yogmandu Yoga have taken my practice to a whole new level. The instructors are incredibly knowledgeable and attentive, ensuring that each pose is performed correctly and safely.", "name": "Love Thakur", "when": "a year ago", "stars": 5, "color": "#8DC63F", "status": "Active", "displayOrder": 2}$$::jsonb),
  ($$rev-rinku-thakur$$, $$Rinku Thakur$$, 5, 'Active', 3, $${"id": "rev-rinku-thakur", "quote": "The space is beautifully designed with soft lighting, peaceful music, and a warm, inviting vibe that made me feel comfortable immediately. The staff was friendly and knowledgeable, and the instructors were truly outstanding.", "name": "Rinku Thakur", "when": "a year ago", "stars": 5, "color": "#F7941D", "status": "Active", "displayOrder": 3}$$::jsonb),
  ($$rev-babita-kc$$, $$Babita Kc$$, 5, 'Active', 4, $${"id": "rev-babita-kc", "quote": "Yogmandu is a truly peaceful and energizing space where I always feel a sense of positivity and calm. Practicing yoga here has helped me both physically and mentally. I leave every session feeling refreshed and balanced.", "name": "Babita Kc", "when": "a year ago", "stars": 5, "color": "#6B2D8B", "status": "Active", "displayOrder": 4}$$::jsonb),
  ($$rev-sunita-rai$$, $$Sunita Rai$$, 5, 'Active', 5, $${"id": "rev-sunita-rai", "quote": "As a beginner, I was nervous to join yoga class due to my health condition at that time, but with the help, efforts and fully positive supportive instructors I was able to complete the course. The place is wonderful and located in a peaceful environment.", "name": "Sunita Rai", "when": "a year ago", "stars": 5, "color": "#8DC63F", "status": "Active", "displayOrder": 5}$$::jsonb),
  ($$rev-sunaina-deoju$$, $$Sunaina Deoju$$, 5, 'Active', 6, $${"id": "rev-sunaina-deoju", "quote": "The best part of my yoga journey with Yogmandu is the peaceful and friendly environment. The teachers are very kind, cooperative and humble. I am so blessed to be part of this organization.", "name": "Sunaina Deoju", "when": "a year ago", "stars": 5, "color": "#F7941D", "status": "Active", "displayOrder": 6}$$::jsonb),
  ($$rev-dipika-shrestha$$, $$Dipika Shrestha$$, 5, 'Active', 7, $${"id": "rev-dipika-shrestha", "quote": "Yogmandu is filled with positivity and offers wonderful guidance. I will always be thankful to each and every teacher, as well as the receptionist for being so kind.", "name": "Dipika Shrestha", "when": "a year ago", "stars": 5, "color": "#6B2D8B", "status": "Active", "displayOrder": 7}$$::jsonb),
  ($$rev-smriti-kafle$$, $$Smriti Kafle$$, 5, 'Active', 8, $${"id": "rev-smriti-kafle", "quote": "Best experience at Yogmandu's yoga. Specially the tratak meditation makes you a completely different person, so I suggest you go through it.", "name": "Smriti Kafle", "when": "9 months ago", "stars": 5, "color": "#8DC63F", "status": "Active", "displayOrder": 8}$$::jsonb)
on conflict (id) do nothing;
