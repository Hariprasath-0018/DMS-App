import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
//import axios from 'axios';
// import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import App from '../App'; 
// import RNRestart from 'react-native-restart';


//let db=SQLite.openDatabase({name:'Staffdb'});
export default function LoginPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');// Initialize navigation hook
  // const [userError, setuserError] = useState(null);// Initialize navigation hook
  // const [passError, setpassError] = useState(null);// Initialize navigation hook
  // const [sqlData, setsqlData] = useState([]);// Initialize navigation hook
  // const db=SQLite.openDatabase('StaffLogin.db');


  const handlechangetext=(text)=>{
    setpassError(null);
    setuserError(null);
  }
  // const handleLogin = () => {
  //   // Assuming 'username' and 'password' are defined somewhere in your code
  //   if (username === 'Admin' && password === '12345') {
  //     console.log("Navigating to SELECT");
  //     navigation.navigate('Select');

  //   } 
  //   else if(username === '' && password === '') {
  //     // Handle case when username or password is null
  //     console.error("Username or password is null");
  //     setuserError("Please Enter Username");
  //     setpassError("Please Enter Password");
  //     return;
  //   }
  //   else if(username !== 'Admin' || password !== '12345') {
  //     // Handle case when username or password is null
  //     console.error("Username or password is null");
  //     setuserError("Incorrect Username");
  //     setpassError("Incorrect Password");
  //     return;
  //   }
  // };

  const handleSubmit = () => {
    
    console.log(username, password);
    const userData = {
      username: username,
      password
    }
    axios
      .post("http://192.168.253.106:5003/login-user", userData)
      .then(res => {
        console.log(res.data);
        if(res.data.status == 'ok')
        {
          console.log("Login success")
          //Alert.alert('Login success!');
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          navigation.navigate('Select');
        }
        else{
          Alert.alert(JSON.stringify(res.data));
        }
      });
      
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='always'>
    <View style={{ flex: 1, backgroundColor: "#D6FFFE", paddingTop: 50, alignItems: 'center' }}>

      <Text style={styles.heading}>STAFF - LOGIN</Text>

      <View style={{ alignItems: "center" }}>
        <Image
          source={require('../assets/VCET_Logo.png')}
          style={styles.image} />
      </View>

      {/* {onChangeText={(text)=>{setUsername(text);handlechangetext(text)}}} 
      onChangeText={(text)=>{setPassword(text);handlechangetext(text);}}*/}

      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="User Name" onChange={(e) => setUsername(e.nativeEvent.text)} />
        {/* <Text style={styles.errorText}>{userError}</Text> */}
        <Text></Text>
        <TextInput style={styles.textInput} placeholder="Password" onChange={(e) => setPassword(e.nativeEvent.text)} />
        {/* <Text style={styles.errorText}>{passError}</Text> */}
        <Text></Text>
        <Button title="Login" onPress={() => handleSubmit()} color='#00D4FF' />

        <View style={styles.notice}>
          <Text style={{ fontWeight: 'bold' }}>NOTE : </Text>
          <Text style={{ color: 'green', }}>Staff Login Only. Thank You !!</Text>
        </View>

      </View>

    </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightblue"
  },
  inputContainer: {
    height: 350,
    width: 330,
    marginTop: 60,
    borderColor: '#75EDFC',
    borderWidth: 3,
    borderRadius: 25,
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#ADF2FB'
  },
  textInput: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: 'grey'
  },
  heading: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
    letterSpacing: 3,
    lineHeight: 55,
    backgroundColor: '#46D6FC',
    marginBottom: 20,
    borderTopColor: '#009EFF',
    borderBottomColor: '#009EFF',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    marginTop: 10
  },
  image: {
    width: 100,
    height: 110,
    position: 'relative',
  },
  notacc: {
    width: 170,
    height: 170,
    fontSize: 15,
    position: 'relative',
    left: 25,
    top: 45,
  },
  signup: {
    position: 'relative',
    left: 190,
    top: -125,
    color: "red",
  },
  shadow: {
    position: "relative",
    borderRadius: 10,
    elevation: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  notice: {
    backgroundColor: '#75EDFC',
    padding: 5,
    borderRadius: 7,
    position: 'relative',
    top: 40,
    flexDirection: 'row',
    columnGap: 5,
    justifyContent: 'center',
  }
});


