import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import CustomHeader from '../ui/CustomHeader';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const { width } = Dimensions.get('window');

const BookDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { book } = route.params;
  const { state, setState } = useContext(AuthContext);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);


  useEffect(() => {
    axios.get(`https://brailliantweb.onrender.com/api/allsections/${state.user._id}`)
      .then((response) => {
        setSections(response.data.sections)
      })
  }, [])

  useEffect(() => {
    if (!selectedSection) return;

    axios.get(`https://brailliantweb.onrender.com/api/allstudents/section/${selectedSection}`)
      .then((response) => {
        setStudents(response.data.students)
      })
      .catch((err) => console.error(err));
  }, [selectedSection]);

  const handleBookSelect = () => {
    if (!selectedSection || !selectedStudent) {
      Alert.alert(
        "Missing Information",
        "Please select both a section and a student before starting the session."
      );
      return;
    }
    const studentObj = students.find((s) => s._id === selectedStudent);

    navigation.navigate('ReadSession', {
      bookTitle: book?.book_title,
      bookUrl: book?.book_file,
      bookId: book._id,
      studentName: `${studentObj?.student_fname} ${studentObj?.student_mi || ''} ${studentObj?.student_lname}`.trim(),
      studentId: studentObj?._id
    });
  };

  return (
    <>
      <CustomHeader title={book?.book_title} onBack={() => navigation.goBack()} image={state.user.user_img} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Book Info */}
          <View style={styles.bookRow}>
            <Image
              source={book?.book_img 
                ? { uri: book?.book_img } 
                : require('../../../assets/noimg.png')
              }
              style={styles.bookImage}
              onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
            />
            <View style={styles.bookInfo}>
              <Text style={styles.bookText}>Author: {book?.book_author || 'Unknown'}</Text>
              <Text style={styles.bookText}>Genre: {book?.book_genre || 'Unknown'}</Text>
              <Text style={styles.bookDesc}>
                {book?.book_description || 'No description available.'}
              </Text>
            </View>
          </View>

          {/* Class List */}
          <Text style={styles.sectionTitle}>Class List</Text>
          <View style={styles.infoBox}>
            {/* Section Dropdown */}
            <Text style={styles.label}>Section:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedSection(value)}
              value={selectedSection}
              items={sections.map((s) => ({
                label: `${s.section_level}  ${s.section_name}`,
                value: s._id
              }))}
              placeholder={{ label: 'Select a section...', value: null }}
              style={pickerSelectStyles}
            />

            {/* Student Dropdown */}
            <Text style={styles.label}>Student:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedStudent(value)}
              value={selectedStudent}
              items={students.map((s) => ({
                label: `${s.student_lname}, ${s.student_fname} ${s.student_mi || ''}`,
                value: s._id
              }))}
              placeholder={{ label: 'Select a student...', value: null }}
              style={pickerSelectStyles}
            />

          </View>

          {/* Start Session Button */}
          <TouchableOpacity style={styles.sessionButton} onPress={handleBookSelect}>
            <Ionicons name="play-circle" size={20} color="#fff" />
            <Text style={styles.sessionText}>START SESSION</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  content: {
    padding: 16,
  },
  bookRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bookImage: {
    width: width * 0.25,
    height: width * 0.35,
    borderRadius: 10,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
  },
  bookText: {
    fontSize: width < 600 ? 14 : 16,
    marginBottom: 2,
  },
  bookDesc: {
    fontSize: width < 600 ? 12 : 14,
    marginTop: 4,
    color: '#444',
  },
  sectionTitle: {
    fontSize: width < 600 ? 20 : 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  label: {
    fontSize: width < 600 ? 13 : 15,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: width < 600 ? 13 : 15,
  },
  sessionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  sessionText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    color: '#000',
    marginBottom: 10,
  },
  inputAndroid: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    color: '#000',
    marginBottom: 10,
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
});
