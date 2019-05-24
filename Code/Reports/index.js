import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'

import UserDataContext from '../App/UserDataContext'

import ReportsUser from './ReportsUser'
import ShowReportsAndEdit from './ShowReportsAndEdit'
import FAQsEdit from '../FAQsEdit'
import AddQuestion from '../AddQuestion'
import AddReport from './AddReport'

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
          case 'Programador':
          case 'Gerente Mantenimiento':
            return (
              <ScrollView>
                <ShowReportsAndEdit />
                <AddReport />
              </ScrollView>
            )

          case 'Administrador':
            return 'Administrador'

          case 'Editor':
            return (
              <ScrollView>
                <FAQsEdit />
                <AddQuestion />
              </ScrollView>
            )
        }
      }}
    </UserDataContext.Consumer>
  )
}

export default Reports
