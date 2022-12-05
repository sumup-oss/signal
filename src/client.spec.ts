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

import { send } from './client';
import { IEnhancedMetric } from './types';

describe('client module', () => {
  const SERVICE_URL = 'http://service-url';

  beforeEach(() => {
    process.env = {
      ...process.env,
      SERVICE_URL,
    };
  });

  afterEach(() => {
    process.env = {
      ...process.env,
      SERVICE_URL: undefined,
    };
  });
  describe('send()', () => {
    it('should send all passed events', () => {
      const mockedNavigator = jest.mocked(navigator);
      mockedNavigator.sendBeacon = jest.fn();

      const mockedEvents = [
        {
          event_type: 'first-paint',
        },
        {
          event_type: 'first-contentful-paint',
        },
        {
          event_type: 'first-input-delay',
        },
        {
          event_type: 'time-to-interactive',
        },
        {
          event_type: 'custom-component-render',
        },
      ] as IEnhancedMetric[];

      send(mockedEvents);

      expect(mockedNavigator.sendBeacon).toHaveBeenNthCalledWith(
        1,
        SERVICE_URL,
        JSON.stringify(mockedEvents),
      );
    });
  });
});
