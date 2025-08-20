import { SpiderChart } from './spider-chart';
// 데이터 예제
var data = [
    {
        "Speed": 8,
        "Handling": 7,
        "Safety": 9,
        "Comfort": 8,
        "Efficiency": 7
    },
    {
        "Speed": 6,
        "Handling": 8,
        "Safety": 7,
        "Comfort": 9,
        "Efficiency": 8
    }
];
// 컨테이너 생성
var container = document.createElement('div');
container.id = 'chart';
container.style.width = '600px';
container.style.height = '600px';
document.body.appendChild(container);
// 기본 설정으로 차트 생성
var spiderChart = new SpiderChart({
    selector: '#chart',
    data: data,
    margin: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
    },
    domain: [0, 10],
    range: [0, 250],
    tickCount: 5,
    tickVisible: true,
    labelWidth: 60,
    isResize: true
});
spiderChart.draw();
// 고급 설정으로 차트 생성 예시
var advancedChart = new SpiderChart({
    selector: '#chart',
    data: data,
    margin: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
    },
    domain: [0, 100],
    range: [0, 300],
    tickCount: 10,
    tickVisible: false,
    labelWidth: 100,
    labelFmt: function (d) { return d.toUpperCase(); },
    isResize: true
}).draw();
// 데이터 업데이트 예제
setTimeout(function () {
    var newData = [
        {
            "Speed": 9,
            "Handling": 8,
            "Safety": 9,
            "Comfort": 8,
            "Efficiency": 8
        }
    ];
    spiderChart.setData(newData);
}, 2000);
//# sourceMappingURL=example.js.map