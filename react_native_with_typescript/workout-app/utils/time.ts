export const humanDuration = (seconds): string => {
  const _hours = Math.floor(seconds / 3600)
  const _minutes = Math.floor((seconds - _hours * 3600) / 60)
  const _seconds = seconds % 60

  const plural = 's'
  const connector = 'and'

  let hoursText = `${_hours} hour`
  _hours > 1 && (hoursText += plural)

  let minutesText = `${_minutes} minute`
  _minutes > 1 && (minutesText += plural)

  let secondsText = `${_seconds} second`
  _seconds > 1 && (secondsText += plural)

  const sentence = []
  _hours && sentence.push(hoursText)
  _minutes && sentence.push(minutesText)
  _seconds && sentence.push(connector, secondsText)

  return sentence.join(' ')
}
