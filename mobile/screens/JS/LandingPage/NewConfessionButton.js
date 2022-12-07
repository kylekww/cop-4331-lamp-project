import React, { useRef, useState , useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
//import DialogNewConfession from './DialogNewConfession';

/* Need to be added:
    - Reformatting of dialog box.
    - Character limit to dialog box.
*/

export default function NewConfessionButton(Props) {
  const [open, setOpen] = React.useState(false);
  const newButtonColor = ['#DE621C','rgba(128,199,239,.5)'];
  const altColor = ['rgba(227, 19, 19, 1)','rgba(89,35,206,1)'];

  const [textInput, setTextInput] = useState('');
  const [length, setLength] = useState(0);
  const [newLines,setNewLines] = useState(0);

  const input = useRef(null);

  React.useEffect(()=> {
    if (input.current) {
      input.current.focus();
    }
  },[]);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePost = () => {
    setOpen(false);
    if (length>0) postConfession();
  };

  const changePost = async(val) => {
    setTextInput(val);
    setLength(val.length);
    setNewLines(0);
  };

  const postConfession = async event => {
    const confession = textInput;
    const data = await fetch("https://hushucf.herokuapp.com/api/v1/confessions/addConfession", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        confession
    }),
      
  })
  .then(res => {
    res.json().then((data) => {
      console.log(data);
    }) 
  })
  .catch(err => {
    console.log(err);
  });
  }

  return (
    //<DialogNewConfession open={open} handleClose={handleClose}></DialogNewConfession>
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <KeyboardAvoidingView behavior={'padding'}>
          <View style={[styles.modalView, {backgroundColor:altColor[(Props.isNew?1:0)]}]}>
            <View style ={{ width: '80%', height: 220, top: 10}}>
              <TextInput style={styles.text}
                ref = {input}
                maxLength = {280}
                onChangeText={(val)=>{changePost(val)}}
                multiline = {true}
                autoFocus = {true}
                placeholderTextColor='white'
                placeholder="What's on your mind?">
              </TextInput>
            </View>
            <View style={styles.bottom}>
              <View style={styles.bottomFiller}>
              </View>
              <TouchableOpacity onPress={handlePost} style={[styles.button2, {backgroundColor:newButtonColor[(Props.isNew?1:0)]}]}>
                <Text style={styles.text2}>Post</Text>
              </TouchableOpacity>
              <View style={styles.bottomFiller}>
                <Text style={[styles.text3,{textAlign: 'left'}]}>{length+'/\n'}280</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <TouchableOpacity onPress={handleClickOpen} style={[styles.button, {backgroundColor:newButtonColor[(Props.isNew?1:0)]}]}>
          <Text style={styles.text2}>What's on your mind?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  modalView: {
    margin: 20,
    top:'20%',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    height:'80%',
  },
  text: {
      alignSelf: 'center',
      fontSize: 24,
      color: 'white',
  },
  text2: {
    alignSelf: 'center',
    fontSize: 24,
    color: 'white',
  },
  text3: {
    fontSize: 16,
    color: 'white',
  },
  button: {
      padding: 10,
      alignItems: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      borderWidth: 5,
      borderRadius: 30,
      borderColor: 'white',
      width: '70%',
      height: 60,
      bottom: 20,
      opacity: 1,
  },
  button2: {
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 5,
    borderRadius: 30,
    borderColor: 'white',
    width: '80%',
    height: 60,
    opacity: 1,
},
  bottom: {
    flexDirection: 'row',
    bottom: 80,
  },
  bottomFiller: {
    width: '25%',
    alignSelf: 'center',
    marginHorizontal: 10
  },
});