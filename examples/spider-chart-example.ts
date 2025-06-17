import { SpiderChart } from 'play-chart/spider';

// 데이터 예제
const data = [
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

// 차트 생성
const chart = new SpiderChart({
    container: '#chart-container',
    features: ['Speed', 'Handling', 'Safety', 'Comfort', 'Efficiency'],
    domain: [0, 10],
    tickCount: 5,
    labelWidth: 80
});

// 데이터 설정 및 차트 그리기
chart.setData(data).draw();

// 데이터 업데이트 예제
setTimeout(() => {
    const newData = [
        {
            "Speed": 9,
            "Handling": 8,
            "Safety": 9,
            "Comfort": 8,
            "Efficiency": 8
        }
    ];
    chart.setData(newData).draw();
}, 2000); 