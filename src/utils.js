class Utils {
    stepMonth(listitem) {
        return listitem.map(e => {
            return {...e, times: e.times + 1}
        }).filter(e => e.times <= e.maxTimes);
    }
}

export default new Utils();