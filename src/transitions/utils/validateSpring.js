import { config } from 'react-spring'

function getConfig (springConfig) {
  if (typeof config === 'string') {
    return config.springConfig || {}
  }
  return springConfig || {}
}

function getCallback (callback) {
  if (typeof callback === 'function') return callback
  return null
}

function getOpacity (opacity) {
  if (typeof opacity === 'number' && opacity >= 0) return opacity
  return 1
}

function getTransform (transform) {
  if (transform && typeof transform === 'string') return transform
  return 'none'
}

export default function validateSpring (spring) {
  return {
    opacity: getOpacity(spring.opacity),
    transform: getTransform(spring.transform),
    config: getConfig(spring.config),
    onStart: getCallback(spring.onStart),
    onFrame: getCallback(spring.onFrame),
    onRest: getCallback(spring.onRest)
  }
}
