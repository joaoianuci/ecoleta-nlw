import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground,Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SelectPicker from '../../components/SelectPicker';

import axios from 'axios';

import styles from './styles';

interface IBGEUFResponse {
    sigla: string;
}
interface IBGECITYResponse {
    nome: string;
}

const Home = () => {
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);
    useEffect(() => {
        axios.get<IBGECITYResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cities = response.data.map(city => city.nome);
            setCities(cities);
        });
    }, [selectedUf]);

    function handleNavigateToPoints(uf:string, city:string){
        navigation.navigate('Points', {
            uf,
            city,
        });
    }
    function handleSelectedUf(value:string) {
        const uf = value;
        setSelectedUf(uf);
    }
    function handleSelectedCity(value:string) {
        const city = value;
        setSelectedCity(city);
    }
    return(
       <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        > 
           <View style={styles.main}>
                <Image source={require('../../assets/logo1.png')}></Image>
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
           </View>
           <View style={styles.footer}>
               <SelectPicker data={ufs} valueChange={handleSelectedUf} placeHolder='Selecione um estado'/>
               <SelectPicker data={cities} valueChange={handleSelectedCity} placeHolder='Selecione uma cidade'/>
               <RectButton style={styles.button} onPress={() => handleNavigateToPoints(selectedUf, selectedCity)}>
                   <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24}></Icon>
                        </Text>
                   </View>
                   <Text style={styles.buttonText}>
                       Entrar
                   </Text>
               </RectButton>
           </View>

       </ImageBackground>
    )
}; 

export default Home;
