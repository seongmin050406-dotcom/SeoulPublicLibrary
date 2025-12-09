// ================================
// 전역변수
// ================================
var map;
var markers = [];
var libraryData = [];
var gu_center = {
    "강남구": [37.4968488, 127.0679394],
    "강동구": [37.5492994, 127.1464275],
    "강북구": [37.6482131, 127.0164069],
    "강서구": [37.552593, 126.85051],
    "관악구": [37.4654529, 126.9442478],
    "광진구": [37.5388, 127.083445],
    "구로구": [37.495765, 126.8578697],
    "금천구": [37.4599896, 126.9012665],
    "노원구": [37.6541956, 127.0769692],
    "도봉구": [37.6662325, 127.0298724],
    "동대문구": [37.5835755, 127.0505528],
    "동작구": [37.4971121, 126.944378],
    "마포구": [37.5615964, 126.9086431],
    "서대문구": [37.583312, 126.9356601],
    "성동구": [37.5508768, 127.0408952],
    "성북구": [37.6023295, 127.025236],
    "송파구": [37.504741, 127.1144649],
    "양천구": [37.527432, 126.8558783],
    "영등포구": [37.525423, 126.896395],
    "용산구": [37.5305208, 126.9809672],
    "은평구": [37.6175107, 126.9249166],
    "종로구": [37.6009106, 126.9835817],
    "중구": [37.5576747, 126.9941653],
    "중랑구": [37.5950497, 127.0957062]
};


// ================================
// 페이지 시작 시 지도 생성
// ================================
window.onload = function () {
    initMap();
    getData();
};


// ================================
// 지도 초기화
// ================================
function initMap() {
    var container = document.getElementById("map");
    var options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 7
    };
    map = new kakao.maps.Map(container, options);
}


// ================================
// 서울시 도서관 API 데이터 불러오기
// ================================
function getData() {
    const serviceKey = "5562556d6279736d31303371487a5343"; // 교수님 제공 KEY
    const url = `http://openapi.seoul.go.kr:8088/${serviceKey}/json/SeoulPublicLibraryInfo/1/1000/`;

    fetch(url)
        .then(res => res.json())
        .then(json => {
            libraryData = json.SeoulPublicLibraryInfo.row;
        })
        .catch(err => console.log("API ERROR:", err));
}


// ================================
// 검색 버튼 클릭
// ================================
function find() {
    var gu = document.getElementById("gu").value;
    var center = gu_center[gu];

    // 지도 이동
    map.setCenter(new kakao.maps.LatLng(center[0], center[1]));
    map.setLevel(6);

    // 기존 마커 삭제
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];

    // 원 그리기
    var circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(center[0], center[1]),
        radius: 2000,
        strokeWeight: 3,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        fillColor: '#FF6600',
        fillOpacity: 0.2
    });
    circle.setMap(map);

    // 필터링
    var filtered = libraryData.filter(function (e) {
        return e.CODE_VALUE === gu;
    });

    updateList(filtered);
    updateMarkers(filtered);
}


// ================================
// 오른쪽 목록 출력
// ================================
function updateList(list) {
    var div = document.getElementById("libraries");
    div.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        var lib = list[i];

        var box = document.createElement("div");
        box.className = "p-2 mb-2 " + (i % 2 == 0 ? "custom-bg-even" : "custom-bg-odd");

        box.innerHTML =
            "<b>" + lib.LBRRY_NAME + "</b><br>" +
            "전화: " + lib.TEL_NO + "<br>" +
            "주소: " + lib.ADRES + "<br>" +
            "위도: " + lib.XCNTS + ", 경도: " + lib.YDNTS + "<br>" +
            "휴관일: " + lib.FDR_SCTN + "<br>" +
            "<a href='" + lib.HMPG_URL + "' target='_blank'>" + lib.HMPG_URL + "</a><br><br>" +
            "<button class='btn btn-sm btn-secondary' onclick=\"moveMarker(" + lib.XCNTS + "," + lib.YDNTS + ")\">위치</button>";

        div.appendChild(box);
    }
}


// ================================
// 마커 표시
// ================================
function updateMarkers(list) {
    for (var i = 0; i < list.length; i++) {
        var lib = list[i];

        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lib.XCNTS, lib.YDNTS),
            map: map
        });

        markers.push(marker);

        // InfoWindow
        var iwContent =
            "<div style='padding:5px; font-size:13px;'>" +
            "<b>" + lib.LBRRY_NAME + "</b><br>" +
            lib.ADRES +
            "</div>";

        var infowindow = new kakao.maps.InfoWindow({
            content: iwContent
        });

        kakao.maps.event.addListener(marker, "click", makeClick(marker, infowindow));
    }
}

function makeClick(marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}


// ================================
// 위치 버튼 기능
// ================================
function moveMarker(x, y) {
    map.setCenter(new kakao.maps.LatLng(x, y));
    map.setLevel(5);
}


// ================================
// 맨 위로 이동
// ================================
function go_top() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}