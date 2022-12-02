import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from './Logo';

global.password = '';
global.userId = -1;
global.userName = '';

export default function RealLogin(Props) {
    
    const [state,setState] = useState({message:''});

    const handleLogin = async () =>
    {
        try
        {
            var obj = {username: global.username, password: global.password};
            var js = JSON.stringify(obj);

            fetch('https://hushucf.herokuapp.com/api/v1/auth/login', 
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: js,
            })
            .then(res => {
                if(res.status == 404)
                {
                    alert("Invalid username");
                }
                else if(res.status == 401)
                {
                    alert("Invalid password");
                }
                else if(res.status == 200)
                {
                    Props.navigation.push('LandingPage');
                }
                else
                {  
                    alert("no");
                }
            })
            
        }
        catch(e)
        {
            setState({message: e.message});
        }
    }

    const goToRegister = async () =>
    {
        Props.navigation.push('Registration');
    }

    const changeUsername = async (val) =>
    {
        global.username = val;
    }

    const changePassword = async (val) =>
    {
        global.password = val;
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LinearGradient
                colors={['#80c6ef', '#5923ce']}
                style={styles.background}
            >
            <View style={styles.logoConstraint}>
                <Logo isNew={true}></Logo>
            </View>
            <View style={styles.box}>
                <View style={styles.phrase}>
                    <Text style={{fontSize: 25, color: '#5923ce', fontWeight: "bold"}}>
                        Make Your Confessions...
                    </Text>
                </View>
                    <View style={styles.input}>
                        <TextInput 
                            style={{fontSize: 16, color: '#5923ce'}} 
                            placeholder='Username'
                            secureTextEntry={false}
                            onChangeText={(val) => {changeUsername(val)}}
                            />
                    </View>
                <View style={{marginBottom: 10}} />
                    <View style={styles.input}>
                        <TextInput 
                            style={{fontSize: 16, color: '#5923ce'}} 
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(val) => {changePassword(val)}} 
                        />
                    </View>
                <View style={styles.button}>
                    <Button 
                        title="Login!" 
                        style={{fontSize: 25, color: '#5923ce'}}
                        onPress={handleLogin}
                        />
                </View>
            </View>
            <View style={{fontSize: 16, color: '#5923ce', bottom: 10}}>
                <Button title="Click here to Register!" onPress={goToRegister}/>
            </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    box: {
        width: '90%',
        height: '60%',
        justifyContent: 'center',
        backgroundColor: '#e7e8f3',
        borderRadius: 30,
        alignItems: 'center',
        top: 25,
    },
    logoConstraint: {
        top: 20,
        height: 200,
        width: 200,
    },
    phrase: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '33%',
    },
    input: {
        borderColor: '#000000',
        borderRadius: 7,
        backgroundColor: '#ffffff',
        width: '60%',
        height: '7%',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 50,
        padding: 10,
    },
    button: {
        backgroundColor: '#5923ce',
        borderRadius: 5,
        padding: 1,
        width: '40%',
        alignSelf: 'center',
    }
});