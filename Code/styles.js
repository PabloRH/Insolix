import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: 260,
    margin: 16,
    height: 60,
  },
  btn: {
    backgroundColor: 'transparent',
    width: 260,
    height: 40,
    margin: 16,
    justifyContent: 'center',
  },
  bottomView: {
    flex: 1,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  margen: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  item: {
    height: Dimensions.get('window').width / 2,
    width: '50%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
})

export default styles
