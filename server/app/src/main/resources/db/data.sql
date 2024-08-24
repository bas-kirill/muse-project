-- do not use `data.sql` due to inserting images requiring `pg_read_binary_file`,
-- but it requires absolute path, or it will take images from `select show_directory;`
-- there is approach to use symbolic links via `ln -s`, but it requires additional infrastructure configuration
-- so, was chosen to bootstrap development data at application start at infra level

select 1; -- 'script' must not be null or empty
