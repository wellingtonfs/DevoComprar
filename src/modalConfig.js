import { useState } from "react";
import { Alert, Keyboard, Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from "react-native";

import banco from "./banco";

export default function ModalConfig({ visible, onClose }) {
    const [salario, setSalario] = useState(banco.salario.toFixed(2).toString())

    async function onPressAplicar() {
        if (salario.length == 0) {
            return Alert.alert("", "Campo salário está em branco")
        }

        let sSalario = Number(salario);

        if (Number.isNaN(sSalario)) {
            return Alert.alert("", "Salário inválido")
        }

        banco.setSalario(sSalario);

        await banco.save();

        Keyboard.dismiss();

        onClose();
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
                    <Text style={styles.title}>Ajustes</Text>

                    <View style={styles.viewInput}>
                        <Text>Salário</Text>

                        <TextInput
                            placeholder="Salário"
                            style={styles.textinput}
                            keyboardType={"numeric"}
                            value={salario}
                            onChangeText={setSalario}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.btnConfirm}
                        onPress={onPressAplicar}
                    >
                        <Text style={styles.txtBtnConfirm}>Aplicar</Text>
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
    viewInput: {
        width: "80%",
        paddingVertical: 10
    },
    textinput: {
        width: "100%",
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