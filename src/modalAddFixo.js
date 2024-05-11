import { useState } from "react";
import { Alert, Keyboard, Modal, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from "react-native";

export default function ModalAddFixo({ visible, onClose }) {
    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    function onPressAdd() {
        if (name.length == 0) {
            return Alert.alert("", "Nome não informado!")
        }

        if (value.length == 0) {
            return Alert.alert("", "Valor não informado!")
        }

        let sValue = Number(value);

        if (Number.isNaN(sValue)) {
            return Alert.alert("", "Valor inválido")
        }

        setName('')
        setValue('')

        Keyboard.dismiss();

        onClose({ name, date: new Date(), times: -1, maxTimes: 1, value: sValue })
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
                    <Text style={styles.title}>Adicionar gasto fixo</Text>

                    <TextInput
                        placeholder="Nome do item"
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