insert into tag(tag_id, tag_nm, tag_ctg) values (1, '조용한', 'STUDY');
insert into tag(tag_id, tag_nm, tag_ctg) values (2, '커피맛집', 'TASTY');
insert into tag(tag_id, tag_nm, tag_ctg) values (3, '디저트맛집', 'TASTY');
insert into tag(tag_id, tag_nm, tag_ctg) values (4, '뷰맛집', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (5, '힙한', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (6, '아늑한', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (7, '깔끔한', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (8, '분위기좋은', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (9, '스터디', 'STUDY');
insert into tag(tag_id, tag_nm, tag_ctg) values (10, '브런치맛집', 'TASTY');
insert into tag(tag_id, tag_nm, tag_ctg) values (11, '친절한', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (12, '반려동물과함께', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (13, '아담한', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (14, '인스타감성', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (15, '포토존', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (16, '주차가편한', 'NONE');
insert into tag(tag_id, tag_nm, tag_ctg) values (17, '넓어요', 'NONE');
insert into tag(tag_id, tag_nm, tag_ctg) values (18, '인테리어맛집', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (19, '빈티지', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (20, '루프탑', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (21, '모던한', 'MOOD');
insert into tag(tag_id, tag_nm, tag_ctg) values (22, '시그니처메뉴', 'TASTY');
insert into tag(tag_id, tag_nm, tag_ctg) values (23, '사진맛집', 'MOOD');

-- 기본 프로필 이미지
insert into image(image_id, reg_dt, mdf_dt, image_nm)  values (1, now(), now(), 'fix/basic-profile.jpg');

-- 정월
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (1, '서울 강남구 강남대로102길 46', 0, '22:00', '감성 가득! 아인슈페너로 유명한 곳', 0, '정월', '12:00', '02-6013-0926', 0, 'https://www.instagram.com/cafe_jungwol/');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (2, now(), now(), 'fix/%EC%A0%95%EC%9B%94-main.jpg', 1);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (3, now(), now(), 'fix/%EC%A0%95%EC%9B%94-menu.jpg', 1);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (1, 1, 4);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (2, 1, 14);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (3, 1, 15);

-- 트리오드
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (2, '서울 강남구 강남대로94길 28 유니언타운', 0, '22:00', '라디오 주파수를 맞추듯 고객에게 딱 맞는 취향을 찾아주는 카페', 0, '트리오드', '11:00', '02-568-9427', 0, 'https://www.instagram.com/triode.official/');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (4, now(), now(), 'fix/%ED%8A%B8%EB%A6%AC%EC%98%A4%EB%93%9C-main.jpg', 2);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (5, now(), now(), 'fix/%ED%8A%B8%EB%A6%AC%EC%98%A4%EB%93%9C-menu.jpg', 2);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (4, 2, 3);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (5, 2, 11);

-- 꽁티드툴레아
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (3, '서울 강남구 도산대로49길 39', 0, '24:00', '다양하고 재밌는 음식들와 음료 그리고 꽁 티드 툴레아의 향과 즐거운 시간!', 0, '꽁티드툴레아', '11:00', '070-8846-8490', 0, 'https://www.instagram.com/contedetulear/');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (6, now(), now(), 'fix/%ED%88%B4%EB%A0%88%EC%95%84-main.jpg', 3);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (7, now(), now(), 'fix/%ED%88%B4%EB%A0%88%EC%95%84-menu.jpg', 3);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (6, 3, 10);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (7, 3, 16);

-- 썸띵어바웃커피
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (4, '서울 강남구 강남대로102길 30', 0, '23:00', '수제 디저트 천국', 0, '썸띵어바웃커피', '11:00', '0507-1332-6991', 0, 'https://www.instagram.com/something_about_coffee_/?hl=ko');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (8, now(), now(), 'fix/%EC%84%AC%EB%9D%B5%EC%96%B4%EB%B0%94%EC%9B%83-main.jpg', 4);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (9, now(), now(), 'fix/%EC%84%AC%EB%9D%B5%EC%96%B4%EB%B0%94%EC%9B%83-menu.jpg', 4);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (8, 4, 3);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (9, 4, 8);

-- 칼리프 하우스
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (5, '서울 강남구 도산대로49길 29-8', 0, '24:00', '미국 캘리포니아 리조트같은 공간', 0, '칼리프 하우스', '11:00', '02-549-8851', 0, 'https://www.instagram.com/califhouse');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (10, now(), now(), 'fix/%EC%B9%BC%EB%A6%AC%ED%94%84-main.jpeg', 5);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (11, now(), now(), 'fix/%EC%B9%BC%EB%A6%AC%ED%94%84-menu.jpeg', 5);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (10, 5, 10);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (11, 5, 7);

-- 에뚜왈
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (6, '서울 강남구 압구정로10길 35', 0, '21:00', '마들렌으로 유명한 아담한 디저트 맛집', 0, '에뚜왈', '12:30', '070-7627-0057', 0, 'https://www.instagram.com/etoile______________/');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (12, now(), now(), 'fix/%EC%97%90%EB%9A%9C%EC%99%88-main.jpg', 6);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (13, now(), now(), 'fix/%EC%97%90%EB%9A%9C%EC%99%88-menu.jpg', 6);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (12, 6, 3);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (13, 6, 13);

-- 알베르
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (7, '서울 강남구 강남대로102길 34', 0, '20:00', '강남역커피숍 데이트장소로 추천하고 싶은 카페', 0, '알베르', '10:00', '02-566-6181', 0, 'https://www.instagram.com/alver_coffee/');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (14, now(), now(), 'fix/%EC%95%8C%EB%B2%A0%EB%A5%B4-main.jpg', 7);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (15, now(), now(), 'fix/%EC%95%8C%EB%B2%A0%EB%A5%B4-menu.jpg', 7);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (14, 7, 2);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (15, 7, 8);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (16, 7, 17);

-- TAPE
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (8, '서울 용산구 이태원로14길 21', 0, '22:00', '루프탑이 있는 빈티지 디저트 카페', 0, '테이프', '12:00', '010-7317-4201', 0, 'www.instagram.com/tapeseoul');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (16, now(), now(), 'fix/%ED%85%8C%EC%9D%B4%ED%94%84-main_img.png', 8);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (17, now(), now(), 'fix/%ED%85%8C%EC%9D%B4%ED%94%84-menu_img.png', 8);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (17, 8, 4);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (18, 8, 19);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (19, 8, 20);


-- LOWIDE
insert into cafe(cafe_id, cafe_addr, cafe_bdg, close_tm, cafe_dsrp, like_cnt, cafe_nm, open_tm, cafe_phn, rvw_cnt, cafe_url) values (9, '서울 성동구 서울숲2길 22-1', 0, '20:00', '소금빵이 맛있는 서울숲 근처 카페', 0, 'LOWIDE', '10:00', '0507-1430-2219', 0, 'https://www.instagram.com/lowidecoffee');
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (18, now(), now(), 'fix/LOWIDE-main.jpg', 9);
insert into image(image_id, reg_dt, mdf_dt, image_nm, cafe_id) values (19, now(), now(), 'fix/LOWIDE-menu.jpg', 9);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (20, 9, 4);
insert into cafe_tag(cafetag_id, cafe_id, tag_id) values (21, 9, 12);