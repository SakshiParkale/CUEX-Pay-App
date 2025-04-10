///////////////////////// with backend ////////////////////////////////


import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';


const DeleteAccount = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const router = useRouter();
  
  useFocusEffect(
    useCallback(() => {
      const getEmailOrPhone = async () => {
        try {
          const storedValue = await AsyncStorage.getItem('emailOrPhone');
          if (storedValue) {
            setEmailOrPhone(storedValue);
            console.log('🎯 FocusEffect fetched:', storedValue);
          }
        } catch (error) {
          console.log('❌ Error fetching on focus:', error);
        }
      };
  
      getEmailOrPhone();
    }, [])
  );
  

  const handleDelete = async () => {
    console.log('handleDelete called');

    if (!emailOrPhone) {
      Alert.alert('Error', 'No account info found.');
      return;
    }

    try {
      const res = await axios.post(`http://192.168.52.190:7000/api/auth/deleteAccount`, {
        emailOrPhone
      });

    //   await AsyncStorage.clear();
     await AsyncStorage.removeItem('emailOrPhone');
      console.log('Response from server:', res.data);
    //   Alert.alert('Success', res.data.message, [
    //     {
    //       text: 'OK',
    //       onPress: () => router.replace('/signup'),
    //     }
    //   ]);
    Alert.alert('Success', res.data.message, [
        {
          text: 'OK',
          onPress: () => {
            setTimeout(() => {
              router.replace('/signup');
            }, 10); // Small delay
          }
        }
      ]);
    } catch (err: any) {
      console.log('Delete error:', err.response?.data || err.message);
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/AccountSetting')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      {/* Header */}
      <Text style={styles.headerTitle}>Delete Account</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>Delete User Account</Text>
        <Text style={styles.emailDisplay}>Account: {emailOrPhone || 'Not found'}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ Needed to allow full height for vertical centering
    backgroundColor: '#F4F6F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004080',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    width: '100%',      // ✅ Full width
    margin: 0,          // ✅ No margin
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  backButton: {
    marginRight: 10,
  },
  card: {
    backgroundColor: "#e2f1ff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginTop: 150,
    marginHorizontal:14,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#cc0000',
  },
  emailDisplay: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#cc0000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});













// // import React from "react";
// // import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
// // import { useRouter } from "expo-router";

// // export default function AccountDelete() {
// //   const router = useRouter();

  
// //   // Function to handle delete account action
// //   const handleDeleteAccount = () => {
// //     Alert.alert(
// //       "Delete Account",
// //       "Are you sure you want to delete your account? This action is irreversible.",
// //       [
// //         {
// //           text: "Cancel",
// //           style: "cancel",
// //           onPress: () => console.log("Cancel pressed"), // Debug log
// //         },
// //         {
// //           text: "Delete",
// //           style: "destructive",
// //           onPress: () => {
// //             console.log("Account deleted"); // Debug log
// //             router.push("/"); // Navigate to home
// //           },
// //         },
// //       ]
// //     );
// //   };



// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.card}>
// //         <Text style={styles.header}>Delete Account</Text>
// //         <Text style={styles.warning}>
// //           Deleting your account will remove all your data permanently.
// //         </Text>
// //         <TouchableOpacity
// //           style={styles.deleteButton}
// //           onPress={handleDeleteAccount}
// //         >
// //           <Text style={styles.deleteButtonText}>Delete My Account</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           onPress={() => router.push("/Sidebar/AccountSetting")}
// //           style={styles.cancelButton}
// //         >
// //           <Text style={styles.cancelButtonText}>Cancel and Go Back</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#ADD8E6",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     padding: 16,
// //   },
// //   card: {
// //     width: "90%",
// //     backgroundColor: "#E6F2FA",
// //     borderRadius: 12,
// //     padding: 24,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     shadowOffset: { width: 0, height: 4 },
// //     elevation: 5,
// //     alignItems: "center",
// //   },
// //   header: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     color: "#DC2626",
// //     marginBottom: 16,
// //   },
// //   warning: {
// //     fontSize: 14,
// //     color: "#6B7280",
// //     textAlign: "center",
// //     marginBottom: 24,
// //     lineHeight: 20,
// //   },
// //   deleteButton: {
// //     backgroundColor: "#DC2626",
// //     borderRadius: 8,
// //     paddingVertical: 12,
// //     paddingHorizontal: 24,
// //     shadowColor: "#DC2626",
// //     shadowOpacity: 0.3,
// //     shadowRadius: 6,
// //     shadowOffset: { width: 0, height: 3 },
// //     elevation: 4,
// //     marginBottom: 16,
// //     width: "100%",
// //     alignItems: "center",
// //   },
// //   deleteButtonText: {
// //     color: "#FFFFFF",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   cancelButton: {
// //     marginTop: 8,
// //     alignItems: "center",
// //     width: "100%",
// //   },
// //   cancelButtonText: {
// //     color: "#2563EB",
// //     fontSize: 14,
// //     fontWeight: "bold",
// //     textDecorationLine: "underline",
// //   },
// // });



// ////////////////////////////wiith backend//////////////////////////////


// import React, { useCallback, useState } from "react";
// import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator,StatusBar } from "react-native";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from '@expo/vector-icons';

// export default function AccountDelete() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const API_URL = 'http://172.27.16.1:7000/api/auth/deleteAccount';

//   // Function to call the API for account deletion
//   const deleteAccount = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("authToken"); // Securely retrieve token
      
//       if (!token) {
//         throw new Error("Authentication token not found");
//       }

//       const response = await fetch(API_URL, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (response.ok) {
//         Alert.alert("Success", "Your account has been deleted successfully.");
//         console.log("Account deleted:", data);
//         router.push("/");
//       } else {
//         Alert.alert("Error", data.message || "Failed to delete account.");
//         console.error("Account deletion failed:", data);
//       }
//     } catch (error) {
//       setLoading(false);
      
//       let errorMessage = "Something went wrong. Please try again.";
      
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       }
    
//       Alert.alert("Error", errorMessage);
//       console.error("API error:", error);
//     }
    
//   };

//   // Function to handle delete account action
//   const handleDeleteAccount = useCallback(() => {
//     Alert.alert(
//       "Delete Account",
//       "Are you sure you want to delete your account? This action is irreversible.",
//       [
//         { text: "Cancel", style: "cancel", onPress: () => console.log("Cancel pressed") },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: deleteAccount,
//         },
//       ]
//     );
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#004080" barStyle="light-content"  />
//       <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.push('/Sidebar/AccountSetting')} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//       <Text style={styles.headerTitle}> Delete Account </Text>
//       </View>
//       <View style={styles.card}>
//         <Text style={styles.subheader}>Delete Account</Text>
        
//         <Text style={styles.warning}>
//           Deleting your account will remove all your data permanently.
//         </Text>
//         <TouchableOpacity activeOpacity={0.7}
//           style={[styles.deleteButton, loading && { opacity: 0.7 }]}
//           onPress={handleDeleteAccount}
//           disabled={loading}
//         >
//           {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.deleteButtonText}>Delete My Account</Text>}
//         </TouchableOpacity>
//         <TouchableOpacity activeOpacity={0.7}
//           onPress={() => router.push("/Sidebar/AccountSetting")}
//           style={styles.cancelButton}
//         >
//           <Text style={styles.cancelButtonText}>Cancel and Go Back</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#fff",
//     // justifyContent: "center",
//     // alignItems: "center",
//     // padding: 16,
//   },
//   card: {
    
//     width: "90%",
//     backgroundColor: "#e2f1ff",
//     borderRadius: 12,
//     padding: 24,
//     marginTop:'50%',
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//     alignItems: "center",
//     alignSelf:'center',
//     justifyContent:'center',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#004080',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   // subheader: {
//   //   fontSize: 14,
//   //   color: 'black',
//   //   textAlign: 'center',
//   //   marginBottom: 16,
//   // },
//   subheader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//     color:'black'
//   },
//   warning: {
//     fontSize: 14,
//     color: "#6B7280",
//     textAlign: "center",
//     marginBottom: 24,
//     lineHeight: 20,
//   },
//   deleteButton: {
//     backgroundColor: "#DC2626",
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     shadowColor: "#DC2626",
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 4,
//     marginBottom: 16,
//     width: "100%",
//     alignItems: "center",
//   },
//   deleteButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   cancelButton: {
//     marginTop: 8,
//     alignItems: "center",
//     width: "100%",
//   },
//   cancelButtonText: {
//     color: "#2563EB",
//     fontSize: 14,
//     fontWeight: "bold",
//     textDecorationLine: "underline",
//   },
// });
