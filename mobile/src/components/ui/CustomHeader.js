import React, { useState, useContext, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Pressable, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDevice } from '../../context/DeviceContext';
import { AuthContext } from '../../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const CustomHeader = ({ title = '', subtitle = '', onBack }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 16 });
  const avatarRef = useRef(null);
  const { connectedDevice } = useDevice();
  const { state, setState } = useContext(AuthContext);


  const handleLogout = async () => {
    setShowMenu(false);
    await AsyncStorage.removeItem('@auth');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  // Calculate menu position above the header


  return (
    <View style={{ position: 'relative', zIndex: 100 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1536" />
      
      {/* Dropdown Menu (positioned above the header) */}
      {showMenu && (
        <>
          <Pressable
            style={[styles.fullscreenOverlay, { height: windowHeight, width: windowWidth }]}
            onPress={() => setShowMenu(false)}
          >
            <View style={[styles.dropdownMenu, { 
              top: menuPosition.top, 
              right: menuPosition.right,
              maxWidth: windowWidth - 32, // Ensure menu doesn't exceed screen width
            }]}>
              <TouchableOpacity onPress={() => {
                setShowMenu(false);
                navigation.navigate('Profile');
              }} style={styles.menuItemButton}>
                <Text style={styles.menuItem}>Profile</Text>
              </TouchableOpacity>
              <View style={[styles.menuItemButton, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={[
                  styles.connectionIndicator, 
                  { backgroundColor: connectedDevice ? 'green' : 'gray' }
                ]} />
                <Text style={styles.menuItem}>
                  Device: {connectedDevice ? 'Connected' : 'Disconnected'}
                </Text>
              </View>
              <TouchableOpacity onPress={handleLogout} style={styles.menuItemButton}>
                <Text style={[styles.menuItem, { color: 'red' }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </>
      )}
      
      {/* Header Content */}
      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        <View style={styles.leftSection}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
          )}
          <View>
            {subtitle ? 
              <>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
              </>
              : <Text adjustsFontSizeToFit numberOfLines={2} style={[styles.title, { fontSize: 25 }]}>{title}</Text>}
          </View>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Image
              source={state.user.user_img ? { uri: state.user.user_img } : require('../../../assets/defaultAvatar.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0c1536',
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    zIndex: 90, // Lower zIndex than dropdown
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 13,
    color: '#fff',
    marginTop: 2,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    zIndex: 101,
    minWidth: 150,
    marginTop:"2%"
  },
  menuItemButton: {
    paddingVertical: 8,
  },
  menuItem: {
    fontSize: 14,
  },
  connectionIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  },
  backButton: {
    marginRight: 8,
  },
});