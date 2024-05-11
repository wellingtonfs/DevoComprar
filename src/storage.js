import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

    async saveListItem(key, lista) {
        try {
            const jsonValue = JSON.stringify(lista);

            await AsyncStorage.setItem('listitem_' + key, jsonValue);

        } catch (e) {
            return null;
        }
    }

    async getListItem(key) {
        try {
            const jsonValue = await AsyncStorage.getItem('listitem_' + key);

            if (jsonValue == null) return null;

            const parsed = JSON.parse(jsonValue);

            return parsed.map(e => {
                return {...e, date: new Date(e.date)}
            });

        } catch (e) {
            return null;
        }
    }

    async saveVarBanco(salario, fixo, gasto) {
        try {
            const jsonValue = JSON.stringify({
                salario: salario,
                fixo: fixo,
                gasto: gasto
            });

            await AsyncStorage.setItem('banco', jsonValue);

        } catch (e) {
            return null;
        }
    }

    async getVarBanco() {
        try {
            const jsonValue = await AsyncStorage.getItem('banco');

            return jsonValue != null ? JSON.parse(jsonValue) : null;

        } catch (e) {
            return null;
        }
    }

}

export default new Storage();