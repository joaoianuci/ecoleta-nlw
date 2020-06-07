import React, { useState, useEffect } from 'react';

import { View, Image, Text, SafeAreaView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../service/api';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

interface Params {
    point_id: number;
}

interface Item {
    title: string;
}
interface Point {
    name: string,
    image: string,
    image_url: string,
    whatsapp: string,
    email: string,
    city: string,
    uf: string,
}


const Detail = () => {
    const [point, setPoint] = useState<Point>({} as Point)
    const [items, setItems] = useState<Item[]>([])
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Params;
    useEffect(() => {
        api.get(`points/${routeParams.point_id}`).then(response => {
            setItems(response.data.items)
            setPoint(response.data);
        });
    }, []);
    function handleNavigateBack() {
        navigation.goBack();
    }
    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Interesse na coleta de resíduos',
            recipients: [point.email]
        })
    }
    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${point.whatsapp}&text=Tenho interesse sobre coleta de resíduo`);
    }
    if (!point) {
        return null;
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity>
                    <Icon name="arrow-left" size={20} color="#34cb79" onPress={handleNavigateBack}></Icon>
                </TouchableOpacity>
                <Image
                    source={{
                        uri: point.image_url
                    }}
                    style={styles.pointImage}
                />
                <Text style={styles.pointName}>{point.name}</Text>
                <Text style={styles.pointItems}>{items.map(item => item.title).join(', ')}</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{point.city}, {point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color='#FFF' />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name="mail" size={20} color='#FFF' />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    )
};

export default Detail;
