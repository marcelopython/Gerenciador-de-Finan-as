
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

export {
  formatError,
  errorHandle
}
