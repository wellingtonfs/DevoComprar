import Storage from "./storage";

class Banco {
    constructor () {
        this.salario = 0;
        this.fixo = 0;
        this.gasto = 0;
    }

    async load() {
        const values = await Storage.getVarBanco();

        if (values == null) return;

        this.salario = values.salario;
        this.fixo = values.fixo;
        this.gasto = values.gasto;
    }

    async save() {
        await Storage.saveVarBanco(this.salario, this.fixo, this.gasto);
    }

    available() {
        return this.salario - (this.fixo + this.gasto);
    }

    addGasto(gasto) {
        this.gasto += gasto;
    }

    setSalario(salario) {
        this.salario = salario;
    }

    setFixo(fixo) {
        this.fixo = fixo;
    }

    resetGastos() {
        this.gasto = 0;
    }
}

export default new Banco();