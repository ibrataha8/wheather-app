import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { VStack, Input, Icon, Text, Heading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; // Removed unnecessary import
import imag from '../../assets/background-3104413_1280.jpg';
import axios from 'axios';

const Home = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null); // Initialize weather as null

    const handleChooseCity = async () => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=760a9f4b6086e7b3fc4a29f14b698f88`
            );
            setWeather(res.data);
        } catch (error) {
            console.log(error);
            setWeather(null);
        }
    };

    return (
        <ImageBackground source={imag} style={styles.image}>
            <SafeAreaView style={{ marginTop: 45 }}>
                <VStack space={5} alignItems="center">
                    <Heading size="md">Weather App</Heading>
                    <Input
                        placeholder="Search City"
                        width="100%"
                        borderRadius={4}
                        py={3}
                        color="white"
                        px={1}
                        fontSize={20}
                        onChangeText={(text) => setCity(text)}
                        InputLeftElement={
                            <Icon
                                m={2}
                                ml={3}
                                size={8}
                                color="gray.400"
                                as={<MaterialIcons name="search" />}
                            />
                        }
                        InputRightElement={
                            <Icon
                                m={2}
                                mr={3}
                                size={10}
                                onPress={handleChooseCity}
                                color="green.400"
                                as={<MaterialIcons name="check-circle" />}
                            />
                        }
                    />
                </VStack>
                {weather && (
                    <View>
                        <Text style={styles.city}>{weather?.name}</Text>
                    </View>
                )}
                {weather && (
                    <View style={styles.weather}>
                        <Text style={styles.temp}>{Math.floor(weather?.main?.temp - 273.15)} °C</Text>
                    </View>
                )}
                {weather && (
                    <View style={styles.weather}>
                        <Text style={styles.temper}>{weather?.weather[0]?.main}</Text>
                    </View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    city: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 25,
    },
    weather: {
        alignItems: 'center',
    },
    temp: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '800',
        paddingHorizontal: 40,
        paddingVertical: 70,
        fontSize: 70,
        marginTop: 15,
        textShadowRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        borderRadius: 30,
    },
    temper: {
        color: 'white',
        fontWeight: 'bold',
        padding: 38,
        fontSize: 40,
        shadowColor: 'black',
        shadowOffset: { width: -1, height: 3 },
        shadowOpacity: 0.7,
    },
});

export default Home;
