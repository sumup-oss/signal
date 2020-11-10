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

import { IRawMetric, IEnhancedMetric } from './types';
import { getCookie } from './cookies';
import { getConnectionInfo } from './connection';

export const enhance = (event: IRawMetric): IEnhancedMetric => {
  const { type, effectiveType } = getConnectionInfo();

  return {
    ...event,
    event_name: 'load performance tracking',
    user_agent: window.navigator.userAgent,
    google_analytics_client_id: getCookie('_ga'),
    connection_type: type,
    effective_connection_type: effectiveType,
    url: encodeURIComponent(window.location.href),
    timestamp: Date.now(),
    application: process.env.APPLICATION_NAME || '',
  };
};
