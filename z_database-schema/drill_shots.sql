create table public.drill_shots (
  id serial not null,
  session_id integer null,
  station integer null,
  difficulty text null,
  trajectory text null,
  club text null,
  proximity double precision null,
  up_and_down boolean null,
  score integer null,
  best_worse text null,
  timestamp timestamp without time zone null default now(),
  golfer_id uuid null,
  constraint drill_shots_pkey primary key (id),
  constraint drill_shots_golfer_id_fkey foreign KEY (golfer_id) references golfers (id) on update CASCADE on delete set null,
  constraint drill_shots_session_id_fkey foreign KEY (session_id) references drill_session (id) on delete CASCADE,
  constraint drill_shots_difficulty_check check (
    (
      difficulty = any (array['Easy'::text, 'Medium'::text, 'Hard'::text])
    )
  ),
  constraint drill_shots_trajectory_check check (
    (
      trajectory = any (array['Low'::text, 'Mid'::text, 'High'::text])
    )
  )
) TABLESPACE pg_default;