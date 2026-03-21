/**
 * Compile-time type tests for the branded unit type system.
 *
 * This file contains NO runtime code. It only checks that the type system
 * correctly rejects invalid cross-unit assignments at compile time.
 *
 * Every @ts-expect-error line MUST produce a type error. If the branded types
 * are implemented correctly, `npm run build` will pass. If someone weakens the
 * types so that a line stops being an error, the "unused @ts-expect-error
 * directive" error will fail the build.
 */

import type {
  Meters,
  Pixels,
  Radians,
  Degrees,
  Seconds,
  MetersPerSec,
  MetersPerSecSq,
  Newtons,
  Kilograms,
  Joules,
  NewtonsPerMeter,
  RadiansPerSec,
  RadiansPerSecSq,
  NewtonSecondsPerMeter,
  UnitlessCoefficient,
} from "./units";

import {
  degreesToRadians,
  radiansToDegrees,
  metersToPixels,
  pixelsToMeters,
} from "./units";

// ---- Test values (no runtime, just type-level) ----

declare const m: Meters;
declare const px: Pixels;
declare const rad: Radians;
declare const deg: Degrees;
declare const sec: Seconds;
declare const mps: MetersPerSec;
declare const mpss: MetersPerSecSq;
declare const n: Newtons;
declare const kg: Kilograms;
declare const j: Joules;
declare const npm: NewtonsPerMeter;
declare const rps: RadiansPerSec;
declare const rpss: RadiansPerSecSq;
declare const nspm: NewtonSecondsPerMeter;
declare const coeff: UnitlessCoefficient;
declare const scale: number;
declare const canvasHeight: Pixels;

// ============================================================
// 1. Cross-unit assignments must be rejected
// ============================================================

// Length vs Length
// @ts-expect-error — Meters is not assignable to Pixels
const _1: Pixels = m;
// @ts-expect-error — Pixels is not assignable to Meters
const _2: Meters = px;

// Angle vs Angle
// @ts-expect-error — Degrees is not assignable to Radians
const _3: Radians = deg;
// @ts-expect-error — Radians is not assignable to Degrees
const _4: Degrees = rad;

// Length vs Angle (totally different dimensions)
// @ts-expect-error — Meters is not assignable to Radians
const _5: Radians = m;

// Force vs Energy
// @ts-expect-error — Newtons is not assignable to Joules
const _6: Joules = n;

// Velocity vs Acceleration
// @ts-expect-error — MetersPerSec is not assignable to MetersPerSecSq
const _7: MetersPerSecSq = mps;

// Angular velocity vs Angular acceleration
// @ts-expect-error — RadiansPerSec is not assignable to RadiansPerSecSq
const _8: RadiansPerSecSq = rps;

// Damping coefficient vs Dimensionless (the actual ambiguity in the codebase)
// @ts-expect-error — NewtonSecondsPerMeter is not assignable to UnitlessCoefficient
const _9: UnitlessCoefficient = nspm;
// @ts-expect-error — UnitlessCoefficient is not assignable to NewtonSecondsPerMeter
const _10: NewtonSecondsPerMeter = coeff;

// Spring constant vs Force
// @ts-expect-error — NewtonsPerMeter is not assignable to Newtons
const _11: Newtons = npm;

// ============================================================
// 2. Bare numbers must be rejected
// ============================================================

// @ts-expect-error — bare number is not assignable to Meters
const _12: Meters = 5;
// @ts-expect-error — bare number is not assignable to Radians
const _13: Radians = 3.14;
// @ts-expect-error — bare number is not assignable to Kilograms
const _14: Kilograms = 1;

// ============================================================
// 3. Conversion functions must return the correct type
// ============================================================

const _ok1: Radians = degreesToRadians(deg);
const _ok2: Degrees = radiansToDegrees(rad);
const _ok3: Pixels = metersToPixels(m, scale);
const _ok4: Meters = pixelsToMeters(px, scale);

// Conversion output must not be assignable to the input type
// @ts-expect-error — degreesToRadians returns Radians, not Degrees
const _15: Degrees = degreesToRadians(deg);
// @ts-expect-error — radiansToDegrees returns Degrees, not Radians
const _16: Radians = radiansToDegrees(rad);
// @ts-expect-error — metersToPixels returns Pixels, not Meters
const _17: Meters = metersToPixels(m, scale);
// @ts-expect-error — pixelsToMeters returns Meters, not Pixels
const _18: Pixels = pixelsToMeters(px, scale);

// Conversion input must be the correct type
// @ts-expect-error — degreesToRadians requires Degrees, not Radians
const _19: Radians = degreesToRadians(rad);
// @ts-expect-error — radiansToDegrees requires Radians, not Degrees
const _20: Degrees = radiansToDegrees(deg);
// @ts-expect-error — metersToPixels requires Meters, not Pixels
const _21: Pixels = metersToPixels(px, scale);
// @ts-expect-error — pixelsToMeters requires Pixels, not Meters
const _22: Meters = pixelsToMeters(m, scale);

// ============================================================
// 4. Same-type assignments must work
// ============================================================

const _ok5: Meters = m;
const _ok6: Radians = rad;
const _ok7: Newtons = n;
const _ok8: UnitlessCoefficient = coeff;
