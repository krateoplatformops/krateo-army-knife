const ldap = require('ldapjs')
const winston = require('winston')

// ################################################################################
// Settings
// ################################################################################
const settings = {
  url: process.env.URL || 'ldap://localhost:10389',
  timeout: process.env.TIMEOUT || 5000,
  dn: process.env.DN || 'cn=admin,dc=planetexpress,dc=com',
  password: process.env.PASSWORD || 'GoodNewsEveryone',
  search: process.env.SEARCH || 'dc=planetexpress,dc=com',
  opts: {
    filter: '(objectClass=group)',
    scope: process.env.SCOPE || 'sub',
    attributes: process.env.ATTRIBUTES || [
      'dn',
      'sn',
      'cn',
      'displayName',
      'mail'
    ],
    paged: {
      pageSize: 100,
      pagePause: true
    }
  },
  logLevel: process.env.LOG_LEVEL || 'info'
}
// ################################################################################

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || settings.logLevel,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

const client = ldap.createClient({
  url: settings.url,
  timeout: settings.timeout
})

client.bind(settings.dn, settings.password, (err) => {
  if (err) {
    logger.error(err)
    client.unbind()
  }
})

client.on('error', (err) => {
  logger.error(err)
})

let count = 0

client.search(settings.search, settings.opts, (err, res) => {
  if (err) {
    logger.error(err)
  }
  res.on('searchRequest', (searchRequest) => {
    logger.debug(`searchRequest: ${searchRequest.messageID}`)
  })
  res.on('page', (result, cb) => {
    if (cb) {
      cb()
    } else {
      logger.debug('pagination ends')
    }
  })
  res.on('searchEntry', (entry) => {
    count++
    logger.info('User', entry.object)
  })
  res.on('error', (err) => {
    logger.error(err)
  })
  res.on('end', () => {
    logger.warn(`Found ${count} users`)
    client.unbind()
  })
})
