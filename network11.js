const { fetch } = require('undici')

const main = async () => {
  const api =
    'https://api.github.com/repos/krateoplatformops/krateo-template-ted/contents/template.yaml'

  await fetch(api)
    .then(async (res) => {
      console.log(await res.json())
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
