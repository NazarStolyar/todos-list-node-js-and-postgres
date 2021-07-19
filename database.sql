create TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255)
);

create TABLE todos(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    date DATE,
    user_id INTEGER,
     FOREIGN KEY (user_id) REFERENCES users (id)
);
