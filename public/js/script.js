(function () {
    setTimeout(() => {
        document.getElementById('pageloading').classList.add('hidden');
    }, 2000);
    setTimeout(() => {
        window.location.reload();
    }, 7200000);
})();