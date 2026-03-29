CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
  ('Mario Tabora', 'mario@ejemplo.com'),
  ('Usuario Demo', 'demo@ejemplo.com')
ON CONFLICT (email) DO NOTHING;
