const express = require('express')
const app = express()

const config = (process.env.REDIRECT_PATHS || '').split(',').reduce((result, pathInfo) => {
  const pathInfoArray = pathInfo.split('=')
  result[pathInfoArray[0]] = { urlTemplate: pathInfoArray[1] }
  return result
}, {})

app.get('/:id', (req, res) => {
  const siteConfig = config[req.get('host')]
  if (siteConfig) {
    const pageId = req.path.substr(1)
    const newUrl = siteConfig.urlTemplate.replace('{id}', pageId)
    console.log(`Forwarding ${pageId} to ${newUrl}`);
    res.set('location', newUrl);
    res.status(302).send()
  }
  else {
    res.send(`Sorry, no configuration set up for the domain name "${req.get('host')}".`)
  }
})
app.get('*', (req, res) => res.send(`How to use: ${req.get('host')}/{id}`))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`App listening on port ${PORT}\nConfig:`, config))
