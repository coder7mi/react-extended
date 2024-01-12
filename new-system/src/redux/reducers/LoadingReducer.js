const LoadingReducer = (
  prevState = {
    isLoading: false
  },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case 'change_Loading':
      const newState = { ...prevState }
      newState.isLoading = payload
      return newState
    default:
      return prevState
  }
}

export default LoadingReducer
