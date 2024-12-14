import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const SignUp = ({ auth }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    setError(null);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully!');
      try {
        await addDoc(collection(db, "users"), {
          username,
          email,
          uid: userCredential.user.uid,
        });
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default SignUp;
