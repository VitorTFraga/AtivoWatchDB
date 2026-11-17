CREATE TABLE assets (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  type        TEXT NOT NULL,
  location    TEXT
);

CREATE TABLE sensors (
  id        SERIAL PRIMARY KEY,
  asset_id  INT NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  type      TEXT NOT NULL,
  unit      TEXT NOT NULL
);

CREATE TABLE readings (
  sensor_id INT NOT NULL REFERENCES sensors(id) ON DELETE CASCADE,
  ts        TIMESTAMPTZ NOT NULL,
  value     NUMERIC NOT NULL
);

SELECT create_hypertable('readings', 'ts');

CREATE INDEX idx_readings_sensor_ts ON readings (sensor_id, ts DESC);