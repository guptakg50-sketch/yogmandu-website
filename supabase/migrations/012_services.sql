-- "Our services" grid (About page) — admin-managed label + link per item.
-- Run in the Supabase SQL editor after 011_testimonials.sql.

create table if not exists public.yogmandu_services (
  id            text        primary key,
  label         text        not null default '',
  href          text        not null default '',
  status        text        not null default 'Active',
  display_order integer     not null default 0,
  data          jsonb       not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists yogmandu_services_order_idx
  on public.yogmandu_services(display_order asc, created_at asc);

alter table public.yogmandu_services enable row level security;

-- Seed with the current 21 services, each linked to its closest page
-- (yoga styles → schedule, 200/300/500 → teacher training, sound → sound
--  healing, the rest → the full Services page). No-op if rows already exist.
insert into public.yogmandu_services (id, label, href, status, display_order, data) values
  ($$svc-hatha-yoga$$,            $$Hatha Yoga Classes$$,                        $$/class-schedule$$,        'Active', 0,  $${"id":"svc-hatha-yoga","label":"Hatha Yoga Classes","href":"/class-schedule","status":"Active","displayOrder":0}$$::jsonb),
  ($$svc-vinyasa-yoga$$,         $$Vinyasa Yoga$$,                              $$/class-schedule$$,        'Active', 1,  $${"id":"svc-vinyasa-yoga","label":"Vinyasa Yoga","href":"/class-schedule","status":"Active","displayOrder":1}$$::jsonb),
  ($$svc-power-yoga$$,           $$Power Yoga$$,                                $$/class-schedule$$,        'Active', 2,  $${"id":"svc-power-yoga","label":"Power Yoga","href":"/class-schedule","status":"Active","displayOrder":2}$$::jsonb),
  ($$svc-ashtanga-yoga$$,        $$Ashtanga Yoga$$,                             $$/class-schedule$$,        'Active', 3,  $${"id":"svc-ashtanga-yoga","label":"Ashtanga Yoga","href":"/class-schedule","status":"Active","displayOrder":3}$$::jsonb),
  ($$svc-sanatan-yoga$$,         $$Sanatan Yoga$$,                              $$/class-schedule$$,        'Active', 4,  $${"id":"svc-sanatan-yoga","label":"Sanatan Yoga","href":"/class-schedule","status":"Active","displayOrder":4}$$::jsonb),
  ($$svc-meditation$$,           $$Meditation Classes$$,                        $$/class-schedule$$,        'Active', 5,  $${"id":"svc-meditation","label":"Meditation Classes","href":"/class-schedule","status":"Active","displayOrder":5}$$::jsonb),
  ($$svc-200hr-ytt$$,            $$200hr Yoga Teacher Training$$,               $$/yoga-teacher-training$$, 'Active', 6,  $${"id":"svc-200hr-ytt","label":"200hr Yoga Teacher Training","href":"/yoga-teacher-training","status":"Active","displayOrder":6}$$::jsonb),
  ($$svc-300hr-advanced$$,       $$300hr Advanced Training$$,                   $$/yoga-teacher-training$$, 'Active', 7,  $${"id":"svc-300hr-advanced","label":"300hr Advanced Training","href":"/yoga-teacher-training","status":"Active","displayOrder":7}$$::jsonb),
  ($$svc-500hr-master$$,         $$500hr Master Training$$,                     $$/yoga-teacher-training$$, 'Active', 8,  $${"id":"svc-500hr-master","label":"500hr Master Training","href":"/yoga-teacher-training","status":"Active","displayOrder":8}$$::jsonb),
  ($$svc-sound-healing-therapy$$,$$Sound Healing Therapy$$,                     $$/sound-healing-therapy$$, 'Active', 9,  $${"id":"svc-sound-healing-therapy","label":"Sound Healing Therapy","href":"/sound-healing-therapy","status":"Active","displayOrder":9}$$::jsonb),
  ($$svc-sound-healing-cert$$,   $$Sound Healing Certification (Level I & II)$$,$$/sound-healing-therapy$$, 'Active', 10, $${"id":"svc-sound-healing-cert","label":"Sound Healing Certification (Level I & II)","href":"/sound-healing-therapy","status":"Active","displayOrder":10}$$::jsonb),
  ($$svc-pranayama$$,            $$Pranayama & Breathwork$$,                    $$/class-schedule$$,        'Active', 11, $${"id":"svc-pranayama","label":"Pranayama & Breathwork","href":"/class-schedule","status":"Active","displayOrder":11}$$::jsonb),
  ($$svc-yoga-therapy$$,         $$Yoga Therapy$$,                              $$/services$$,              'Active', 12, $${"id":"svc-yoga-therapy","label":"Yoga Therapy","href":"/services","status":"Active","displayOrder":12}$$::jsonb),
  ($$svc-virtual-live$$,         $$Virtual Live Yoga Classes$$,                 $$/services$$,              'Active', 13, $${"id":"svc-virtual-live","label":"Virtual Live Yoga Classes","href":"/services","status":"Active","displayOrder":13}$$::jsonb),
  ($$svc-private-corporate$$,    $$Private & Corporate Yoga$$,                  $$/services$$,              'Active', 14, $${"id":"svc-private-corporate","label":"Private & Corporate Yoga","href":"/services","status":"Active","displayOrder":14}$$::jsonb),
  ($$svc-childrens-yoga$$,       $$Children's Yoga$$,                           $$/services$$,              'Active', 15, $${"id":"svc-childrens-yoga","label":"Children's Yoga","href":"/services","status":"Active","displayOrder":15}$$::jsonb),
  ($$svc-senior-yoga$$,          $$Senior Citizen Yoga$$,                       $$/services$$,              'Active', 16, $${"id":"svc-senior-yoga","label":"Senior Citizen Yoga","href":"/services","status":"Active","displayOrder":16}$$::jsonb),
  ($$svc-bootcamp$$,             $$49-Day Weight Loss Bootcamp$$,               $$/services$$,              'Active', 17, $${"id":"svc-bootcamp","label":"49-Day Weight Loss Bootcamp","href":"/services","status":"Active","displayOrder":17}$$::jsonb),
  ($$svc-diet$$,                 $$Diet & Nutrition Consultation$$,             $$/services$$,              'Active', 18, $${"id":"svc-diet","label":"Diet & Nutrition Consultation","href":"/services","status":"Active","displayOrder":18}$$::jsonb),
  ($$svc-retreats-trekking$$,    $$Yoga Retreats & Trekking$$,                  $$/services$$,              'Active', 19, $${"id":"svc-retreats-trekking","label":"Yoga Retreats & Trekking","href":"/services","status":"Active","displayOrder":19}$$::jsonb),
  ($$svc-reiki$$,                $$Reiki Healing$$,                             $$/services$$,              'Active', 20, $${"id":"svc-reiki","label":"Reiki Healing","href":"/services","status":"Active","displayOrder":20}$$::jsonb)
on conflict (id) do nothing;
