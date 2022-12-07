import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from './Logo';

export default function Registrationscreen(Props) {
    const[reg, validReg] = useState('');
    const[long, isLong] = useState(false);
    const[number, hasNumber] = useState(false)
    const[up, hasUppercase] = useState(false)
    const[low, hasLowercase] = useState(false)
    const[visible, isVisible] = useState(false);
    const[error, hasError] = useState(true);

    const tempFirstName = '';
    const tempUserName = '';
    const tempEmail = '';
    const tempPassword = '';

    const [state,setState] = useState({message:''});
    const requirements = '8 Characters\n1 Number\n1 Upper Case Character\n1 Lower Case Character';
    console.log('register');
     
    function passwordRequirements(password) {
        let upperCase = false;
        let lowerCase = false;
        let passwordNumber = false;
        let passwordLength = false;

        if (password.length >= 8) {
            passwordLength = true;
            isLong(true);
        }

        for (let i = 0; i < password.length; i++) {
            if (password[i] >= "0" && password[i] <= "9") {
                passwordNumber = true;
            } else if (password[i].toUpperCase() === password[i]) {
                upperCase = true;
            } else if (password[i].toUpperCase() !== password[i]) {
                lowerCase = true;
            }
        }
        isLong(passwordLength)
        hasNumber(passwordNumber)
        hasUppercase(upperCase)
        hasLowercase(lowerCase)
        if (passwordLength && passwordNumber && upperCase && lowerCase) {
            return true;
        } else {
          validReg('Please check that you have met all of the password requirements!')
            return false;
        }
    }
    function validEmail(email) {
        let knightsEmail = ".ucf.edu";
        const knightsEmailArray = knightsEmail.split("")
        const emailArray = email.split("")
        let validation = false;
        let j = 0;

        for (let i = (emailArray.length - knightsEmailArray.length); i < emailArray.length; i++) {
            if (knightsEmailArray[j] == emailArray[i]) {
                validation = true;
                j++;
            } else {
                validation = false;
                break;
            }
        }
        return validation;
    }
    const doRegistration = async event => {
        const username = tempUserName;
        const password = tempPassword;
        const name = tempFirstName;
        const email = tempEmail;
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);  // This needs to be added to each user on registration

        if ((passwordRequirements(password)) && (validEmail(email))) {
            const data = await fetch("https://hushucf.herokuapp.com/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    email,
                    color
                }),
            }).then(res => {
                isVisible(true)
                if (res.status !== 201) validReg('This username/email is already taken!')
                else {
                  hasError(false)
                  validReg('Success! Bringing you back to login...')
                    Props.navigation.pop();
                }
            })
                .catch(err => {
                    console.log(err);
                });

            // This is a bootleg solution. "Might" need attention.
            console.log(data);
        } else if ((!passwordRequirements(password)) && validEmail(email)) {
            console.log("Password must meet all requirements!");
            
        }
        else if (passwordRequirements(password) && (!validEmail(email))) {
            console.log("You must use your knights email!");
            isVisible(true)
            validReg('Please use a UCF email!')
        }
        else {
            console.log("Password must meet all requirements!");
            console.log("You must use your knights email!");
            isVisible(true)
            validReg('Please use a UCF email!')
        }

    };

    const changeFirstNameHandler = async (val) =>
    {
        tempFirstName = val;
    }  

    const changePasswordHandler = async (val) =>
    {
        tempPassword = val;
    }
    const changeUserNameHandler = async (val) =>
    {
        tempUserName = val;
    }  

    const changeEmailHandler = async (val) =>
    {
        tempEmail = val;
    }
    const handleReturn = async () => {
        Props.navigation.pop();
    }

    return(
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(128,199,239,1)', 'rgba(89,35,206,1)']}
                style={styles.background}
            />
            <View style={styles.logoConstraint}>
                <Logo isNew={true}></Logo>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={{alignItems: 'flex-end'}}>
                    <View style={styles.squarebg}>
                        <Text style={styles.text}> Signup </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            onChangeText={(val) => { changeFirstNameHandler(val) }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            onChangeText={(val) => { changeUserNameHandler(val) }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={(val) => { changePasswordHandler(val) }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(val) => { changeEmailHandler(val) }}
                        />
                        <Text style={[styles.text,{color:'red'}]}>{reg} </Text>
                        <TouchableOpacity style={styles.button} onPress={doRegistration} underlayColor='rgb(60, 23, 141)'>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button2}
                            onPress={handleReturn}>
                            <Text style={[styles.text3,{color:'blue'}]}> Already have an account? Login!</Text>
                        </TouchableOpacity>
                        <Text style={[styles.text2,{color:'red'}]}>Password Requirements:</Text>
                        <Text style={[styles.text2,{color:'green'}]}>{requirements}</Text>
                    </View>
                </View>    
            </ScrollView>
        </View>
    );
    
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        marginTop: 25,
        centerContent:true,
        indicatorStyle: 'white',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    button: {
        padding: 15,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        width: 250,
        backgroundColor: 'rgba(89,35,206,1)',
    },
    buttonText:{
        fontSize: 30,
        color: 'rgba(128,199,239,1)',
    },
    button2: {
        justifyContent: 'space-between',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'rgba(89,35,206,1)',
        fontSize: 20,
    },
    text: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontSize: 24,
        color: 'rgba(89,35,206,1)',
        marginBottom: 10,
    },
    text2: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    text3: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        margin: 10
    },
    logoConstraint: {
        top: 20,
        height: 200,
        width: 200,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        width: 300,
        height: 50,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 5,
        fontSize: 24,
        color: 'rgba(89,35,206,1)',
        alignSelf: 'center',
        textAlign: 'left',
        margin: 10,
    },
    squarebg: {
        padding: 5,
        maxWidth: '90%',
        width: 400,
        height: 650,
        backgroundColor: 'rgb(231, 232, 243)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'transparent',
      },
});