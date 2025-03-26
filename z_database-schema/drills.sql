create table public.drills (
  id serial not null,
  drill_type text null,
  drill_category text null,
  drill_name text null,
  golfer_id uuid null,
  constraint drills_pkey primary key (id),
  constraint drills_golfer_id_fkey foreign KEY (golfer_id) references golfers (id),
  constraint drills_drill_type_check check (
    (
      drill_type = any (
        array[
          'full_swing'::text,
          'wedge'::text,
          'putting'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;