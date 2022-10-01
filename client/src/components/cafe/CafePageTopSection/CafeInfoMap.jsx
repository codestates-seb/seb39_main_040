// /*global kakao */
import React, { useEffect } from "react";

const { kakao } = window;

export default function CafeInfoMap() {
  // 도로명 주소를 좌표로 바꾸는 작업이 필요함
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };
    //지도를 생성 함
    const map = new kakao.maps.Map(container, options);

    // 주소-좌표 변환 객체 생성
    // const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표 검색
    // geocoder.addressSearch(
    //   "제주특별자치도 제주시 첨단로 242",
    //   function (result, status) {
    //     // 정상적으로 검색이 완료됐으면
    //     if (status === kakao.maps.services.Status.OK) {
    //       let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    //       // 결과값으로 받은 위치를 마커로 표시합니다
    //       let marker = new kakao.maps.Marker({
    //         map: map,
    //         position: coords,
    //       });

    //       // 인포윈도우로 장소에 대한 설명을 표시합니다
    //       let infowindow = new kakao.maps.InfoWindow({
    //         content:
    //           '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
    //       });
    //       infowindow.open(map, marker);

    //       // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //       map.setCenter(coords);
    //     }
    //   }
    // );

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
    // map.setDraggable(false);
    map.setZoomable(false);
  };

  return <div id="map" style={{ width: "440px", height: "250px" }}></div>;
}

// import React, { useEffect } from "react";

// const { kakao } = window;

// const CafeinfoMap = () => {
//   useEffect(() => {
//     const container = document.getElementById("myMap");
//     const options = {
//       center: new kakao.maps.LatLng(33.450701, 126.570667),
//       level: 3,
//     };
//     // 지도를 생성합니다.
//     const map = new kakao.maps.Map(container, options);
//     // 주소-좌표 변환 객체를 생성합니다.
//     const geocoder = new kakao.maps.services.Geocoder();
//     // 주소로 좌표를 검색합니다..
//     geocoder.addressSearch(
//       "제주특별자치도 제주시 첨단로 242",
//       function (result, status) {
//         // 정상적으로 검색이 완료됐으면
//         if (status === kakao.maps.services.Status.OK) {
//           var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//           // 결과값으로 받은 위치를 마커로 표시합니다
//           var marker = new kakao.maps.Marker({
//             map: map,
//             position: coords,
//           });

//           // 인포윈도우로 장소에 대한 설명을 표시합니다
//           var infowindow = new kakao.maps.InfoWindow({
//             content:
//               '<div style="width:150px;color:red;text-align:center;padding:6px 0;">내가 썼지롱</div>',
//           });
//           infowindow.open(map, marker);

//           // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//           map.setCenter(coords);
//         }
//       }
//     );
//   }, []);

//   return (
//     <div
//       id="myMap"
//       style={{
//         width: "400px",
//         height: "250px",
//       }}
//     ></div>
//   );
// };

// export default CafeinfoMap;
