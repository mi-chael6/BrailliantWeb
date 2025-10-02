import React, { useState, useEffect } from 'react';
import {
View,
Text,
StyleSheet,
Image,
TouchableOpacity,
Modal,
FlatList,
Alert,
Platform,
PermissionsAndroid,
RefreshControl,
ScrollView,
Dimensions,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import CustomHeader from '../ui/CustomHeader';
import DisconnectionModal from '../ui/DisconnectionModal';
import { Buffer } from 'buffer';
import { useDevice } from '../../context/DeviceContext';

const { width } = Dimensions.get('window');

const BATTERY_SERVICE_UUID = '180F';
const BATTERY_LEVEL_UUID = '2A19';

const DeviceSettingsScreen = () => {
const [manager] = useState(new BleManager());
const [bluetoothOn, setBluetoothOn] = useState(false);
const [scannedDevices, setScannedDevices] = useState({});
const [modalVisible, setModalVisible] = useState(false);
const [batteryLevel, setBatteryLevel] = useState(null);
const [isDisconnected, setIsDisconnected] = useState(false);
const [refreshing, setRefreshing] = useState(false);

const { 
  connectedDevice, 
  setConnectedDevice, 
  deviceServices, 
  setDeviceServices, 
  deviceCharacteristics, 
  setDeviceCharacteristics,
  setWriteService,
  setWriteCharacteristic,
} = useDevice();


useEffect(() => {
  const subscription = manager.onStateChange((state) => {
    const isOn = state === 'PoweredOn';
    setBluetoothOn(isOn);
    if (isOn) {
      scanForDevices();
    }
  }, true);

  return () => subscription.remove();
}, []);

useEffect(() => {
  if (!connectedDevice) return;

  const monitor = connectedDevice.onDisconnected(() => {
    setConnectedDevice(null);
    setBatteryLevel(null);
    setDeviceServices([]);
    setDeviceCharacteristics([]);
    setIsDisconnected(true);
  });

  return () => monitor.remove();
}, [connectedDevice]);

const requestBluetoothPermissions = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
    return (
      granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true;
};

const scanForDevices = async () => {
  const permissionGranted = await requestBluetoothPermissions();
  if (!permissionGranted) {
    Alert.alert('Permission denied', 'Bluetooth permissions are required.');
    return;
  }

  setScannedDevices({});
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.log('Scan error:', error);
      return;
    }
    if (device && device.name) {
      setScannedDevices((prev) => ({
        ...prev,
        [device.id]: device,
      }));
    }
  });

  setTimeout(() => {
    manager.stopDeviceScan();
  }, 5000);
};

const readBatteryLevel = async (device) => {
  try {
    await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();

    for (const service of services) {
      if (service.uuid.toLowerCase().includes(BATTERY_SERVICE_UUID.toLowerCase())) {
        const characteristics = await service.characteristics();
        for (const char of characteristics) {
          if (char.uuid.toLowerCase().includes(BATTERY_LEVEL_UUID.toLowerCase())) {
            const batteryData = await char.read();
            const decoded = Buffer.from(batteryData.value, 'base64').readUInt8(0);

            console.log(
              `Battery Service: ${service.uuid}, Characteristic: ${char.uuid}, Level: ${decoded}%`
            );
            return decoded;
          }
        }
      }
    }
  } catch (err) {
    console.warn('Failed to read battery level:', err);
  }
  return null;
};

const connectToDevice = async (device) => {
  try {
    manager.stopDeviceScan();
    const connected = await device.connect();
    await connected.discoverAllServicesAndCharacteristics();
    setConnectedDevice(connected);
    setModalVisible(false);

    const services = await connected.services();
    let allServices = [];
    let allChars = [];

    let writableService = null;
    let writableChar = null;

    for (const service of services) {
      const chars = await service.characteristics();
      allServices.push(service.uuid);

      chars.forEach((char) => {
        allChars.push({ service: service.uuid, char: char.uuid });

        if ((char.isWritableWithResponse || char.isWritableWithoutResponse) &&
            !writableService && !writableChar) {
          writableService = service.uuid;
          writableChar = char.uuid;
        }
      });
    }

    setDeviceServices(allServices);
    setDeviceCharacteristics(allChars);

    // ✅ Save writable service/char in context
    setWriteService(writableService);
    setWriteCharacteristic(writableChar);

    console.log("Writable:", writableService, writableChar);


    const level = await readBatteryLevel(connected);
    if (level !== null) setBatteryLevel(level);
  } catch (err) {
    console.error("Connect error:", err);
  }
};



