import * as React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
//import DialogNewConfession from './DialogNewConfession';

/* Need to be added:
    - Reformatting of dialog box.
    - Character limit to dialog box.
*/

export default function NewConfessionButton(Props) {
  const [open, setOpen] = React.useState(false);
  const newButtonColor = ['#DE621C','rgba(128,199,239,.5)'];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
        <View style={[styles.modalView, {backgroundColor:newButtonColor[(Props.isNew?1:0)]}]}>
          <TextInput styles={styles.text}
            placeholder="What's on your mind?">
          </TextInput>
        </View>
      </Modal>
      <TouchableOpacity onPress={handleClickOpen} style={[styles.button, {backgroundColor:newButtonColor[(Props.isNew?1:0)]}]}>
          <Text styles={styles.text}>What's on your mind?</Text>
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
    flexWrap: 'wrap',
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    height:'80%',
  },
  text: {
      alignSelf: 'center',
      fontSize: 30,
      color: 'white',
  },
  button: {
      padding: 10,
      alignItems: 'center',
      alignSelf: 'center',
      flexWrap: 'wrap',
      borderWidth: 5,
      borderRadius: 30,
      width: '70%',
      height: 60,
  },
});