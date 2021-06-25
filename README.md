# Aula 1

- codigo: '#together'

# Aula 2

- codigo: '#unidade'

# Aula 3

- codigo: '#embuscadeevolução'

# Aula 4

- codigo: '#legacy'

# Aula 5

- codigo: '#juntos no próximo nível'

```typescript

import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

export function Home() {
    return (
        <View style={styles.container}>
            <View></View>
        </View>
    );
}


import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


```
