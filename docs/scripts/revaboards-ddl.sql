create user revaboards_api
with password 'revature';

create database revaboards;

grant all privileges 
on database revaboards
to revaboards_api;

set search_path to revaboards;

create table user_roles(
	id serial,
	name varchar(25) not null,
	
	constraint user_roles_pk primary key (id)
	
);

create table app_users(
	id serial,
	username varchar(25) unique not null,
	password varchar(256) not null,
	first_name varchar(25) not null,
	last_name varchar(25) not null,
	email varchar(256) unique not null,
	role_id int not null,
	
	constraint app_users_pk primary key (id),
	constraint user_role_fk foreign key (role_id) references user_roles
);

create table threads(
	id serial,
	title varchar(35) not null,
	created_time timestamp with time zone default current_timestamp,
	creator_id int not null,
	
	constraint threads_pk primary key (id),
	constraint thread_creator_fk foreign key (creator_id) references app_users
);

create table posts(
	id serial,
	title varchar(35) not null,
	body varchar(2056) not null,
	created_time timestamp with time zone default current_timestamp,
	likes int default 0,
	thread_id int not null,
	poster_id int not null,
	
	constraint posts_pk primary key (id),
	
	constraint post_thread_fk foreign key (thread_id) 
	references threads on delete cascade,
	
	constraint post_user_fk foreign key (poster_id)
	references app_users
);

create table post_likers(
	user_id int not null,
	post_id int not null,
	
	constraint post_likers_pks primary key (user_id, post_id),
	constraint pl_user foreign key (user_id) references app_users,
	constraint pl_post foreign key (post_id) references posts
);

create table thread_followers(
	user_id int not null,
	thread_id int not null,
	
	constraint thread_followers_pks primary key (user_id, thread_id),
	constraint tf_user foreign key (user_id) references app_users,
	constraint tf_thread foreign key (thread_id) references threads
);



--insert into user_roles (name) values ('Admin'), ('Dev'), ('User'), ('Locked');

insert into app_users (username, password, first_name, last_name, email, role_id) values
	('aanderson', 'password', 'Alice', 'Anderson', 'aanderson@revature.com', 1),
	('bbailey', 'password', 'Bob', 'Bailey', 'bbailey@revature.com', 2),
	('ccalhoun', 'password', 'Charles', 'Calhoun', 'ccalhoun@revature.com', 3),
	('ddavis', 'password', 'Daniel', 'Davis', 'ddavis@revature.com', 3),
	('eeinstein', 'password', 'Emily', 'Anderson', 'eeinstein@revature.com', 3);
​
​
insert into threads (title, creator_id) values ('First thread!', 1);

insert into posts (title, body, thread_id, poster_id) values 
	('First thread!', 'Hello everyone! This is the first post of the forum!', 1, 1),
	('So cool!', 'Hello everyone! This is the first post of the forum!', 1, 3),
	('This is great!', 'I can''t wait to use this! ', 1, 5),
	('RE: First thread!', 'So glad we can finally persist data in a database!', 1, 2);
​
select * from posts;
​
select p.id, p.title, p.body, p.created_time, p.likes, t.title, u.username
from posts p 
join threads t
on p.thread_id = t.id
join app_users u
on p.poster_id = u.id
join user_roles r
on u.role_id = r.id
where p.poster_id = 1;

commit;

