const listFromJson =  (addList) => {
    fetch('./Products.json')
        .then(res => {
            debugger
            return res.json()})
        .then(data => {
            debugger
            addList(data.products);
        })
}
const getSelectedSize = (id, index) => {
    let e = document.getElementById(id + index);
    if (e) {
        const value = e.options[e.selectedIndex].value;
        if (value === "Choose size")
            return false;
        else
            return value
    }
    return
}

module.exports = {
    listFromJson,
    getSelectedSize
}