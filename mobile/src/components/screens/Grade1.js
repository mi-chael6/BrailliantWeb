import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomHeader from '../ui/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { useSendToBrailleDevice } from '../utils/sendToBrailleDevice'
import { useDevice } from '../../context/DeviceContext';
import { Alert } from 'react-native';

const characters = [
  { char: 'a', label: 'a(1)', image: require('../../../assets/brailleChar/a.png') },
  { char: 'b', label: 'b(2)', image: require('../../../assets/brailleChar/b.png') },
  { char: 'c', label: 'c(3)', image: require('../../../assets/brailleChar/c.png') },
  { char: 'd', label: 'd(4)', image: require('../../../assets/brailleChar/d.png') },
  { char: 'e', label: 'e(5)', image: require('../../../assets/brailleChar/e.png') },
  { char: 'f', label: 'f(6)', image: require('../../../assets/brailleChar/f.png') },
  { char: 'g', label: 'g(7)', image: require('../../../assets/brailleChar/g.png') },
  { char: 'h', label: 'h(8)', image: require('../../../assets/brailleChar/h.png') },
  { char: 'i', label: 'i(9)', image: require('../../../assets/brailleChar/i.png') },
  { char: 'j', label: 'j(0)', image: require('../../../assets/brailleChar/j.png') },
  { char: 'k', label: 'k', image: require('../../../assets/brailleChar/k.png') },
  { char: 'l', label: 'l', image: require('../../../assets/brailleChar/l.png') },
  { char: 'm', label: 'm', image: require('../../../assets/brailleChar/m.png') },
  { char: 'n', label: 'n', image: require('../../../assets/brailleChar/n.png') },
  { char: 'o', label: 'o', image: require('../../../assets/brailleChar/o.png') },
  { char: 'p', label: 'p', image: require('../../../assets/brailleChar/p.png') },
  { char: 'q', label: 'q', image: require('../../../assets/brailleChar/q.png') },
  { char: 'r', label: 'r', image: require('../../../assets/brailleChar/r.png') },
  { char: 's', label: 's', image: require('../../../assets/brailleChar/s.png') },
  { char: 't', label: 't', image: require('../../../assets/brailleChar/t.png') },
  { char: 'u', label: 'u', image: require('../../../assets/brailleChar/u.png') },
  { char: 'v', label: 'v', image: require('../../../assets/brailleChar/v.png') },
  { char: 'w', label: 'w', image: require('../../../assets/brailleChar/w.png') },
  { char: 'x', label: 'x', image: require('../../../assets/brailleChar/x.png') },
  { char: 'y', label: 'y', image: require('../../../assets/brailleChar/y.png') },
  { char: 'z', label: 'z', image: require('../../../assets/brailleChar/z.png') },
];

const Grade1 = () => {

  const navigation = useNavigation();
  const { state, setState } = useContext(AuthContext);
  const { connectedDevice } = useDevice();
  const { sendToBrailleDevice } = useSendToBrailleDevice();


   const handleSend = async (char) => {
    if (!connectedDevice) {
      Alert.alert("Not Connected", "Please connect to a Braille device first.");
      return;
    }

    try {
      const success = await sendToBrailleDevice(char);
      if (success) {
        Alert.alert("✅ Sent", `Character "${char}" sent to device!`);
      } else {
        Alert.alert("⚠️ Error", "Failed to send character.");
      }
    } catch (err) {
      console.error("BLE Error:", err);
      Alert.alert("Error", "Something went wrong while sending.");
    }
  };

  return (
    <>
      <CustomHeader title="Braille Characters" onBack={() => navigation.goBack()} image={state.user.user_img} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Grade 1 Braille</Text>
          <Text style={styles.description}>
            Grade 1 braille is a letter-for-letter substitution of its printed counterpart. This is the preferred code for beginners because it allows people to get familiar with, and recognize different aspects of the code while learning how to read braille.
            {'\n\n'}English grade 1 braille consists of the 26 standard letters of the alphabet, and numbers 0-9.
          </Text>

          <Text style={styles.gridHeader}>Click a character to sync it to the display!</Text>

          <View style={styles.gridContainer}>
            {[...Array(Math.ceil(characters.length / 5))].map((_, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {characters
                  .slice(rowIndex * 5, rowIndex * 5 + 5)
                  .map((item) => (
                    <TouchableOpacity onPress={() => handleSend(item.char)} key={item.char} style={styles.brailleItem}>
                      <Image source={item.image} style={styles.brailleImage} />
                      <Text style={styles.brailleLabel}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Grade1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#444',
    marginBottom: 20,
  },
  gridHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
  },
  gridContainer: {
    backgroundColor: '#d9f3ff',
    padding: 16,
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  brailleItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  brailleImage: {
    width: 50,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  brailleLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});
