# App Dashboard

When running review applications in the cloud, it's possible that you're deploying multiple applications per
environment. Most deployment tools then only link to a single application URL, leaving you questioning what the other
application links could be.

No more, with the Enrise App Dashboard you add a simple dashboard page to your cloud within minutes, with just simple
adding some environment variables to configure it.

## Configuration

All configuration is done via environment variables. Add the desired configuration environment variables to your
container configuration.

| Environment variable         | Default value                 | Example                                      |
| ---------------------------- | ----------------------------- | -------------------------------------------- |
| `DASHBOARD_NAME`             | `"Dashboard"`                 | `"Acceptance environment"`                   |
| `DASHBOARD_IMAGE`            | The Enrise logo               | `"https://example.com/image.png"`            |
| `DASHBOARD_TEXT_COLOR`       | `"#000000"`                   | `"#ffffff"`                                  |
| `DASHBOARD_BACKGROUND_COLOR` | `"#f29a00"`                   | `"#000000"`                                  |
| `DASHBOARD_LINK_<name>`      | None, add as many as you want | `DASHBOARD_LINK_GOOGLE="https://google.com"` |

## Preview

| Default config                     | Custom config                       |
| ---------------------------------- | ----------------------------------- |
| ![](examples/enrise-dashboard.png) | ![](examples/nawcast-dashboard.png) |
| ![](examples/enrise-config.png)    | ![](examples/nawcast-config.png)    |

## Docker

```shell
docker run --rm -ti \
    --publish 3030:8000 \
    --env DASHBOARD_NAME="Production build" \
    --env DASHBOARD_LINK_DEVELOPMENT_SETUP="http://localhost:8000" \
    enrise/dashboard:latest
```

## Docker compose example

```yml
services:
    dashboard:
        image: enrise/dashboard:latest
        ports:
            - '8000:8000'
        environment:
            DASHBOARD_NAME: 'Local dashboard'
            DASHBOARD_LINK_WEBSITE_NL: 'https://nl.example.local'
            DASHBOARD_LINK_WEBSITE_EN: 'https://en.example.local'
            DASHBOARD_LINK_CMS: 'https://cms.example.local'
            DASHBOARD_LINK_MAIL: 'http://localhost:8080'
```

## Kubernetes example

To do.
