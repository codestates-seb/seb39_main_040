// // /*global kakao */
import React, { useEffect } from "react";

const { kakao } = window;

const MapContainer = ({ place }) => {
  // place (주소정보) 가 바뀔 때마다 지도 주소를 검색해서 좌표로 바꾸는 코드를 실행
  // 그 코드로 지도에 마커로 표시
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    // 지도에 새로운 좌표로 위치를 마커로 표시
    function displayMarker(place) {
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
  }, [place]);

  return (
    <div
      id="myMap"
      style={{
        width: "400px",
        height: "250px",
      }}
    ></div>
  );
};

export default MapContainer;
