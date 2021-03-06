import React from 'react';
import { View, Text, Image } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

interface Props extends RectButtonProps {
    title: string;
    icon: React.FC<SvgProps>;
    checked?: boolean;
    hasCheckBox?: boolean;
}

export function Category({
    title,
    icon: Icon,
    checked = false,
    hasCheckBox = false,
    ...props
}: Props) {
    const { secondary50, secondary70, secondary85, secondary40 } = theme.colors;
    return (
        <RectButton {...props}>
            <LinearGradient
                style={styles.container}
                colors={[secondary50, secondary70]}
            >
                <LinearGradient
                    style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
                    colors={[checked ? secondary85 : secondary40, secondary40]}
                >
                    {hasCheckBox && (
                        <View style={checked ? styles.checked : styles.check} />
                    )}
                    <Icon width={48} height={48} />
                    <Text style={styles.title}>{title}</Text>
                </LinearGradient>
            </LinearGradient>
        </RectButton>
    );
}
