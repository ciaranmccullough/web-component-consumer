# web-component-consumer

A basic website that consumes the `<speed-chart>` web component hosted on unpkg CDN.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## How it works

The `<speed-chart>` web component is loaded via a CDN script tag in `index.html`:

```html
<script type="module" src="https://unpkg.com/chart-web-component@2.0.2/dist/chart-component.js"></script>
```

Data is passed to the component by setting the `data` attribute with stringified JSON:

```js
const chart = document.getElementById("telemetry-chart");
chart.setAttribute("data", JSON.stringify(data));
```
