Drop table if exists locations;

create table if not exists locations(
    id integer primary key not null,
    place varchar(128) unique not null,
    lat float not null,
    lon float not null

);

INSERT INTO locations (id, place, lat, lon) VALUES
(1, 'Bayswater', -36.815197, 174.767506),
(2, 'Cheltenham', -36.81392, 174.89138),
(3, 'Orewa', -36.582190, 174.696759),
(4, 'Shoal Bay', -36.80727115952904, 174.76621949021768),
(5, 'Muriwai', -36.820376, 174.420699),
(6, 'St Heliers', -36.848516, 174.856328),
(7, 'Shakespeare Regional Park', -36.600061, 174.812164),
(8, 'The Spit', -36.872585,174.881923);

-- INSERT INTO locations (id, place, lat, lon) VALUES
-- (1, 'Bayswater', '-36.815197', '174.767506'),
-- (2, 'Cheltenham', -'36.81392', '174.89138'),
-- (3, 'Orewa', '-36.582190', '174.696759'),
-- (4, 'Shoal Bay', '-36.80727115952904', '174.76621949021768'),
-- (5, 'Muriwai', '-36.820376', '174.420699'),
-- (6, 'St Heliers', '-36.848516', '174.856328'),
-- (7, 'Shakespeare Regional Park', '-36.600061', '174.812164'),
-- (8, 'The Spit', '-36.872585','174.881923');