import mysql from 'mysql-pro'

const { assign } = Object

export const openConnection = () => {
  return new mysql({
    mysql: {
      host     : 'mysql.docker',
      user     : 'root',
      password : '',
      database : 'demo_db',
      multipleStatements: true // because I want to setup from nothing with a single script
    }
  })
}

