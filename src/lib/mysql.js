import Mysql from 'mysql-pro'

export const openConnection = () => {
  return new Mysql({
    mysql: {
      host: 'mysql.docker',
      user: 'root',
      password: '',
      database: 'demo_db',
      multipleStatements: true // because I want to setup from nothing with a single script
    }
  })
}

