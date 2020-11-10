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

export interface IRawMetric {
  event_type: string;
  performance: number;
}

export interface IEnhancedMetric extends IRawMetric {
  event_name: string;
  user_agent: string;
  google_analytics_client_id: string | null;
  connection_type: string | null;
  effective_connection_type: string | null;
  url: string;
  timestamp: number;
  application: string | null;
}

export interface IConnectionInfo {
  type: string | null;
  effectiveType: string | null;
}
