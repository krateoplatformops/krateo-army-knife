const axios = require('axios')

const params = {
  proxy: {
    host: 'localhost',
    port: 3000
  }
}

if (process.env.HTTP_PROXY) {
  params.proxy.host = process.env.HTTP_PROXY.split(':')[0]
  params.proxy.port = process.env.HTTP_PROXY.split(':')[1]
}

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
      console.log(err.response.data)
      console.log('#########################')
      console.log(err.response.headers)
    })
}

main()
