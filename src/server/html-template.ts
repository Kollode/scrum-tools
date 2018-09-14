export interface HtmlTemplateConfig {
  apolloState: object;
}

function htmlTemplate(reactMarkup: string, conf: HtmlTemplateConfig) {
  return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>React Example</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
            </head>
            <body>
              <div id="app">${reactMarkup}</div>
              <script>
                  window.__APOLLO_STATE__ = ${JSON.stringify(
                    conf.apolloState
                  ).replace(/</g, "\\u003c")};
              </script>
              <script src="/js/client.bundle.js" defer></script>
            </bod>
        </html>
    `;
}

export { htmlTemplate };
