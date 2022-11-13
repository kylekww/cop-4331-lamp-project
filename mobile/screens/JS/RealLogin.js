import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, TextInput, Button, View, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

global.password = '';
global.userId = -1;
global.userName = '';

export default class RealLogin extends Component {
    constructor()
    {
        super()
        this.state = 
        {
            message: ''
        }
    }

    render(){
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <LinearGradient
                    colors={['#80c6ef', '#5923ce']}
                    style={styles.background}
                >
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
                                //secureTextEntry={true}
                                onChangeText={(val) => {this.changeUsername(val)}}
                            />
                        </View>
                    <View style={{marginBottom: 10}} />
                        <View style={styles.input}>
                            <TextInput 
                                style={{fontSize: 16, color: '#5923ce'}} 
                                placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={(val) => {this.changePassword(val)}} 
                            />
                        </View>
                    <View style={styles.button}>
                        <Button 
                            title="Login!" 
                            style={{fontSize: 25, color: '#5923ce'}}
                            onPress={this.handleLogin}
                         />
                    </View>
                </View>
                <View style={{fontSize: 16, color: '#5923ce', bottom: 10}}>
                    <Button title="Click here to Register!" onPress={this.goToRegister}/>
                </View>
                </LinearGradient>
            </View>
        )
    }

    handleLogin = async () =>
    {
        try
        {
            // var obj = {username: global.userName, password: global.password};
            // var js = JSON.stringify(obj);

            // const response = await fetch('https://hushucf.herokuapp.com/api/v1/auth/login',
            //     {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            // var res = JSON.parse(await response.text());

            // if(res.status == 200)
            // {
            //     Alert.alert("YES")
            // }

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
                    alert("yes");
                }
                else
                {
                    alert("idk what the fuck this means");
                }
            })
            
        }
        catch(e)
        {
            this.setState({message: e.message});
        }
    }

    goToRegister = async () =>
    {
        this.props.navigation.navigate('Registration');
    }

    changeUsername = async (val) =>
    {
        global.username = val;
    }

    changePassword = async (val) =>
    {
        global.password = val;
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    box: {
        width: '90%',
        height: '80%',
        justifyContent: 'center',
        backgroundColor: '#e7e8f3',
        borderRadius: 30,
        alignItems: 'center',
        top: 25,
    },
    phrase: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '33%',
    },
    logo: {
        
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