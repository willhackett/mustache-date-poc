const moment = require('moment')
const mustache = require('mustache')
require('moment-timezone')

const date = (input, format) => {
  return moment(input).format(format)
}

const datetz = (input, timezone, format) => {
  return moment.tz(input, timezone).format(format)
}

const parseArgs = (input) => {
  return input.split('||')
}

const template = (input, data) => {

}

const bindToMethod = method => () => (input, render) => {
  return method(...parseArgs(render(input)))
}

describe('templating', () => {
  test('should parse correctly', () => {
    const input = `{{name}} - some date object is {{#d}}{{date}}||DD/MM/YYYY{{/d}}.`

    const data = {
      name: 'John S',
      date: '2005-05-05',
      d: bindToMethod(date),
      dtz: bindToMethod(datetz),
    }

    const result = mustache.render(input, data)
    console.log(result)

    expect(result).toEqual('John S - some date object is 05/05/2005.')
  })
})

describe('dates', () => {
  test('should format correctly', () => {
    expect(date('2000-01-01', 'DD/MM/YYYY')).toEqual('01/01/2000')
    expect(datetz('2000-01-01', 'Europe/London', 'DD/MM/YYYY')).toEqual('01/01/2000')
  })
})

describe('input args', () => {
  test('should parse arguments to array', () => {
    expect(parseArgs('some||set||of||instructions')).toEqual(['some', 'set', 'of', 'instructions'])
  })
})
