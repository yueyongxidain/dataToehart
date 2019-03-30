let i = 0;
function reload() {
    window.location.reload();
    i--
}

window.onresize = function () {
    if (i !== 0) return
    i++;
    setTimeout(reload, 0)

}