insert into users (username, password, role, full_name)
values ('user', '123', 'user', 'User Userov'),
       ('editor', '321', 'editor', 'Editor Editorov');

insert into instruments(instrument_name, instrument_type, manufacturer_name, manufacturer_date, release_date, country,
                        materials)
values ('Fidel Telecastro', 'STRINGED', 'FENDER', '2024-07-01T00:00:00Z', '2100-01-01T00:00:00Z', 'CYPRUS', '{WOOD}'),
       ('SaxoStar', 'WIND', 'SIGMA', '2007-01-01T00:00:00Z', '2008-07-01T00:00:00Z', 'USA', '{METALL}'),
       ('Yamaha CLP-745B', 'KEYBOARD', 'YAMAHA', '2007-01-01T00:00:00Z', '2008-07-01T00:00:00Z', 'USA', '{WOOD}');
