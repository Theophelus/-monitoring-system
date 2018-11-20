
CREATE TABLE users (
full_name text not null,
position text not null,
PASSWORD  text not null,
email text not null,
joined_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE students (
full_name text not null,
email text not null,
github_username text not null,
codewars_username text not null,
joined_date DATE NOT NULL DEFAULT CURRENT_DATE
);
