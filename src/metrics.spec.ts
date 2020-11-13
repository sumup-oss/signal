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

import { IMetric } from '@sumup/performance-observer';

import { formatValue } from './metrics';

describe('metrics module', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('formatValue()', () => {
    it('should not round CLS value', () => {
      const metric: IMetric = {
        name: 'cumulative-layout-shift',
        value: 0.125,
        meta: {
          entryType: 'layout-shift',
          entries: [],
          createdAt: Date.now(),
        },
      };
      const formatted = formatValue(metric);

      expect(formatted).toEqual(0.125);
    });

    it('should round other metrics to the nearest integer', () => {
      const metric: IMetric = {
        name: 'first-contentful-paint',
        value: 3012.622,
        meta: {
          entryType: 'paint',
          entries: [],
          createdAt: Date.now(),
        },
      };
      const formatted = formatValue(metric);

      expect(formatted).toEqual(3012);
    });
  });
});
