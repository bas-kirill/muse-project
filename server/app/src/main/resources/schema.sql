create table users(
    user_id bigserial primary key not null,
    username varchar(256) not null unique,
    password varchar(256) not null,
    role varchar(256) not null,
    full_name varchar(256) not null
);

create table instruments(
    instrument_id bigserial primary key not null,
    instrument_name varchar(256) not null,
    instrument_type varchar(256) not null,
    manufacturer_name varchar(256) not null,
    manufacturer_date timestamptz not null,
    release_date timestamptz not null,
    country varchar(256) not null,
    materials varchar(256)[] not null
);

