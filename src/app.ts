interface TelemetryPoint {
  distance: number;
  speed: number;
}

interface DriverTrace {
  name: string;
  color: string;
  points: TelemetryPoint[];
}

interface SectorMarker {
  label: string;
  distance: number;
}

interface SpeedChartData {
  drivers: DriverTrace[];
  sectors: SectorMarker[];
  maxDistance?: number;
  maxSpeed?: number;
}

const telemetryData: SpeedChartData = {
  drivers: [
    {
      name: "cm_ciaran",
      color: "#00e5ff",
      points: [
        { distance: 0, speed: 310 },
        { distance: 80, speed: 318 },
        { distance: 160, speed: 315 },
        { distance: 240, speed: 308 },
        { distance: 320, speed: 285 },
        { distance: 400, speed: 245 },
        { distance: 480, speed: 195 },
        { distance: 560, speed: 180 },
        { distance: 640, speed: 185 },
        { distance: 720, speed: 192 },
        { distance: 800, speed: 210 },
        { distance: 920, speed: 245 },
        { distance: 1040, speed: 275 },
        { distance: 1160, speed: 295 },
        { distance: 1280, speed: 310 },
        { distance: 1400, speed: 318 },
        { distance: 1520, speed: 320 },
        { distance: 1640, speed: 315 },
        { distance: 1760, speed: 305 },
        { distance: 1880, speed: 290 },
        { distance: 2000, speed: 270 },
        { distance: 2120, speed: 248 },
        { distance: 2240, speed: 220 },
        { distance: 2360, speed: 195 },
        { distance: 2480, speed: 175 },
        { distance: 2600, speed: 170 },
        { distance: 2720, speed: 178 },
        { distance: 2840, speed: 195 },
        { distance: 2960, speed: 215 },
        { distance: 3080, speed: 238 },
        { distance: 3200, speed: 255 },
        { distance: 3320, speed: 268 },
        { distance: 3440, speed: 275 },
        { distance: 3560, speed: 282 },
        { distance: 3680, speed: 288 },
        { distance: 3800, speed: 290 },
        { distance: 3920, speed: 292 },
        { distance: 4000, speed: 295 },
      ],
    },
    {
      name: "Ruben_RPM",
      color: "#ff6b6b",
      points: [
        { distance: 0, speed: 308 },
        { distance: 80, speed: 315 },
        { distance: 160, speed: 318 },
        { distance: 240, speed: 312 },
        { distance: 320, speed: 290 },
        { distance: 400, speed: 255 },
        { distance: 480, speed: 205 },
        { distance: 560, speed: 188 },
        { distance: 640, speed: 190 },
        { distance: 720, speed: 200 },
        { distance: 800, speed: 225 },
        { distance: 920, speed: 258 },
        { distance: 1040, speed: 282 },
        { distance: 1160, speed: 300 },
        { distance: 1280, speed: 312 },
        { distance: 1400, speed: 320 },
        { distance: 1520, speed: 322 },
        { distance: 1640, speed: 318 },
        { distance: 1760, speed: 310 },
        { distance: 1880, speed: 295 },
        { distance: 2000, speed: 278 },
        { distance: 2120, speed: 258 },
        { distance: 2240, speed: 232 },
        { distance: 2360, speed: 205 },
        { distance: 2480, speed: 185 },
        { distance: 2600, speed: 178 },
        { distance: 2720, speed: 185 },
        { distance: 2840, speed: 202 },
        { distance: 2960, speed: 222 },
        { distance: 3080, speed: 245 },
        { distance: 3200, speed: 262 },
        { distance: 3320, speed: 272 },
        { distance: 3440, speed: 278 },
        { distance: 3560, speed: 285 },
        { distance: 3680, speed: 290 },
        { distance: 3800, speed: 294 },
        { distance: 3920, speed: 296 },
        { distance: 4000, speed: 298 },
      ],
    },
  ],
  sectors: [
    { label: "S1", distance: 0 },
    { label: "S2", distance: 1500 },
    { label: "S3", distance: 3000 },
  ],
  maxDistance: 4000,
  maxSpeed: 365,
};

document.addEventListener("DOMContentLoaded", () => {
  const chart = document.getElementById("telemetry-chart");
  if (chart) {
    chart.setAttribute("data", JSON.stringify(telemetryData));
  }
});
