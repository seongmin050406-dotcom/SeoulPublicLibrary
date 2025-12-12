// ================================
// 전역변수
// ================================
var map;
var markers = [];
var libraryData = [];
var circle = null;

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
// 페이지 시작
// ================================
window.onload = function () {
    initMap();
    getData();
};

// ================================
// 지도 초기화
// ================================
function initMap() {
    map = new kakao.maps.Map(document.getElementById("map"), {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 7
    });
}

// ================================
// API 호출 (CORS 우회 + HTTPS)
// ================================
function getData() {
    const serviceKey = "5562556d6279736d31303371487a5343";
    const apiUrl = `https://openapi.seoul.go.kr:8088/${serviceKey}/json/SeoulPublicLibraryInfo/1/1000/`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            libraryData = data.SeoulPublicLibraryInfo.row;
        })
        .catch(err => alert("API 로딩 실패"));
}

// ================================
// 검색
// ================================
function find() {
    const gu = document.getElementById("gu").value;
    const center = gu_center[gu];

    map.setCenter(new kakao.maps.LatLng(center[0], center[1]));
    map.setLevel(6);

    markers.forEach(m => m.setMap(null));
    markers = [];

    if (circle) circle.setMap(null);

    circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(center[0], center[1]),
        radius: 2000,
        strokeWeight: 3,
        strokeColor: '#FF0000',
        fillColor: '#FF6600',
        fillOpacity: 0.25
    });
    circle.setMap(map);

    const filtered = libraryData.filter(e => e.CODE_VALUE === gu);
    updateList(filtered);
    updateMarkers(filtered);
}

// ================================
// 목록 출력
// ================================
function updateList(list) {
    const div = document.getElementById("libraries");
    div.innerHTML = "";

    list.forEach((lib, i) => {
        const box = document.createElement("div");
        box.className = `p-2 mb-2 ${i % 2 === 0 ? "custom-bg-even" : "custom-bg-odd"}`;
        box.innerHTML = `
            <b>${lib.LBRRY_NAME}</b><br>
            주소: ${lib.ADRES}<br>
            전화: ${lib.TEL_NO}<br>
            <button class="btn btn-sm btn-dark mt-1"
                onclick="moveMarker(${lib.XCNTS}, ${lib.YDNTS})">위치</button>
        `;
        div.appendChild(box);
    });
}

// ================================
// 마커 + 정보창
// ================================
function updateMarkers(list) {
    list.forEach(lib => {
        const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lib.XCNTS, lib.YDNTS),
            map: map
        });

        markers.push(marker);

        const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:6px;font-size:13px;">
                        <b>${lib.LBRRY_NAME}</b><br>${lib.ADRES}
                      </div>`
        });

        kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
        });
    });
}

// ================================
// 위치 이동
// ================================
function moveMarker(x, y) {
    map.setCenter(new kakao.maps.LatLng(x, y));
    map.setLevel(5);
}
