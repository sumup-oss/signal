[![License](https://img.shields.io/badge/license-Apache%202-lightgrey.svg)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

<div align="center">

# Signal

Collect and send page performance metrics with ease

</div>

##### Table of contents

- [What is it](#what-is-it)
- [Installation](#installation)
- [Events](#events)
- [Customization](#customization)
- [Browser compatibility](#browser-compatibility)
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
SERVICE_URL="" # (Required) The endpoint where events will be send to
APPLICATION_NAME="" # (Optional) the application identier. This is useful when you have more than one application sending events
```

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

The events are provided by both the [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) and [PerformanceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) APIs.

### Via PerformanceObserver ([paint entry](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming))

- first-paint
- first-contentful-paint

### Via PerformanceObserver ([longtask entry](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming))

- time-to-interactive

### Via PerformanceTiming

- dom-interactive
- dom-content-loaded
- dom-loading
- dom-complete

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

Since each type of event has a different browser support, please refer to the table to understand which events you can support:

| Event                  |                                          Browser                                          |
| ---------------------- | :---------------------------------------------------------------------------------------: |
| first-paint            |                                        Chrome only                                        |
| first-contentful-paint |                                        Chrome only                                        |
| time-to-interactive    |                                        Chrome only                                        |
| dom-interactive        | [Every major browser](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) |
| dom-content-loaded     | [Every major browser](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) |
| dom-loading            | [Every major browser](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) |
| dom-complete           | [Every major browser](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) |

## Code of conduct (CoC)

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [SumUp Web Chapter](mailto:webchapter@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
