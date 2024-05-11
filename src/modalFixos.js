import { useState, useEffect } from "react";
import { FlatList, Modal, View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Storage from "./storage";
import banco from "./banco";
import Item from './item';

import ModalConfig from './modalConfig';
import ModalAddFixo from "./modalAddFixo";

let items = [];

let salMode = false;
let modalConfig = false;
let modalAdd = false;

async function CalcularFixos() {
    let total = 0;

    items.forEach(item => total += Number(item.value));

    banco.setFixo(total);

    await banco.save();
    await Storage.saveListItem("fixos", items);
}

export default function ModalFixos({ visible, onClose }) {
    const [update, setUpdate] = useState(false);

    const updateScreen = () => setUpdate(!update);

    useEffect(() => {
        Storage.getListItem("fixos").then((list) => {
            if (list !== null) {
                items = list;
                updateScreen();
            }
        })
    }, [])

    async function OnRemoveItem(item) {
        let i = 0;

        for (; i < items.length; i++) {
            if (items[i].name == item.name && items[i].value.toFixed(2) == item.value.toFixed(2)) {
                break;
            }
        }

        items.splice(i, 1);

        await CalcularFixos();

        ToastAndroid.show("Item apagado", ToastAndroid.SHORT);

        updateScreen();
    }

    async function OnCloseAddItem(item) {
        if (item != null) {
            items.push(item);

            await CalcularFixos();

            ToastAndroid.show("Item adicionado", ToastAndroid.SHORT);
        }

        modalAdd = false;

        updateScreen();
    }

    function OnCloseConfig() {
        modalConfig = false;
        updateScreen();
    }

    return (
        <Modal
            transparent={false}
            visible={visible}
            onRequestClose={() => onClose(null)}
        >
            <View style={styles.container}>
                <View style={styles.viewContent}>
                    <FlatList
                        data={items}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => <Item item={item} onRemove={OnRemoveItem}/>}
                        style={{ width: '100%' }}
                        ItemSeparatorComponent={<View style={styles.sep}></View>}
                        ListEmptyComponent={<View style={styles.viewEmpty}><Text>Nenhum item adicionado</Text></View>}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={styles.floatBtnAdd}
                onPress={() => {
                    if (salMode) {
                        modalConfig = true;
                    } else {
                        modalAdd = true;
                    }

                    updateScreen();
                }}
                onLongPress={() => {
                    salMode = !salMode;
                    updateScreen();
                }}
            >
                {
                    salMode ?

                        <FontAwesome5 name="money-check-alt" size={64} color="#710117" />

                    :

                       <Ionicons name="add-circle-sharp" size={64} color="#710117" />
                }
            </TouchableOpacity>

            <ModalAddFixo visible={modalAdd} onClose={OnCloseAddItem}/>
            <ModalConfig visible={modalConfig} onClose={OnCloseConfig}/>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#710117',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewContent: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        width: "95%",
        height: "90%"
    },
    sep: {
        height: 0.5,
        width: '90%',
        backgroundColor: '#54627B',
        alignSelf: 'center'
    },
    viewEmpty: {
        alignItems: 'center',
        padding: 20
    },
    floatBtnAdd: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        
    },
})