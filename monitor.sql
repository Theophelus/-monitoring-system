
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


 INSERT into students(full_name, email, github_username, codewars_username, joined_date) values('Anele Tom','aneletom10@gmail.com','Theophelus','passwaord','2018-11-21');
 INSERT into students(full_name, email, github_username, codewars_username, joined_date) values('Ayabonga Booi','ayabongabooi2@gmail.com','mrBooi','passwaord','2018-11-21');