const handleScanButton = () => {
  if (!bluetoothOn) {
    Alert.alert('Bluetooth is Off', 'Please enable Bluetooth to scan.');
    return;
  }
  scanForDevices();
  setModalVisible(true);
};

const disconnectDevice = async () => {
  if (connectedDevice) {
    await connectedDevice.cancelConnection();
    setConnectedDevice(null);
    setBatteryLevel(null);
    setDeviceServices([]);
    setDeviceCharacteristics([]);
  }
};

const onRefresh = async () => {
  setRefreshing(true);
  await scanForDevices();
  setRefreshing(false);
};

const renderDeviceItem = ({ item }) => (
  <TouchableOpacity style={styles.deviceItem} onPress={() => connectToDevice(item)}>
    <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
    <Text style={styles.deviceId}>{item.id}</Text>
  </TouchableOpacity>
);

return (
  <View style={styles.container}>
    <CustomHeader title="Device Settings" />
    <ScrollView
      contentContainerStyle={styles.contentWrapper}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {connectedDevice ? (
        <>
          <View style={styles.deviceImageWrapper}>
            <Image
              source={require('../../../assets/brailliant_icon.png')}
              style={styles.deviceImage}
              resizeMode="contain"
            />
            <View style={styles.greenDot} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Device Information</Text>
            <Text style={styles.infoText}>Name: {connectedDevice.name}</Text>
            <Text style={styles.infoText}>Status: Connected</Text>
            <Text style={styles.infoText}>
              Battery: {batteryLevel !== null ? `${batteryLevel}%` : 'Unknown'}
            </Text>
          </View>

          <TouchableOpacity style={styles.disconnectButton} onPress={disconnectDevice}>
            <Text style={styles.disconnectText}>Disconnect</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.scanButton} onPress={handleScanButton}>
          <Text style={styles.scanText}>Connect to Device</Text>
        </TouchableOpacity>
      )}
    </ScrollView>

    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Select a device</Text>
          <FlatList
            data={Object.values(scannedDevices)}
            keyExtractor={(item) => item.id}
            renderItem={renderDeviceItem}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    <DisconnectionModal visible={isDisconnected} onClose={() => setIsDisconnected(false)} />
  </View>
);
};

export default DeviceSettingsScreen;


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#f2f2f2',
},
contentWrapper: {
  padding: 20,
  alignItems: 'center',
},
deviceImageWrapper: {
  position: 'relative',
  marginVertical: 24,
},
deviceImage: {
  width: width * 0.8, // Responsive width
  height: 120,
},
greenDot: {
  position: 'absolute',
  top: 5,
  right: 5,
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: 'limegreen',
  borderWidth: 1,
  borderColor: '#fff',
},
infoContainer: {
  alignItems: 'center',
  marginBottom: 24,
},
infoTitle: {
  fontSize: width < 600 ? 16 : 18, // Responsive font size
  fontWeight: '600',
  marginBottom: 8,
},
infoText: {
  fontSize: width < 600 ? 14 : 16, // Responsive font size
  color: '#333',
  marginVertical: 2,
},
disconnectButton: {
  backgroundColor: '#000',
  paddingHorizontal: 32,
  paddingVertical: 14,
  borderRadius: 30,
},
disconnectText: {
  color: '#fff',
  fontSize: width < 600 ? 14 : 16, // Responsive font size
  fontWeight: 'bold',
},
scanButton: {
  backgroundColor: '#007bff',
  paddingHorizontal: 32,
  paddingVertical: 14,
  borderRadius: 30,
},
scanText: {
  color: '#fff',
  fontSize: width < 600 ? 14 : 16, // Responsive font size
  fontWeight: 'bold',
},
modalContainer: {
  flex: 1,
  backgroundColor: '#000000aa',
  justifyContent: 'center',
},
modalBox: {
  backgroundColor: '#fff',
  margin: 32,
  padding: 24,
  borderRadius: 10,
  maxHeight: '80%',
},
modalTitle: {
  fontSize: width < 600 ? 18 : 20, // Responsive font size
  fontWeight: 'bold',
  marginBottom: 16,
},
deviceItem: {
  paddingVertical: 10,
  borderBottomColor: '#ccc',
  borderBottomWidth: 1,
},
deviceName: {
  fontSize: width < 600 ? 16 : 18, // Responsive font size
  fontWeight: '500',
},
deviceId: {
  fontSize: width < 600 ? 12 : 14, // Responsive font size
  color: '#666',
},
closeText: {
  marginTop: 12,
  textAlign: 'center',
  color: '#007bff',
  fontWeight: 'bold',
},
});
