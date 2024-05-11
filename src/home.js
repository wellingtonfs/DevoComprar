import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import Item from './item';
import ModalAdd from './modalAdd';
import ModalFixos from './modalFixos';

import banco from './banco';
import storage from './storage';
import utils from './utils';

// name (op), date (auto), times, type, value

var modaladd = false;
var modalconfig = false;
var started = false;

var items = [];

export default function Home() {
    const [update, setUpdate] = useState(false);

    const updateScreen = () => setUpdate(!update);

    async function OnRemoveItem(item) {
        let i = 0;

        for (; i < items.length; i++) {
            if (items[i].name == item.name && items[i].value.toFixed(2) == item.value.toFixed(2) && items[i].maxTimes == item.maxTimes) {
                break;
            }
        }

        items.splice(i, 1);

        banco.addGasto(-1 * item.value)

        await banco.save();
        await storage.saveListItem("added", items);

        ToastAndroid.show("Item apagado", ToastAndroid.SHORT);

        updateScreen();
    }

    async function ModalAddResponse(newItem) {
        modaladd = false;

        if (newItem == null) {
            return updateScreen();
        }

        items.push(newItem);

        banco.addGasto(newItem.value)

        await banco.save();
        await storage.saveListItem("added", items);

        updateScreen();
    }

    useEffect(() => {
        (async () => {
            await banco.load();

            const list = await storage.getListItem("added");

            items = list == null ? [] : list;

            started = true;

            updateScreen();
        })();
    }, [])

    if (!started) {
        return (
            <View style={styles.container}>
                <View style={styles.viewTop}></View>

                <View style={styles.viewBottom}>
                    <ActivityIndicator size={'large'}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewTop}>
                <View style={styles.viewInfo}>
                    <Text style={styles.text_money}>{banco.available().toFixed(2)}</Text>
                    <Text style={styles.text_saldo}>saldo</Text>
                </View>

                <View style={styles.viewItems}>
                    <TouchableOpacity style={styles.touchBtn} onPress={() => {
                        Alert.alert("Confirmar", "Tem certeza que deseja apagar tudo?", [
                            {
                                text: "Cancelar",
                                onPress: () => {}
                            },
                            {
                                text: "Apagar",
                                onPress: async () => {
                                    items = utils.stepMonth(items);

                                    const gasto = items.reduce((acc, e) => acc + e.value, 0.0);

                                    banco.resetGastos();
                                    banco.addGasto(gasto);

                                    await banco.save();
                                    await storage.saveListItem("added", items);

                                    updateScreen();
                                }
                            }
                        ])
                    }}>
                        <AntDesign name="rocket1" size={36} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.touchBtn}
                        onPress={() => {
                            modalconfig = true;

                            updateScreen();
                        }}
                    >
                        <Ionicons name="settings" size={36} color="white" />
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.viewBottom}>
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => <Item item={item} onRemove={OnRemoveItem}/>}
                    style={{ width: '100%' }}
                    ItemSeparatorComponent={<View style={styles.sep}></View>}
                    ListEmptyComponent={<View style={styles.viewEmpty}><Text>Nenhum item adicionado</Text></View>}
                />
            </View>

            <TouchableOpacity
                style={styles.floatBtn}
                onPress={() => {
                    modaladd = true;

                    updateScreen();
                }}
            >
                <Ionicons name="add-circle-sharp" size={64} color="#710117" />
            </TouchableOpacity>

            <ModalAdd visible={modaladd} onClose={ModalAddResponse}/>
            <ModalFixos visible={modalconfig} onClose={() => {
                modalconfig = false;

                updateScreen();
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    viewTop: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    viewBottom: {
        flex: 4,
        flexDirection: "column",
        backgroundColor: "#FFFFFF",

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    viewInfo: {
        paddingHorizontal: 20
    },
    viewItems: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    viewEmpty: {
        alignItems: 'center',
        padding: 20
    },
    sep: {
        height: 0.5,
        width: '90%',
        backgroundColor: '#54627B',
        alignSelf: 'center'
    },
    touchBtn: {
        paddingHorizontal: 8
    },
    text_saldo: {
        color: "#ffffff",
        fontSize: 18
    },
    text_money: {
        color: "#ffffff",
        fontWeight: 'bold',
        fontSize: 32
    },
    floatBtn: {
        position: 'absolute',
        bottom: 30,
        right: 30
    }
});
