drop table if exists users;
drop sequence if exists user_id_seq;

drop table if exists instruments;
drop sequence if exists instrument_id_seq;

create table users(
    user_id bigint unique not null,
    username varchar(256) not null unique,
    password varchar(256) not null,
    role varchar(256) not null,
    full_name varchar(256) not null,
    favorite_ids bigint[] not null
);

create sequence user_id_seq increment 1 start 1;

create table instruments(
    instrument_id bigint unique not null,
    instrument_name varchar(256) not null,
    instrument_type varchar(256) not null,
    manufacturer_name varchar(256) not null,
    manufacturer_date timestamptz not null,
    release_date timestamptz not null,
    country varchar(256) not null,
    materials varchar(256)[] not null,
    image text not null
);

create sequence instrument_id_seq increment 1 start 1;
