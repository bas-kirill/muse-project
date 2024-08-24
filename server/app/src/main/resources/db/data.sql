insert into users
(user_id, username, password, role, full_name)
values
(nextval('user_id_seq'), 'user', '{noop}123', 'USER', 'User Userov'),
(nextval('user_id_seq'), 'editor', '{noop}321', 'EDITOR', 'Editor Editorov');

insert into instruments
(instrument_id, instrument_name, instrument_type, manufacturer_name, manufacturer_date, release_date, country, materials)
values
(nextval('instrument_id_seq'), 'Fidel Telecastro', 'STRINGED', 'FENDER', '2024-07-01T00:00:00Z', '2100-01-01T00:00:00Z', 'CYPRUS', '{WOOD}'),
(nextval('instrument_id_seq'), 'SaxoStar', 'WIND', 'SIGMA', '2007-01-01T00:00:00Z', '2008-07-01T00:00:00Z', 'USA', '{METALL}'),
(nextval('instrument_id_seq'), 'Yamaha CLP-745B', 'KEYBOARD', 'YAMAHA', '2007-01-01T00:00:00Z', '2008-07-01T00:00:00Z', 'USA', '{WOOD}');
