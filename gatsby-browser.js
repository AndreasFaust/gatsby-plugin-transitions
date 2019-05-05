exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  // const currentPosition = getSavedScrollPosition(location)
  // const queriedPosition = getSavedScrollPosition({ pathname: `/random` })

  // window.scrollTo(...(currentPosition || [0, 0]))

  return false
}
