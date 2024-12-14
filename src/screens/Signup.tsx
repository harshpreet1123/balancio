import React, { useState } from "react";
import { TextInput, Button, Text, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

// Initialize Firestore

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle signup
  const handleSignup = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      // Create user with email and password

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // After user is created, add username to Firestore
      try {
        await addDoc(collection(db, "users"), {
          username,
          email,
          uid: userCredential.user.uid,
        });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
      alert("User created successfully!");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
      <Button
        title={loading ? "Signing up..." : "Sign Up"}
        onPress={handleSignup}
        disabled={loading}
      />
    </View>
  );
};

export default SignUp;
