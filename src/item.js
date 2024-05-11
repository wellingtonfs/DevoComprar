import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// name (op), date (auto), times, type, value

// comida, eletronico, outro

export default function Item({ item, onRemove }) {

    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {
                if (typeof onRemove !== 'undefined') {
                    Alert.alert("Apagar item", "Você está prestes a apagar o item:\n\n" + item.name,
                        [
                            {
                                text: "Cancelar",
                                onPress: () => {}
                            },
                            {
                                text: "Apagar item",
                                onPress: () => {onRemove(item)}
                            },
                        ]
                    )
                }
            }}
        >
            <View style={styles.viewIconName}>
                <View style={styles.viewIconDate}>
                    <MaterialCommunityIcons name="bank" size={24} color="#54627B" />
                    <Text style={styles.textName}>{item.date.getDate()}/{item.date.getMonth() + 1}</Text>
                </View>
                <ScrollView horizontal={true}>
                    <Text>{item.name}</Text>
                </ScrollView>
            </View>

            <View style={styles.viewText}>
                {
                    item.maxTimes == 1 ?
                        <></>
                    :
                        <Text>{item.times}/{item.maxTimes}</Text>
                }
            </View>

            <View style={styles.viewText}>
                <Text>R$ {item.value.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    viewIconName: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textName: {
        flexWrap: "wrap"
    },
    viewText: {
        flex: 1,
        alignItems: 'center'
    },
    viewIconDate: {
        marginLeft: 30,
        marginRight: 20,
    },
});
