# Horizontal Pointer Chart

Horizontal Pointer Chart(수평 포인터 차트)는 1차원 수치 데이터를 직관적으로 보여주는 단순하고 깔끔한 차트입니다. 값의 위치를 원(circle)과 축(axis)로 시각화하여, 게이지/슬라이더/점수 등 다양한 용도로 활용할 수 있습니다.

## 설치

```bash
npm install play-chart/horizontal-pointer-chart
```

## 기본 사용법

```typescript
import { HorizontalPointerChart } from 'play-chart/horizontal-pointer-chart';

// 데이터 정의 (단일 값도 배열로 전달)
const data = [50];

// 차트 생성
const chart = new HorizontalPointerChart({
    selector: '#chart',
    data,
    margin: {
        left: 50,
        right: 80,
        top: 10,
        bottom: 10
    },
    domain: [0, 100],
    unit: '%',
    isResize: true
}).draw();
```

## 설정 옵션

### HorizontalPointerChartConfig

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| selector | string | - | 차트를 렌더링할 DOM 요소의 선택자 |
| data | number[] | - | 차트에 표시할 값(배열, 보통 1개 값만 전달) |
| margin | Margin | { left: 50, right: 80, top: 10, bottom: 10 } | 차트의 여백 |
| domain | [number, number] | [0, 100] | 데이터의 범위 |
| unit | string | '' | 단위(%, 점 등) |
| isResize | boolean | false | 리사이즈 지원 여부 |

## 메서드

### draw()
차트를 그립니다.

```typescript
chart.draw();
```

### setData(data: number[])
차트의 값을 업데이트합니다.

```typescript
chart.setData([75]);
```

### updateData(data: number[])
`setData`의 별칭입니다.

```typescript
chart.updateData([30]);
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
const chart = new HorizontalPointerChart({
    selector: '#chart',
    data: [50],
    unit: '%'
}).draw();
```

### 고급 설정
```typescript
const chart = new HorizontalPointerChart({
    selector: '#chart',
    data: [75],
    margin: {
        left: 60,
        right: 100,
        top: 20,
        bottom: 20
    },
    domain: [0, 200],
    unit: '점',
    isResize: true
}).draw();
```

## 라이선스

MIT 