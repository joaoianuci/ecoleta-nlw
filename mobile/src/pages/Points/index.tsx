import React, { useEffect, useState } from 'react';

import { View, Text, Image, SafeAreaView, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import * as Location from 'expo-location'
import Emoji from 'react-native-emoji';
import { SvgUri } from 'react-native-svg';

import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import api from '../../service/api';

interface Item {
    id: number,
    title: string,
    image_url: string,
}

interface Params {
    uf: string,
    city: string,
}

interface Point {
    id: number,
    name: string,
    image: string,
    image_url: string,
    latitude: number,
    longitude: number,
}

const Points = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([0]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
    const route = useRoute();
    const routeParams = route.params as Params;
    
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    }, [])
    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert('Ooooops', 'Precisamos de sua permissão para obter a localização');
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;
            setInitialPosition([
                latitude,
                longitude
            ]);
        }
        loadPosition();
    }, [])

    useEffect(() => {
        api.get('points', {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                items: selectedItems
            }
        }).then( response => {
            setPoints(response.data);
        })
    }, [selectedItems])
    const navigation = useNavigation();
    function handleNavigateBack() {
        navigation.goBack();
    }
    function handleNavigateToDetail(point_id:number) {
        navigation.navigate('Detail', { point_id });
    }
    function handleSelectedItem(id: number) {
        if (selectedItems.includes(id)) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity>
                    <Icon name="arrow-left" size={20} color="#34cb79" onPress={handleNavigateBack}></Icon>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 24,
                }}>
                    <Emoji name='grinning' style={{ fontSize: 20 }} />
                    <Text style={styles.title}>Bem vindo.</Text>
                </View>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta</Text>
                <View style={styles.mapContainer}>
                    { initialPosition[0] !== 0 && (
                        <MapView 
                        style={styles.map} 
                        initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}>
                           {points.map(point => (
                                <Marker
                                key={point.id}
                                onPress={() => {handleNavigateToDetail(point.id)}}
                                style={styles.mapMarker}
                                coordinate={{
                                    latitude: point.latitude,
                                    longitude: point.longitude,
                                }}>
                                <View style={styles.mapMarkerContainer}>
                                    <Image
                                        source={{
                                            uri: point.image_url
                                        }}
                                        style={styles.mapMarkerImage}
                                    />
                                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                </View>
                            </Marker>
                           ))}
                        </MapView>
                    )}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                    }}
                >
                    {items.map(item => (
                        <TouchableOpacity
                            key={String(item.id)}
                            style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]}
                            onPress={() => { handleSelectedItem(item.id) }}
                            activeOpacity={0.6}
                        >
                            <SvgUri width={42} height={42} uri={item.image_url} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

export default Points;
