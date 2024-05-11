import { useState } from "react";
import { Alert, Keyboard, Modal, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from "react-native";

export default function ModalAdd({ visible, onClose }) {
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [times, setTimes] = useState('')

    function onPressAdd() {
        if (value.length == 0) {
            return Alert.alert("", "Valor não informado!")
        }

        let sName = (name.length == 0) ? "Item" : name;
        let sValue = Number(value);
        let sTimes = (times.length == 0) ? 1 : Number(times);

        if (Number.isNaN(sTimes) || sTimes < 1) {
            return Alert.alert("", "Número de vezes não pode ser menor que 1")
        }

        if (Number.isNaN(sValue)) {
            return Alert.alert("", "Valor inválido")
        }

        setName('')
        setValue('')
        setTimes('')

        Keyboard.dismiss();

        onClose({ name: sName, date: new Date(), times: 1, maxTimes: sTimes, value: sValue })
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => onClose(null)}
        >
            <Pressable style={styles.container}
                onPress={() => onClose(null)}
            >
                <Pressable style={styles.viewInfo}>
                    <Text style={styles.title}>Adicionar Item</Text>

                    <TextInput
                        placeholder="Nome do item (opcional)"
                        style={styles.textinput}
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        placeholder="Valor"
                        style={styles.textinput}
                        keyboardType={"numeric"}
                        value={value}
                        onChangeText={setValue}
                    />

                    <TextInput
                        placeholder="Quantas vezes (padrão: 1)"
                        style={styles.textinput}
                        keyboardType={"numeric"}
                        value={times}
                        onChangeText={setTimes}
                    />

                    <TouchableOpacity
                        style={styles.btnConfirm}
                        onPress={onPressAdd}
                    >
                        <Text style={styles.txtBtnConfirm}>Adicionar</Text>
                    </TouchableOpacity>

                </Pressable>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000aa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewInfo: {
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center'
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10
    },
    textinput: {
        width: "80%",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#710117',
        padding: 5,
        marginVertical: 2
    },
    btnConfirm: {
        marginVertical: 15,
        padding: 15,
        borderRadius: 5,
        backgroundColor: "#710117"
    },
    txtBtnConfirm: {
        color: '#fff',
        fontWeight: 'bold'
    }
})