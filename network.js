const axios = require('axios')

const main = async () => {
  const api =
    'https://api.github.com/repos/krateoplatformops/krateo-template-ted/contents/template.yaml'

  axios
    .get(api)
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
