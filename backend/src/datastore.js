
const users = {
  '0': {
    id: '0',
    name: 'Bill Brasky',
    age: 55,
  },
  '1': {
    id: '1',
    name: 'Groot',
    age: 14,
  },
  '2': {
    id: '2',
    name: 'Star Lord',
    age: 31,
  },
  '3': {
    id: '3',
    name: 'Benjamin Button',
    age: 100,
  },
  '4': {
    id: '4',
    name: 'Lebron James',
    age: 32,
  },
}

function getUser(userId) {
  console.log('getUser - userId:', userId)
  return users[userId]
}

module.exports = { getUser }
