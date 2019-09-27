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

/**
 * Creates a PerformanceObserver instance and starts observing longtask entry types.
 * This snippet is a temporary workaround, until browsers implement level 2
 * of the Performance Observer spec and include the buffered flag
 */

(function(): void {
  if ('PerformanceLongTaskTiming' in window) {
    const g = ((window as any).__tti = { e: [] }) as any;
    g.o = new PerformanceObserver((l: PerformanceObserverEntryList): void => {
      g.e = g.e.concat(l.getEntries());
    });
    g.o.observe({ entryTypes: ['longtask'] });
  }
})();
