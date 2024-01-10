create table base
(
    id          uuid                     default uuid_generate_v4() not null
        constraint entity_pkey
            primary key,
    created_at  timestamp with time zone default now(),
    created_by  text,
    updated_at  timestamp with time zone default now(),
    updated_by  text
);

create table item
(
    id          uuid                     default uuid_generate_v4() not null
        constraint entity_pkey
            primary key,
    name        text,
    description text,
    created_at  timestamp with time zone default now(),
    created_by  text,
    updated_at  timestamp with time zone default now(),
    updated_by  text
);

