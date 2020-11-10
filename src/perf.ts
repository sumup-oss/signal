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

import './tti-bootstrap';
import ttiPolyfill from 'tti-polyfill';
import {
  IMetric,
  observeAll,
  metricHistory,
  registeredObservers,
} from '@sumup/performance-observer';

import { metrics, formatValue } from './metrics';
import { send } from './client';
import { enhance } from './event';

if ('sendBeacon' in navigator && 'PerformanceObserver' in window) {
  window.__PERF_DEBUG_DATA__ = {
    metrics,
    metricHistory,
    registeredObservers,
  };
  observeAll(metrics, (metric: IMetric) => {
    send([
      enhance({
        event_type: metric.name,
        performance: formatValue(metric),
      }),
    ]);
  });

  ttiPolyfill
    .getFirstConsistentlyInteractive()
    .then((tti) => {
      if (tti) {
        send([
          enhance({
            event_type: 'time-to-interactive',
            performance: Math.floor(tti),
          }),
        ]);
      }
    })
    .catch(() => {});
}

if ('sendBeacon' in navigator && 'performance' in window) {
  window.addEventListener('load', () => {
    const {
      navigationStart,
      domInteractive,
      domContentLoadedEventStart,
      domLoading,
      domComplete,
    } = window.performance.timing;

    send(
      [
        {
          event_type: 'dom-interactive',
          performance: domInteractive - navigationStart,
        },
        {
          event_type: 'dom-content-loaded',
          performance: domContentLoadedEventStart - domLoading,
        },
        {
          event_type: 'dom-loading',
          performance: domLoading - navigationStart,
        },
        {
          event_type: 'dom-complete',
          performance: domComplete - navigationStart,
        },
      ].map((e) => enhance(e)),
    );
  });
}
