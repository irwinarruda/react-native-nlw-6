import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function Home() {
    const navigation = useNavigation();
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<Array<AppointmentProps>>(
        [],
    );

    function handleCategorySelect(categoryId: string): void {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }
    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }
    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelected });
    }

    async function loadAppointments() {
        try {
            const response = await AsyncStorage.getItem(
                COLLECTION_APPOINTMENTS,
            );
            const storage: AppointmentProps[] = response
                ? JSON.parse(response)
                : [];

            if (category) {
                setAppointments(
                    storage.filter((item) => item.category === category),
                );
            } else {
                setAppointments(storage);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadAppointments();
        }, [category]),
    );

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>
            <View>
                <CategorySelect
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                    hasCheckBox={false}
                />
                {loading ? (
                    <Load />
                ) : (
                    <>
                        <ListHeader
                            title="Partidas agendadas"
                            subtitle={`Total ${appointments.length}`}
                        />
                        <FlatList
                            data={appointments}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Appointment
                                    data={item}
                                    onPress={() =>
                                        handleAppointmentDetails(item)
                                    }
                                />
                            )}
                            contentContainerStyle={{ paddingBottom: 69 }}
                            ItemSeparatorComponent={() => <ListDivider />}
                            style={styles.matches}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
                )}
            </View>
        </Background>
    );
}
