import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  inputTypeText: {
    width: 310,
    height: 56,
    borderWidth:1,
    borderColor: '#6B6B6B', 
    borderRadius: 15,
    fontSize: 16,
    paddingLeft: 15, 
    
  },
  button: {
    width: 310,
    height: 50,
    backgroundColor: '#F42F47', // Button background color
    borderRadius: 15,
    color:"white",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Add elevation for shadow effect (Android)
  },
  buttonFb:{
    backgroundColor: '#497AE0',
  },
  facebookIconSize:{
    width: 14,
    height: 25,
  },
  googleIconSize:{
    width: 37,
    height: 28,
  },
  buttonGoogle:{
    backgroundColor: 'white',
    color: '#4E4E4E',
    borderWidth: 2,
    borderColor: '#6B6B6B',
  },
  line:{
    borderColor:'#BCBCBC',
    width: 120,
    height: 1,
    },
});