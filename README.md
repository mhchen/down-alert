# Down Alert

Down alert is a small utility that polls a list of URLs and sends email alerts when it detects non-200 status codes. This is useful as a barebones monitor to make sure non-critical personal sites stay running, but obviously is not a substitute for a real monitoring service.

Currently only [Sendgrid](https://sendgrid.com/) is usable as an email platform. The free tier should be reasonable for this purpose unless you need to monitor dozens of sites that are going down constantly.

## Sendgrid API
Down alert requires an [API Key](https://sendgrid.com/docs/Classroom/Send/How_Emails_Are_Sent/api_keys.html) generated in Sendgrid. The generated key requires Mail Send permissions and nothing else.

## Installation

```
$ npm i -g down-alert
```

## Usage

```
  Usage: down-alert <url ...> [options]

  Options:

    -c, --cron-format <cron>    Cron format (e.g. "* * * * *") of frequency to poll. Defaults to 0 0 * * * * (hourly)
    -t, --to <to>               Email address to send alerts to
    -f, --from <from>           Email address to send alerts from
    -lf, --log-file <filename>  File to write logs messages to
    -ll, --log-level <level>    Log level (e.g. debug, info, error)
    -y, --yes                   Skip confirmation prompt
    --send-test-email           Sends a test email to verify your email credentials
    -h, --help                  output usage information
```

Down alert requires `to` and `from` options. The others are optional. It also requires a `SENDGRID_API_KEY` environment variable. See below for example usage.

`down-alert` relies on [node-cron](https://github.com/kelektiv/node-cron) under the hood so the `cron-format` option uses the same cron patterns. 

Example usage:

```
$ SENDGRID_API_KEY=alfkv10jmv,x.2jfkubyh1-zlj down-alert https://www.google.com https://www.facebook.com --to=foo@bar.com --from=no-reply@yourdomain.com
```

It's ideal to run this as a background task either using `screen` or `tmux`. It's also ideal to run it on a machine that polls sites served from other machines (since obviously if sites are down because the machine is offline for some reason, you won't be able to figure that out if you are running this script on said machine).

## TODO

* Options to run as daemon
* Add timestamps and granularity to logging
* (Maybe) Allow non-Sendgrid transport (maybe `sendmail`)?
* (Maybe) More user-friendly cron format