//   useEffect(()=>{
//     db.transaction(tx=>{
//       tx.executeSql("CREATE TABLE IF NOT EXIST names(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT)")
//     });
//     db.transaction(tx => {
//       tx.executeSql( 'SELECT * FROM names' ,
//       null,
//       (txObj, resultSet) =>setsqlData(resultSet. rows._array) ,
//       (txObj, error)=> console. log(error)
//     );
//   });
// },[]);


// const showNames=()=>{
//   return sqlData.map((names,index)=>{
//     return(
//       <View  key={index} style={{}}>
//         <Text>{names.name}</Text>
//       </View>
//     );
//   });
// };

// const addName=()=>{
//   db.transaction(tx =>{
//     tx.executeSql('INSERT INTO names (name) values (?)',[username],
//     (txObj,resultSet) =>{
//       let existingNames=[...names];
//       existingNames.push({id:resultSet.insertId,name:username});
//       setsqlData(existingNames);
//     },
//     (txObj,error) => console.log(error)
//   );
//   });
// }

//for mongo db
  // const handleLogin = () => {
  //   if(username!=null | password!=null){}
  //   const loginData={username:username,password};
  //   navigation.navigate('Select');
  //   axios.post("http://localhost:5001/Login",loginData).then((res)=>console.log(res.data))

  // };
  //   const handleLogin = () => {
  //     // Assuming 'username' and 'password' are defined somewhere in your code
  //     if (username !== null && password !== null) {
  //       console.log("dsnfsijfn");
  //         const loginData = { username: username, password: password };

  //         axios.post("http://172.16.35.239:5001/Login", loginData)
  //             .then((res) => {
  //                 console.log(res.data);
  //                 navigation.navigate('Select');
  //             })
  //             .catch((error) => {
  //                 console.log("Error logging in:", error);
  //                 // Handle error appropriately, e.g., show an error message to the user
  //             });
  //     } else {
  //         // Handle case when username or password is null
  //         console.error("Username or password is null");
  //         setuserError("Please enter the username");
  //         setpassError("Please enter the password");
  //         return;
  //     }
  // };








// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
// import axios from 'axios';
// // import {openDatabase} from 'react-native-sqlite-storage';
// import * as SQLite from 'expo-sqlite';

// let db=SQLite.openDatabase({name:'Staffdb'});
// export default function LoginPage() {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');// Initialize navigation hook
//   const [userError, setuserError] = useState(null);// Initialize navigation hook
//   const [passError, setpassError] = useState(null);// Initialize navigation hook
//   const [sqlData, setsqlData] = useState([]);// Initialize navigation hook
//   const db=SQLite.openDatabase('StaffLogin.db');
// //   useEffect(()=>{
// //     db.transaction(tx=>{
// //       tx.executeSql("CREATE TABLE IF NOT EXIST names(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT)")
// //     });
// //     db.transaction(tx => {
// //       tx.executeSql( 'SELECT * FROM names' ,
// //       null,
// //       (txObj, resultSet) =>setsqlData(resultSet. rows._array) ,
// //       (txObj, error)=> console. log(error)
// //     );
// //   });
// // },[]);


// // const showNames=()=>{
// //   return sqlData.map((names,index)=>{
// //     return(
// //       <View  key={index} style={{}}>
// //         <Text>{names.name}</Text>
// //       </View>
// //     );
// //   });
// // };

// // const addName=()=>{
// //   db.transaction(tx =>{
// //     tx.executeSql('INSERT INTO names (name) values (?)',[username],
// //     (txObj,resultSet) =>{
// //       let existingNames=[...names];
// //       existingNames.push({id:resultSet.insertId,name:username});
// //       setsqlData(existingNames);
// //     },
// //     (txObj,error) => console.log(error)
// //   );
// //   });
// // }

// //for mongo db
//   // const handleLogin = () => {
//   //   if(username!=null | password!=null){}
//   //   const loginData={username:username,password};
//   //   navigation.navigate('Select');
//   //   axios.post("http://localhost:5001/Login",loginData).then((res)=>console.log(res.data))

//   // };
//   //   const handleLogin = () => {
//   //     // Assuming 'username' and 'password' are defined somewhere in your code
//   //     if (username !== null && password !== null) {
//   //       console.log("dsnfsijfn");
//   //         const loginData = { username: username, password: password };

