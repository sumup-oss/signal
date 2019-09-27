/**
 * Copyright 2019, SumUp Ltd.
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

import { send } from './client';
import { enhance } from './event';

if ('sendBeacon' in navigator && 'PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list): void => {
    const entries = list.getEntries();

    for (const entry of entries) {
      /**
       * 'name' will be either 'first-paint' or 'first-contentful-paint'.
       */
      const metricName = entry.name;
      const time = Math.floor(entry.startTime + entry.duration);

      if (metricName) {
        send([
          enhance({
            event_type: metricName,
            performance: time
          })
        ]);
      }
    }
  });

  /**
   * Due to browser inconsistency, the try/catch block prevents unhandled
   * exceptions from browsers who support the Observer, but not the entries
   */
  try {
    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {}

  ttiPolyfill.getFirstConsistentlyInteractive().then((tti: number): void => {
    tti &&
      send([
        enhance({
          event_type: 'time-to-interactive',
          performance: Math.floor(tti)
        })
      ]);
  });
}

if ('sendBeacon' in navigator && 'performance' in window) {
  window.addEventListener('load', () => {
    const {
      navigationStart,
      domInteractive,
      domContentLoadedEventStart,
      domLoading,
      domComplete
    } = window.performance.timing;

    send(
      [
        /**
         * Here you can collect/send additional events
         */
        {
          event_type: 'dom-interactive',
          performance: domInteractive - navigationStart
        },
        {
          event_type: 'dom-content-loaded',
          performance: domContentLoadedEventStart - domLoading
        },
        {
          event_type: 'dom-loading',
          performance: domLoading - navigationStart
        },
        {
          event_type: 'dom-complete',
          performance: domComplete - navigationStart
        }
      ].map(e => enhance(e))
    );
  });
}
