/**
 * Copyright 2020, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IMetricName, IMetric } from '@sumup/performance-observer';

// performance observer metrics enabled by default
const DEFAULT_METRICS = [
  'first-paint',
  'first-contentful-paint',
  'largest-contentful-paint',
  'first-input-delay',
  'cumulative-layout-shift',
  'time-to-first-byte',
];

// metrics that were enabled during the build by developer
const OVERWRITE_METRICS = process.env.PERFORMANCE_OBSERVER_METRICS?.split(',');

export const metrics = (OVERWRITE_METRICS || DEFAULT_METRICS) as IMetricName[];

export function formatValue(metric: IMetric): number {
  return metric.name === 'cumulative-layout-shift'
    ? metric.value // https://web.dev/cls/#what-is-cls
    : Math.floor(metric.value);
}
