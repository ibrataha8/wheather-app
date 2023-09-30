import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground, SafeAreaView } from 'react-native';
import { VStack, Input, Icon, Text, Heading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import imag from '../../assets/background-3104413_1280.jpg';
import axios from 'axios';

const Home = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null); 
    const [loading, setLoading] = useState(false)

    const handleChooseCity = async () => {
        try {
            setLoading(true)
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=760a9f4b6086e7b3fc4a29f14b698f88`
            );
            setWeather(res.data);
        } catch (error) {
            console.log(error);
            alert("Invalid City")
            setWeather(null);
        } finally {
            setLoading(false)
        }
    };

    return (

        <ImageBackground source={imag} style={styles.image}>
            <SafeAreaView style={{ marginTop: 45 }}>
                <VStack space={5} alignItems="center">
                    <Heading size="md">Weather App</Heading>
                    <Input
                        placeholder="Enter City"
                        width="80%"
                        borderRadius={10}
                        color="white"
                        px={3}
                        fontSize={20}
                        onChangeText={(text) => setCity(text)}
                        InputLeftElement={
                            <Icon
                                size={6}
                                ml={2}
                                color="gray.400"
                                as={<MaterialIcons name="search" />}
                            />
                        }
                        InputRightElement={
                            loading ? (
                                <ActivityIndicator size="large" color="green" />
                            ) : (
                                <Icon
                                    size={8}
                                    onPress={() => handleChooseCity(city)}
                                    color="blue.400"
                                    as={<MaterialIcons name="check-circle" />}
                                />
                            )
                        }
                    />

                </VStack>
                {weather && (
                    <>
                        <View>
                            <Text style={styles.city}>{weather?.name}, {weather?.sys?.country} </Text>
                        </View>
                        <View style={styles.weather}>
                            <Text style={styles.temp}>{Math.floor(weather?.main?.temp - 273.15)} °C</Text>
                        </View>
                        <View style={styles.weather}>
                            <Text style={styles.temper}>{weather?.weather[0]?.main}</Text>
                        </View>
                        <View style={styles.weatherMN}>
                            <Text style={styles.min}>Min : {Math.floor(weather?.main?.temp_min - 273.15)} °C</Text>
                            <Text style={styles.max}>Max : {Math.floor(weather?.main?.temp_max - 273.15)} °C</Text>
                        </View>
                    </>
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
        padding: 25,
        fontSize: 30,
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
        fontStyle: 'italic',
        shadowColor: 'black',
        shadowOffset: { width: -1, height: 3 },
        shadowOpacity: 0.7,
    },
    max: {
        color: 'red',
        fontSize: 25,
        padding: 22,
        textAlign: 'left',


    },
    min: {
        color: "blue",
        fontSize: 25,
        padding: 22,
        textAlign: 'right',
    },
    weatherMN: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 38,
    }
});

export default Home;
