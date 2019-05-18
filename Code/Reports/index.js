import React from 'react'

import UserDataContext from '../App/UserDataContext'

import ReportsUser from './ReportsUser'
import ShowReportsAndEdit from './ShowReportsAndEdit'
import FAQsEdit from '../FAQsEdit'

const Reports = () => {
  return (
    <UserDataContext.Consumer>
      {({ data }) => {
        switch (data.Type) {
          case 'Usuario':
          case 'Fotografo':
            return <ReportsUser />
          case 'Operador':
          case 'Gerente Soporte':
          case 'Ing. Soporte':
          case 'Ing. Mantenimiento':
          case 'Gerente Mantenimiento':
            return <ShowReportsAndEdit />

          case 'Administrador':
            return 'Administrador'

          case 'Editor':
            return <FAQsEdit />
        }
      }}
    </UserDataContext.Consumer>
  )
}

export default Reports
