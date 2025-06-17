# Spider Chart

스파이더 차트(레이더 차트)는 여러 변수의 데이터를 2차원 그래프로 표현하는 차트입니다. 각 축은 하나의 변수를 나타내며, 데이터 포인트는 각 축에서의 값을 선으로 연결하여 표시됩니다.

## 설치

```bash
npm install @play-chart/spider-chart
```

## 기본 사용법

```typescript
import { SpiderChart, SpiderData } from '@play-chart/spider-chart';

// 데이터 정의
const data: SpiderData[] = [
    {
        "Speed": 8,
        "Handling": 7,
        "Safety": 9,
        "Comfort": 8,
        "Efficiency": 7
    }
];

// 차트 생성
const chart = new SpiderChart({
    selector: '#chart',
    data,
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
}).draw();
```

## 설정 옵션

### SpiderChartConfig

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| selector | string | - | 차트를 렌더링할 DOM 요소의 선택자 |
| data | SpiderData[] | - | 차트에 표시할 데이터 배열 |
| margin | Margin | { left: 10, right: 10, top: 10, bottom: 10 } | 차트의 여백 |
| domain | [number, number] | [0, 10] | 데이터의 범위 |
| range | [number, number] | [0, 250] | 차트의 크기 범위 |
| tickCount | number | 5 | 축의 눈금 개수 |
| tickVisible | boolean | true | 눈금 표시 여부 |
| labelWidth | number | 60 | 라벨의 최대 너비 |
| labelFmt | (d: string) => string | - | 라벨 포맷팅 함수 |
| isResize | boolean | false | 리사이즈 지원 여부 |

### SpiderData

```typescript
interface SpiderData {
    [key: string]: number;
}
```

## 메서드

### draw()
차트를 그립니다.

```typescript
chart.draw();
```

### setData(data: SpiderData[])
차트의 데이터를 업데이트합니다.

```typescript
chart.setData(newData);
```

### updateData(data: SpiderData[])
`setData`의 별칭입니다.

```typescript
chart.updateData(newData);
```

### resize()
차트를 리사이즈합니다.

```typescript
chart.resize();
```

### destroy()
차트를 제거합니다.

```typescript
chart.destroy();
```

## 예제

### 기본 차트
```typescript
const chart = new SpiderChart({
    selector: '#chart',
    data: [
        {
            "Speed": 8,
            "Handling": 7,
            "Safety": 9,
            "Comfort": 8,
            "Efficiency": 7
        }
    ]
}).draw();
```

### 고급 설정
```typescript
const chart = new SpiderChart({
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
    labelFmt: (d: string) => d.toUpperCase(),
    isResize: true
}).draw();
```

## 라이선스

MIT 