drop table if exists public.users;
drop sequence if exists public.user_id_seq;

drop table if exists public.instruments;
drop sequence if exists public.instrument_id_seq;

create sequence public.user_id_seq increment 1 start 1;
create table public.users(
    user_id bigint unique not null,
    username varchar(256) not null unique,
    password varchar(256) not null,
    role varchar(256) not null,
    full_name varchar(256) not null,
    favorite_ids bigint[] not null
);

create sequence public.instrument_id_seq increment 1 start 1;
create table public.instruments(
    instrument_id bigint unique not null,
    instrument_name varchar(256) not null,
    instrument_i18n_code varchar(256) not null,
    manufacturer_i18n_code varchar(256) not null,
    manufacturer_date timestamptz not null,
    release_date timestamptz not null,
    country_i18n_code varchar(256) not null,
    materials varchar(256)[] not null,
    image text not null
);
