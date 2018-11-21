
drop table if exists users, students;

CREATE TABLE users (
id serial not null PRIMARY key,
full_name text not null,
position text not null,
PASSWORD  text not null,
email text not null,
joined_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE students (
id serial not null PRIMARY key,
full_name text not null,
email text not null,
github_username text not null,
codewars_username text not null,
joined_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE table project (
id serial not null PRIMARY key,
project_name text not null,
joined_date DATE NOT NULL DEFAULT CURRENT_DATE
);