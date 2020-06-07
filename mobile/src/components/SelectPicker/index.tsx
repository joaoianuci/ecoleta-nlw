import RNPickerSelect from 'react-native-picker-select';
import React, { useEffect, useState } from 'react'
import styles from '../../components/SelectPicker/styles';
import { View } from 'react-native';

interface Params{
    data: string[],
    valueChange: Function,
    placeHolder: string,
}

interface Option{
    label: string,
    value: string,
}

const SelectPicker = ({ data, valueChange, placeHolder }:Params) => {
    const [ options, setOptions ] = useState<Option[]>([])
    useEffect(() => {
        const initialOptions = data.map( item => {
            return {
                label: item,
                value: item
            }
        })
        setOptions(initialOptions);
    }, [data])
    function handleSelectedOption(value:string){
        valueChange(value);
    }
    return (
        <View style={styles.container}>
            <RNPickerSelect
                placeholder={{
                    label: `${placeHolder}`
                }}
                onValueChange={(value) => handleSelectedOption(value)}
                items={options}
            />  
        </View>
    );
};

export default SelectPicker;