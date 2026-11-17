INSERT INTO assets (name, type, location) VALUES
  ('Turbina Norte', 'turbine', 'Florianópolis'),
  ('Painel Solar Sul', 'solar', 'São José');

INSERT INTO sensors (asset_id, type, unit) VALUES
  (1, 'temperature', '°C'),
  (1, 'vibration', 'mm/s'),
  (2, 'irradiance', 'W/m²');

INSERT INTO readings (sensor_id, ts, value)
SELECT s.id,
       now() - (g || ' minutes')::interval,
       round((random() * 100)::numeric, 2)
FROM sensors s
CROSS JOIN generate_series(0, 1440) AS g;