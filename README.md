# webpack example by library

## npm install

Run `npm install`

## lite-server Global install

Run `npm install -g lite-server`

test

# Play Chart

Play Chart는 데이터 시각화를 위한 차트 라이브러리입니다.

## 차트 종류

- [Spider Chart](docs/spider-chart.md) - 스파이더 차트(레이더 차트) 컴포넌트

## 설치

```bash
npm install @play-chart/core
```

## 빌드 후 결과물로 테스트 시 해당 커멘드 실행
```bash
npm link
```

## import 구문 추가
```typescript
import {PlayChart} from 'play-chart';
```

## 차트 스타일 적용 방법

차트 컴포넌트를 사용할 때, 각 차트 타입에 맞는 CSS 파일도 함께 포함해야 기본 스타일이 정상적으로 적용됩니다.

### 1. npm 패키지 import 방식

npm으로 이 라이브러리를 설치했다면, 엔트리 파일(main.js, index.js 등)이나 컴포넌트에서 아래와 같이 CSS를 import 해주세요:

```js
// Horizontal Pointer Chart 스타일
import 'your-chart-lib/dist/assets/css/horizontal-pointer.css';

// Spider Chart 스타일
import 'your-chart-lib/dist/assets/css/spider.css';

// Image Spider Chart 스타일
import 'your-chart-lib/dist/assets/css/image-spider.css';
```

### 2. CDN 방식으로 사용

CDN(jsdelivr, unpkg 등)을 통해 직접 CSS를 불러올 수도 있습니다:

```html
<!-- Horizontal Pointer Chart -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/your-chart-lib/dist/assets/css/horizontal-pointer.css">

<!-- Spider Chart -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/your-chart-lib/dist/assets/css/spider.css">

<!-- Image Spider Chart -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/your-chart-lib/dist/assets/css/image-spider.css">
```

> **참고:**
> - 차트 컴포넌트를 렌더링하기 전에 반드시 CSS를 먼저 포함해야 합니다.
> - `your-chart-lib` 부분은 실제 패키지명으로 변경해서 사용하세요.

## 라이선스

MIT