//   //         axios.post("http://172.16.35.239:5001/Login", loginData)
//   //             .then((res) => {
//   //                 console.log(res.data);
//   //                 navigation.navigate('Select');
//   //             })
//   //             .catch((error) => {
//   //                 console.log("Error logging in:", error);
//   //                 // Handle error appropriately, e.g., show an error message to the user
//   //             });
//   //     } else {
//   //         // Handle case when username or password is null
//   //         console.error("Username or password is null");
//   //         setuserError("Please enter the username");
//   //         setpassError("Please enter the password");
//   //         return;
//   //     }
//   // };




//   const handlechangetext=(text)=>{
//     setpassError(null);
//     setuserError(null);
//   }
//   const handleLogin = () => {
//     // Assuming 'username' and 'password' are defined somewhere in your code
//     if (username === 'Admin' && password === '12345') {
//       console.log("dsnfsijfn");
//       navigation.navigate('Select');

//     } 
//     else if(username === '' && password === '') {
//       // Handle case when username or password is null
//       console.error("Username or password is null");
//       setuserError("Please Enter Username");
//       setpassError("Please Enter Password");
//       return;
//     }
//     else if(username !== 'Admin' || password !== '12345') {
//       // Handle case when username or password is null
//       console.error("Username or password is null");
//       setuserError("Incorrect Username");
//       setpassError("Incorrect Password");
//       return;
//     }
 
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#D6FFFE", paddingTop: 50, alignItems: 'center' }}>

//       <Text style={styles.heading}>STAFF - LOGIN</Text>

//       <View style={{ alignItems: "center" }}>
//         <Image
//           source={require('../assets/VCET_Logo.png')}
//           style={styles.image} />
//       </View>


//       <View style={styles.inputContainer}>
//         <TextInput style={styles.textInput} placeholder="User Name" onChangeText={(text)=>{setUsername(text);handlechangetext(text)}} />

//         <Text style={styles.errorText}>{userError}</Text>
//         <TextInput style={styles.textInput} placeholder="Password" onChangeText={(text)=>{setPassword(text);handlechangetext(text);}} />
//         <Text style={styles.errorText}>{passError}</Text>
//         <Button title="Login" onPress={handleLogin} color='#00D4FF' />

//         <View style={styles.notice}>
//           <Text style={{ fontWeight: 'bold' }}>NOTE : </Text>
//           <Text style={{ color: 'green', }}>Staff Login Only. Thank You !!</Text>
//         </View>

//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "lightblue"
//   },
//   inputContainer: {
//     height: 350,
//     width: 330,
//     marginTop: 60,
//     borderColor: '#75EDFC',
//     borderWidth: 3,
//     borderRadius: 25,
//     paddingTop: 50,
//     padding: 20,
//     backgroundColor: '#ADF2FB'
//   },
//   textInput: {
//     marginBottom: 10,
//     padding: 8,
//     borderRadius: 15,
//     backgroundColor: 'white',
//     paddingLeft: 15,
//     borderWidth: 1,
//     borderColor: 'grey'
//   },
//   heading: {
//     width: '100%',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: "center",
//     letterSpacing: 3,
//     lineHeight: 55,
//     backgroundColor: '#46D6FC',
//     marginBottom: 20,
//     borderTopColor: '#009EFF',
//     borderBottomColor: '#009EFF',
//     borderBottomWidth: 2,
//     borderTopWidth: 2,
//     marginTop: 10
//   },
//   image: {
//     width: 100,
//     height: 110,
//     position: 'relative',
//   },
//   notacc: {
//     width: 170,
//     height: 170,
//     fontSize: 15,
//     position: 'relative',
//     left: 25,
//     top: 45,
//   },
//   signup: {
//     position: 'relative',
//     left: 190,
//     top: -125,
//     color: "red",
//   },
//   shadow: {
//     position: "relative",
//     borderRadius: 10,
//     elevation: 8,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 5,
//   },
//   notice: {
//     backgroundColor: '#75EDFC',
//     padding: 5,
//     borderRadius: 7,
//     position: 'relative',
//     top: 40,
//     flexDirection: 'row',
//     columnGap: 5,
//     justifyContent: 'center',

//   }
// });