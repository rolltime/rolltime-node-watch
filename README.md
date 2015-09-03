## Node Watch API
Service designed to log the status of many Rolltime node collectors.

[![Build Status](https://travis-ci.org/rolltime/rolltime-node-watch.svg)](https://travis-ci.org/rolltime/rolltime-node-watch)

## Usage
The API has the following working methods:

* `/` **GET**: Retrieves a running list of node status.
* `/` **POST**: Stores a record of a node status. It needs the following arguments:
 * `id`: Node id. Nodes should have unique ids.
 * `status`: Either `error` or `ok`.
 * `message`: A string with the message. Required in case of `error`.
 * `time`: An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) time stamp (up to seconds).

Example request:

```shell
$ curl -X POST localhost:9000/ \
  -d "id=collector-ny-01&status=error&message='Failed to collect data.'&time=2015-06-01T14:34:01'"
```

## Docker Setup
[![](https://badge.imagelayers.io/luiscape/rolltime-node-watch:latest.svg)](https://imagelayers.io/?images=luiscape/rolltime-node-watch:latest 'Get your own badge on imagelayers.io')

Review the `Dockerfile` and run it linking to a MongoDB instance. `make setup` will try to setup its own collection in the instance (called `scraper_status`). This image doesn't need a volume mounted, but it needs the following environment variables in order to work appropriately:

* `MONOGDB_SCRAPER_STATUS_USER_NAME`: Dedicated user name for manipulating collections.
* `MONGODB_SCRAPER_STATUS_USER_PASSWORD`: Password for the user above.

Those should be passed when running the image.

```shell
$ docker run -d --name scraper_status \
  --link mongo:mongo \
  -e MONOGDB_SCRAPER_STATUS_USER_NAME=foo \
  -e MONGODB_SCRAPER_STATUS_USER_PASSWORD=bar \
  luiscape/hdx-monitor-scraper-status:latest
```
