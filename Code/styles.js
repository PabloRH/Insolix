import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      marginTop: 20,
      alignItems: "center",
      justifyContent: "flex-start"
    },
    input: {
      width: 260,
      margin: 16,
      height: 60
    },
    btn: {
      backgroundColor: 'transparent',
      width: 260,
      height: 40,
      margin: 16,
      justifyContent: 'center'
    },
    bottomView: {
      flex: 1,
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default styles