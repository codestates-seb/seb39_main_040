/*global kakao */
import React, { useEffect } from "react";

const { kakao } = window;

export default function CafeInfoMap() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(
      37.624915253753194,
      127.15122688059974
    );

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);

    // 지도 확대축소 드래그 막기
    map.setDraggable(false);
    map.setZoomable(false);
  };

  return <div id="map" style={{ width: "440px", height: "250px" }}></div>;
}
