insert into tag(tag_id, name, category) values (1, '조용한', 'STUDY');
insert into tag(tag_id, name, category) values (2, '커피 맛집', 'TASTY');
insert into tag(tag_id, name, category) values (3, '디저트 맛집', 'TASTY');
insert into tag(tag_id, name, category) values (4, '뷰 맛집', 'MOOD');
insert into tag(tag_id, name, category) values (5, '힙한', 'MOOD');
insert into tag(tag_id, name, category) values (6, '아늑한', 'MOOD');
insert into tag(tag_id, name, category) values (7, '깔끔한', 'MOOD');

insert into user(user_id, user_pw, reg_dt, email, user_nm, mobile, roles, status) values (1, "$2a$10$lalW/DgJvZ69ywg/8BEW5OE36vj/UyOy0DtfjZ1xmB2W19VNKFgzC", now(), "test1@naver.com", "김코딩", "010-1234-1234", "ROLE_USER", "USER_SIGNUP");
insert into user(user_id, user_pw, reg_dt, email, user_nm, mobile, roles, status) values (2, "$2a$10$lalW/DgJvZ69ywg/8BEW5OE36vj/UyOy0DtfjZ1xmB2W19VNKFgzC", now(), "test2@naver.com", "이자바", "010-1234-1235", "ROLE_USER", "USER_SIGNUP");
insert into user(user_id, user_pw, reg_dt, email, user_nm, mobile, roles, status) values (3, "$2a$10$lalW/DgJvZ69ywg/8BEW5OE36vj/UyOy0DtfjZ1xmB2W19VNKFgzC", now(), "test3@naver.com", "박파이", "010-1234-1237", "ROLE_USER", "USER_SIGNUP");

insert into cafe(cafe_id, address, badge, close_time, description, homepage, like_count, main_img, menu_img, name, open_time, phone, review_count) values (1, now(), 0, "19:00", "요즘 핫한 신상 카페", "www.cafe1.com", 0, 1, 2, "cafe1", "10:00", "02)123-1234", 0);
insert into cafe(cafe_id, address, badge, close_time, description, homepage, like_count, main_img, menu_img, name, open_time, phone, review_count) values (2, now(), 0, "17:00", "멋진 뷰로 유명한 카페", "www.cafe2.com", 0, 3, 4, "cafe2", "09:00", "02)123-1235", 0);

insert into image(image_id, path) values (1, "asdfzxcv");
insert into image(image_id, path) values (2, "uuefzxcv");
insert into image(image_id, path) values (3, "oiuekxcv");
insert into image(image_id, path) values (4, "pqdkzxcv");
