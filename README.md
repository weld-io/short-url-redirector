# short-url-redirector

Redirects an URL, e.g. `shorturl.com/foo` -> `www.longerurl.com/path?id=foo`


## Run

Development:

    yarn dev

Production:

    yarn start


## Configuration

    export REDIRECT_PATHS=localhost:3001=https://www.weld.io/{id},localhost:3002=https://www.weld.io?q={id}

Where {id} is the path parameter that will be replaced.
