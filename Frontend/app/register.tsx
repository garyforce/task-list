import AuthService from '@/service/authService';
import { router, useNavigation } from 'expo-router';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, Button } from 'react-native';
import tw from 'twrnc';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigation();
    navigation.setOptions({ title: 'Register' })
    
    useFocusEffect(
        useCallback(() => {
            const checkUserLoggedIn = async () => {
                const isLoggedIn = await AuthService.isUserLoggedIn();
                if (isLoggedIn) {
                    router.navigate("/userHome");
                }
            };
            checkUserLoggedIn();
        }, [])
    );

    const handleRegister = async () => {
        if (!name) {
            setErrorMessage('Name is required');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email address');
            return;
        }
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        }
        try {
            const response = await AuthService.register(name, email, password);
            console.log('Success', 'User registered successfully');
            setErrorMessage(''); // Clear any previous error message
            router.navigate("/userHome");
        } catch (error) {
            setErrorMessage('Failed to register user');
        }
    };

    return (
        <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
            <View style={tw`bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md`}>
                <Text style={tw`text-2xl font-bold mb-4 text-center`}>Register</Text>
                {errorMessage ? (
                    <Text style={tw`text-red-500 mb-4 text-center`}>{errorMessage}</Text>
                ) : null}
                <TextInput
                    style={tw`border border-gray-300 rounded p-2 mb-4 w-full`}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={tw`border border-gray-300 rounded p-2 mb-4 w-full`}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={tw`border border-gray-300 rounded p-2 mb-4 w-full`}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Register" onPress={handleRegister} />
            </View>
        </View>
    );
};

export default Register;