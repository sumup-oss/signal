##### Table of contents

- [What is it](#what-is-it)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Events](#events)
- [Customization](#customization)
- [Browser compatibility](#browser-compatibility)
- [Code of Conduct](#code-of-conduct)
- [Maintainers](#maintainers)
- [About SumUp](#about-sumup)

## What is it

Signal is a script that collects specific page performance events and sends them to a configurable service url.

## Installation

At the moment Signal is distributed as a _script_. Meaning you have to build your own version and embed it in your web page. In order to build your version of it, follow these steps:

Clone the repo using SSH

```bash
git clone git@github.com:sumup-oss/signal.git
```

Or using https

```bash
git clone https://github.com/sumup-oss/signal.git
```

Run

```bash
yarn
```

Copy the `.env.example` to `.env`:

```bash
cp .env.example .env
```

The `.env` file contains the following values:

```bash
SERVICE_URL=""
APPLICATION_NAME=""
PERFORMANCE_OBSERVER_METRICS=""
```

### Service url (mandatory)

The url where events will be send to

### Application name (optional)

This is app's identifier and is useful when you have more than one application which is sending events -

```bash
APPLICATION_NAME="my-app-name"
```

### Performance observer metrics (optional)

You can configure which metrics supported by [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) you want to track by specifying them in comma-separated list.

Please keep in mind that these 3 metrics are included by default:

- first-paint
- first-contentful-paint
- largest-contentful-paint
- first-input-delay
- cumulative-layout-shift
- time-to-first-byte

In the example below [custom user metrics](https://web.dev/custom-metrics/#user-timing-api) are enabled additionally to the default FCP and FID metrics -

```bash
PERFORMANCE_OBSERVER_METRICS="first-paint,first-contentful-paint,first-input-delay,user-timing"
```

## Usage

Now you are ready to build the script. If you want to customize the events, please refer to [Customization](#customization).

In order to generate the script, run

```bash
yarn build
```

Copy the output from `build/perf.js`

```bash
pbcopy < build/perf.js
```

Add the script to the `<head>` tag of your html file. This is required due to how you [collect the time-to-interactive](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#tracking_tti) metric.

## Events

Here's the full list of events that this script supports out of the box.

The events are provided by both the [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) and [PerformanceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) APIs.

### Via PerformanceObserver

- [x] first-paint ("paint" entry) _enabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
- [x] first-contentful-paint ("paint" entry) _enabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming
  - https://web.dev/fcp
- [x] first-input-delay ("first-input" entry) _enabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://developer.mozilla.org/en-US/docs/Glossary/First_input_delay
  - https://web.dev/fid
- [x] largest-contentful-paint ("largest-contentful-paint" entry) _enabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint
  - https://web.dev/lcp
- [x] cumulative-layout-shift ("layout-shift" entry) _enabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://web.dev/cls
- [x] time-to-first-byte ("navigation" entry) _enabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://web.dev/custom-metrics/#navigation-timing-api
  - https://web.dev/time-to-first-byte
- [x] user-timing ("measure" entry) _disabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure
  - https://web.dev/custom-metrics/#user-timing-api
- [x] element-timing ("element" entry) _disabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://web.dev/custom-metrics/#element-timing-api
- [x] resource-timing ("resource" entry) _disabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
  - https://web.dev/custom-metrics/#resource-timing-api
- [x] navigation-timing ("navigation" entry) _disabled by default, controlled via [config](https://github.com/sumup-oss/signal/tree/master/perf-script#performance-observer-metrics-optional)_
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
  - https://web.dev/custom-metrics/#navigation-timing-api
- [x] time-to-interactive _always enabled_ ("longtask" entry)
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
  - https://web.dev/custom-metrics/#long-tasks-api
  - https://web.dev/tti

### Via PerformanceTiming

- [x] dom-interactive _always enabled_
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
- [x] dom-content-loaded _always enabled_
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domContentLoadedEventEnd
- [x] dom-loading _always enabled_
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domLoading
- [x] dom-complete _always enabled_
  - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domComplete

More detailed documentation about each metric, how they relate to each other and how they should be used can be found in Confluence - https://sumupteam.atlassian.net/wiki/spaces/DEV/pages/1431569763/Tracking+Performance.

Keep in mind each API has a different browser support. Please refer to [Browser compatibility](#browser-compatibility) section for more info on it.

### Event dispatch

All events are transported using the [Navigator.sendBeacon api](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon).

The events from the PerformanceObserver API (first-paint, first-contentful-paint and time-to-interactive) are dispatched _individually_ and as soon as they are available, to avoid losing the data.

The events from the PerformanceTiming API (dom-interactive, dom-content-loaded, dom-loading, dom-complete) are batched into a single request and are dispatched after the `onload` event. This is due since we have to wait for some properties after the `onload` event anyways.

### Event enhancing

By default each event is enhanced with the following metadata:

```js
{
  event_name,
    user_agent,
    google_analytics_client_id,
    connection_type,
    effective_connection_type,
    url,
    timestamp,
    application;
}
```

Please refer to [Customization](#customization) for more information on how to add/remove properties and events

## Customization

You can customize both Events and Metadata fields.

### Customizing Events

You can edit both `PerformanceObserver` and `PerformanceTiming` handlers. All you have to do is edit the [perf.ts](src/perf.ts) file.

### Customizing Metadata fields

You'll have to edit two files:

- [The Event type definition](src/types.d.ts) `IEnhancedMetric`
- [The event enhancement function](src/event.ts) `enhance`

## Browser compatibility

The script is powered by three APIs:

- [Navigator.sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)
- [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
- [PerformanceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming)

If `sendBeacon` isn't available, the script won't be executed. There isn't a fallback with XHR due to the blocking nature of it.

Since each type of event has a different browser support, please refer to the table to understand which events you can support. The majority of the [PerformanceObserver APIs](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) that are required to get metric values, are only available in Chromium-based browsers (e.g. Google Chrome, Microsoft Edge, Opera, Brave, Samsung Internet, etc.).:

| Event                    |                                          Browser                                          |
| ------------------------ | :---------------------------------------------------------------------------------------: |
| first-paint              |                                         Chromium                                          |
| first-contentful-paint   |                                         Chromium                                          |
| largest-contentful-paint |                                         Chromium                                          |
| first-input-delay        |                                         Chromium                                          |
| cumulative-layout-shift  |                                         Chromium                                          |
| time-to-first-byte       |                                     Chromium, Firefox                                     |
| time-to-interactive      |                                         Chromium                                          |
| user-timing              |                                     Chromium, Firefox                                     |
| element-timing           |                                         Chromium                                          |
| resource-timing          |                                     Chromium, Firefox                                     |
| navigation-timing        |                                     Chromium, Firefox                                     |
| dom-interactive          | [Every major browser](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) |
| dom-content-loaded       | [Every major browser](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) |
| dom-loading              | [Every major browser](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) |
| dom-complete             | [Every major browser](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) |

## Code of conduct

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [SumUp Web Chapter](mailto:webchapter@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
