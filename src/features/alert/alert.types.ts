export const ALERT_TYPES = ["speed_camera", "accident", "hazard"] as const;
export type AlertType = (typeof ALERT_TYPES)[number];
