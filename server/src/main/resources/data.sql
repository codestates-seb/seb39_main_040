insert into tag(tag_id, tag_nm, tag_ctg) values (1, '조용한', 'STUDY');
insert into tag(tag_id, tag_nm, tag_ctg) values (2, '커피 맛집', 'TASTY');
insert into tag(tag_id, tag_nm, tag_ctg) values (3, '디저트 맛집', 'TASTY');
insert into tag(tag_id, tag_nm, tag_ctg) values (4, '뷰 맛집', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (5, '힙한', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (6, '아늑한', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (7, '깔끔한', 'MOOD');

insert into image(image_id, path) values (1, "asdfzxcv");
insert into image(image_id, path) values (2, "uuefzxcv");
insert into image(image_id, path) values (3, "oiuekxcv");
insert into image(image_id, path) values (4, "pqdkzxcv");

insert into user(user_id, user_pw, reg_dt, email, user_nm, mobile, roles, status, prf_pt) values (1, "$2a$10$lalW/DgJvZ69ywg/8BEW5OE36vj/UyOy0DtfjZ1xmB2W19VNKFgzC", now(), "test1@naver.com", "김코딩", "010-1234-1234", "ROLE_USER", "USER_SIGNUP", 2);
insert into user(user_id, user_pw, reg_dt, email, user_nm, mobile, roles, status, prf_pt) values (2, "$2a$10$lalW/DgJvZ69ywg/8BEW5OE36vj/UyOy0DtfjZ1xmB2W19VNKFgzC", now(), "test2@naver.com", "이자바", "010-1234-1235", "ROLE_USER", "USER_SIGNUP", 1);
insert into user(user_id, user_pw, reg_dt, email, user_nm, mobile, roles, status, prf_pt) values (3, "$2a$10$lalW/DgJvZ69ywg/8BEW5OE36vj/UyOy0DtfjZ1xmB2W19VNKFgzC", now(), "test3@naver.com", "박파이", "010-1234-1237", "ROLE_USER", "USER_SIGNUP", 4);

insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, cafe_url, like_cnt, mn_img_id, mu_img_id, cafe_nm, open_tm, cafe_phn, rvw_cnt) values (1, now(), 0, "19:00", "요즘 핫한 신상 카페", "www.cafe1.com", 0, 1, 2, "cafe1", "10:00", "02)123-1234", 0);
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, cafe_url, like_cnt, mn_img_id, mu_img_id, cafe_nm, open_tm, cafe_phn, rvw_cnt) values (2, now(), 0, "17:00", "멋진 뷰로 유명한 카페", "www.cafe2.com", 0, 3, 4, "cafe2", "09:00", "02)123-1235", 0);

insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (1, 1, 1);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (2, 1, 5);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (3, 1, 7);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (4, 2, 1);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (5, 2, 4);
