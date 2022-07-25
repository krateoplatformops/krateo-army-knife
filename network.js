const axios = require('axios')

const params = {
  proxy: {
    host: 'localhost',
    port: 3000
  }
}

if (process.env.PROXY_URL && process.env.PROXY_PORT) {
  params.proxy.host = process.env.PROXY_URL
  params.proxy.port = parseInt(process.env.PROXY_PORT)
}

console.log(params)

const main = async () => {
  const api =
    'https://api.github.com/repos/krateoplatformops/krateo-template-ted/contents/template.yaml'

  axios
    .get(api, params)
    .then((res) => {
      console.log(res.data)
      console.log('Ok!')
    })
    .catch((err) => {
      console.log(err)
      try {
        console.log('#########################')
        console.log(err.response.headers)
      } catch {}
    })
}

main()
