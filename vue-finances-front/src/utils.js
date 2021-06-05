
const errorHandle = (error, vm, info) => {
  console.log('Vue [error handle]', error, info)

  const jwtErrors = ['jet malformed', 'jwt expired', 'jwt not active', 'invalid token']

  if (jwtErrors.some(jwtError => error.message.include(jwtError))) {
    vm.$router.push({
      path: '/login',
      query: { redirect: vm.$route.path }
    })
  }
}

const formatError = message => {
  const messageSplit = message.split(':')
  return messageSplit[messageSplit.length - 1].trim()
}

const currencyFormater = ({ location, currency } = { location: 'pt-BR', currency: 'BRL' }) => {
  return new Intl.NumberFormat(location, {
    style: 'currency',
    currency
  })
}

const groupBy = (array, key, makeCurrentKey) => {
  return array.reduce((accumulated, item) => {
    const currentKey = makeCurrentKey(item, key)
    return {
      ...accumulated,
      [currentKey]: [
        ...(accumulated[currentKey] || []),
        item
      ]
    }
  }, {})
}

export {
  currencyFormater,
  groupBy,
  formatError,
  errorHandle
}
