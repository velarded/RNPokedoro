import { StyleSheet, View, Text } from "react-native";
import CustomText from "./CustomText";
import BouncingArrow from "./BouncingArrow";

const DialogBox = ({children}) => {
    return (
        <View style={styles.dialogContainer}>
            <View style={styles.whiteBorder}>
                <View style={styles.textContainer}>
                    <CustomText style={styles.text}>{children}</CustomText>
                    <BouncingArrow />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  dialogContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '10%',
    width: '90%',
    height: '110',
    flexDirection: 'row',
    borderWidth: 3.15,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  whiteBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 2.5,
    borderColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F1E4A0',
  },
  textContainer: {
    width: '90%',
    height: '80%',
    borderColor: '#F1E4A0',
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 2,
    padding: 10,
  },
  text: {
    fontSize: 18,
  }
});

export default DialogBox;