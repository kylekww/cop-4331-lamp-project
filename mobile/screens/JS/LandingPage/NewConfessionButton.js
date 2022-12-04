import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
//import DialogNewConfession from './DialogNewConfession';

/* Need to be added:
    - Reformatting of dialog box.
    - Character limit to dialog box.
*/

export default function NewConfessionButton(Props) {
  const [open, setOpen] = React.useState(false);
  const newButtonColor = ['#DE621C','rgba(128,199,239,.5)'];

  const handleClickOpen = () => {
    //setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
  };

  return (
    //<DialogNewConfession open={open} handleClose={handleClose}></DialogNewConfession>
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={handleClickOpen} style={[styles.button, {backgroundColor:newButtonColor[(Props.isNew?1:0)]}]}>
            <Text styles={styles.text}>Got something to confess?</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({ 
    text: {
        alignSelf: 'center',
        fontSize: 30,
        color: 'white',
    },
    button: {
        padding: 10,
        bottom: 20,
        alignItems: 'center',
        alignSelf: 'center',
        flexWrap: 'wrap',
        borderWidth: 5,
        borderRadius: 30,
        width: '70%',
        height: 60,
    },
});