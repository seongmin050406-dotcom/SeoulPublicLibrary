window.onload = handleRefresh;
var map;
var gus;
var marker;
var mapContainer;
var lat, lng;

function handleRefresh() {
    getData();
    addBound(3000);
}

const apiKey = "53626464786874753534534f566878";
const baseUrl = "http://openAPI.seoul.go.kr:8088/";
const url = `${baseUrl}${apiKey}/json/SeoulPublicLibraryInfo/`;
async function getData() {
    for (var i=1; i<16000; i=i+1000) {
        var j= i + 999;
        await fetch(url + i + "/" +j)
        .then(response => response.json())
        .then(data => updateLibrary(data));
    }
}

function updateLibrary(libraries){
    var libraries = libraries.SeoulPublicLibraryInfo.row;
    console.log(libraries);
}

function find(){ // find 버튼을 눌렀을 때(onClick)
	mapContainer = document.getElementById('map'), // 지도를 표시할 div 설정
	mapOption = {
		center: new daum.maps.LatLng(37.56544,126.977119,17), // 지도 중심좌표 시청으로 임의 지정.
		level: 13 // 지도의 확대 레벨
		};
	
	var gu = document.getElementById("gu"); //html의 gu를 가져온다.
	gus = gu.options[gu.selectedIndex].value; //gus는 gu의 값을 가지고 있다.(ex: 강북구, 강동구..)
	
	/*
	0 : 강남구 -37.4968488,127.0679394,	1 : 강동구 -37.5492994,127.1464275
	2 : 강북구 -37.6482131,127.0164069,	3 : 강서구 -37.552593,126.85051
	4 : 관악구 -37.4654529,126.9442478,	5 : 광진구 -37.5388,127.083445
	6 : 구로구 -37.495765,126.8578697,	7 : 금천구 -37.4599896,126.9012665
	8 : 노원구 -37.6541956,127.0769692,	9 : 도봉구 -37.6662325,127.0298724
	10 : 동대문구 -37.5835755,127.0505528,	11 : 동작구 -37.4971121,126.944378
	12 : 마포구 -37.5615964,126.9086431,	13 : 서대문구 -37.583312,126.9356601
	14 : 서초구 -37.483574,127.032661,	15 : 성동구 -37.5508768,127.0408952
	16 : 성북구 - 37.6023295,127.025236,	17 : 송파구 -37.504741,127.1144649
	18 : 양천구 -37.527432,126.8558783,	19 : 영등포구 -37.525423,126.896395
	20 : 용산구 -37.5305208,126.9809672,	21 : 은평구 -37.6175107,126.9249166
	22 : 종로구 -37.6009106,126.9835817,	23 : 중구 -37.5576747,126.9941653
	24 : 중랑구 -37.5950497,127.0957062	 */

	switch(gu.selectedIndex){//선택된 인덱스 번호
	case 0: // 강남구
		mapOption = {
			center: new daum.maps.LatLng(37.4968488,127.0679394),//강남구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 1: //강동구
		mapOption = {
			center: new daum.maps.LatLng(37.5492994,127.1464275),//강동구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 2: //강북구 
		mapOption = {
			center: new daum.maps.LatLng(37.6482131,127.0164069),//강북구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 3: //강서구 
		mapOption = {
			center: new daum.maps.LatLng(37.552593,126.85051),//강서구 좌표 지정
			level:7 // 지도의 확대 레벨
			};
		break;
	case 4: //관악구 
		mapOption = {
			center: new daum.maps.LatLng(37.4654529,126.9442478),//관악구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 5: //광진구 
		mapOption = {
			center: new daum.maps.LatLng(37.5388,127.083445),//광진구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 6: //구로구   
		mapOption = {
			center: new daum.maps.LatLng(37.495765,126.8578697),//구로구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 7: //금천구  
		mapOption = {
			center: new daum.maps.LatLng(37.4599896,126.9012665),//금천구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 8: //노원구  
		mapOption = {
			center: new daum.maps.LatLng(37.6541956,127.0769692),//노원구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 9: //도봉구  
		mapOption = {
			center: new daum.maps.LatLng(37.6662325,127.0298724),//도봉구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 10: //동대문구  
		mapOption = {
			center: new daum.maps.LatLng(37.5835755,127.0505528),//동대문구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 11: //동작구  
		mapOption = {
			center: new daum.maps.LatLng(37.4971121,126.944378),//동작구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 12: //마포구  
		mapOption = {
			center: new daum.maps.LatLng(37.5615964,126.9086431),//마포구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 13: //서대문구  
		mapOption = {
			center: new daum.maps.LatLng(37.583312,126.9356601),//서대문구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 14: //서초구  
		mapOption = {
			center: new daum.maps.LatLng(37.483574,127.032661),//서초구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 15: //성동구  
		mapOption = {
			center: new daum.maps.LatLng(37.5508768,127.0408952),//성동구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 16: //성북구  
		mapOption = {
			center: new daum.maps.LatLng(37.6023295,127.025236),//성북구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 17: //송파구 
		mapOption = {
			center: new daum.maps.LatLng(37.504741,127.1144649),//송파구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 18: //양천구 
		mapOption = {
			center: new daum.maps.LatLng(37.527432,126.8558783),//양천구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 19: //영등포구 
		mapOption = {
			center: new daum.maps.LatLng(37.525423,126.896395),//영등포구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 20: //용산구 
		mapOption = {
			center: new daum.maps.LatLng(37.5305208,126.9809672),//용산구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 21: //은평구 
		mapOption = {
			center: new daum.maps.LatLng(37.6175107,126.9249166),//은평구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 22: //종로구 
		mapOption = {
			center: new daum.maps.LatLng(37.6009106,126.9835817),//종로구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 23: //중구 
		mapOption = {
			center: new daum.maps.LatLng(37.5576747,126.9941653),//중구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 24: //중랑구 
		mapOption = {
			center: new daum.maps.LatLng(37.5950497,127.0957062),//중랑구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
		
	}//switch
	
	//지도를 표시할 div와 지도 옵션으로 지도 생성
	map = new daum.maps.Map(mapContainer, mapOption);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    var zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
	
	daum.maps.event.addListener(map, 'dragend', function() {
		handleRefresh(); //지도의 중심이 이동될때도 마커 다시 표시
	});
	
	handleRefresh(); //검색버튼을 클릭할 때 마커 표시
} //find

function addBound(radius){
    var bound = new daum.maps.Circle({
        center : map.getCenter(),
        radius: radius,
        strokeWeight: 5,
        strokeColor: '#F7D358',
        strokeOpacity: 0.5,
        strokeStyle: 'solid',
        fillColor: '#F7FE2E',
        fillOpacity: 0.3,
        zIndex: 1
    });

    bound.setMap(map);

    daum.maps.event.addListener(map, 'dragstart', function() {
        bound.setMap(null);
    });
}

function updateLibrary(libraries) { // 16번 호출
    var libraries = libraries.SeoulPublicLibraryInfo.row;
    var addr = "";
    var center = map.getCenter(); // 중심 가져오기
    var position = {
        latitude: center.getLat(),
        longitude: center.getLng()
    };

    for (var i = 0; i < libraries.length; i++) {
        var lib = libraries[i];
        var imageSrc = "marker1.png", // 마커의 이미지
            imageSize = new daum.maps.Size(32, 40), // 마커의 크기
            imageOption = { offset: new daum.maps.Point(14, 28) }; // 포인터 객체 생성

        var loc = { // open API 좌표 위도와 경도
            latitude: lib.XCNTS,
            longitude: lib.YDNTS
        };

        var km = computeDistance(position, loc); // 거리 계산, position 지도 중심좌표이고 loc는 각 도서관 좌표
        if (addr != lib.ADRES && km <= 3) { // 주소가 중복되지 않고, 거리가 3km 이내인 것들을 가져온다.
            addr = lib.ADRES;
            addMarker(imageSrc, imageSize, imageOption, lib.XCNTS, lib.YDNTS, lib.LBRRY_NAME, lib.ADRES, lib.TEL_NO, lib.FDRM_CLOSE_DATE);
        }
    }

    if (libraries.length > 0) {
        lastReportTime = libraries[libraries.length - 1].time;
    }
}// updateLibrary

function addMarker(imageSrc, imageSize, imageOption, latitude, longitude, name, address, tel, closeday) {
    // 마커 이미지와 함께 추가
    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var markerPosition = new daum.maps.LatLng(latitude, longitude);
    var marker = new daum.maps.Marker({
        position: markerPosition,
        image: markerImage,
        clickable: true,
        zIndex: 7
    });

    marker.setMap(map);
    daum.maps.event.addListener(marker, "dragstart", function () {
        marker.setMap(null);
    });

	var content = `
    	<div class="alert" role="alert" style="margin: 0; padding: 10px; font-size: 0.9rem; background-color: blue; color: white;">
        	<strong>도서관 이름:</strong> ${name}<br>
        	<strong>주소:</strong> ${address}<br>
        	<strong>전화번호:</strong> ${tel}<br>
        	휴관일:<span style="color: red;"> ${closeday}</span> 
    	</div>
	`;


    // 마커를 클릭할 때 마커 위에 표시될 인포윈도우 생성
    var iwContent = content; // 인포윈도우에 표시될 내용
    var iwPosition = markerPosition; // 인포윈도우 표시 위치
    var iwRemovable = true; // removable 속성을 true로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시

    var infowindow = new daum.maps.InfoWindow({ // 인포윈도우 생성
        position: iwPosition,
        content: iwContent,
        removable: iwRemovable,
        zIndex: 10
    });

    daum.maps.event.addListener(marker, "click", function () { // 마커에 클릭 이벤트 등록
        infowindow.open(map, marker); // 마커 위에 인포윈도우 표시
    });
}
// addMarker

function computeDistance(startCoords, destCoords) { // 거리 계산
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371; // 지구 반지름 (킬로미터 단위)

    var distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;

    return distance;
}// computeDistance

function degreesToRadians(degrees){
    var radians = (degrees * Math.PI)/100;
    return radians;
}