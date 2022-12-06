import * as React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
//import DialogNewConfession from './DialogNewConfession';

/* Need to be added:
    - Reformatting of dialog box.
    - Character limit to dialog box.
*/

export default function NewConfessionButton(Props) {
  const [open, setOpen] = React.useState(false);
  const newButtonColor = ['#DE621C','rgba(128,199,239,1)'];
  const altColor = ['rgba(227, 19, 19, 0.921875)','rgba(89,35,206,1)'];

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
  };

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
            <View style ={{ width: '75%', height: 200}}>
              <TextInput style={styles.text}
                ref = {input}
                maxLength = {280}
                multiline = {true}
                autoFocus = {true}
                placeholderTextColor='white'
                placeholder="What's on your mind?">
              </TextInput>
            </View>
            <TouchableOpacity onPress={handlePost} style={[styles.button2, {backgroundColor:newButtonColor[(Props.isNew?1:0)]}]}>
            <Text style={styles.text2}>Post</Text>
            </TouchableOpacity>
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
    color: 'black',
  },
  button: {
      padding: 10,
      alignItems: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      borderWidth: 5,
      borderRadius: 30,
      width: '70%',
      height: 60,
      bottom: 20,
      opacity: 0.5,
  },
  button2: {
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 5,
    borderRadius: 30,
    width: '80%',
    height: 60,
    bottom: 40,
    opacity: 0.5,
},
});