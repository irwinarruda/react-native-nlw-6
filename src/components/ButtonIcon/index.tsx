import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';

import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';

interface IProps extends RectButtonProps {
    title: string;
}

export function ButtonIcon({ title, ...props }: IProps) {
    return (
        <RectButton style={styles.container} {...props}>
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </RectButton>
    );
}
