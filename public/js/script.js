(function () {
    let donateBtns = document.querySelectorAll('.donateBtn, .buyBtn');
    donateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // let id = btn.getAttribute('data-id');
            // let amount = btn.getAttribute('data-amount');
            // let name = btn.getAttribute('data-name');
            // let email = btn.getAttribute('data-email');
            // let phone = btn.getAttribute('data-phone');
            // let url = `/donate/${id}/${amount}/${name}/${email}/${phone}`;
            // window.location.href = url;
            document.getElementById('paymentMethods').scrollIntoView({ behavior: 'smooth' });
        })
    })

    let drawOpts = document.querySelectorAll('.drawOpt');
    drawOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            let val = opt.lastChild.textContent;
            let selectedNumbers = document.querySelectorAll('.selectedNumber');
            for (let i = 0; i < selectedNumbers.length; i++) {
                if (selectedNumbers[i].textContent == "" || selectedNumbers[i].textContent == null) {
                    selectedNumbers[i].textContent = val;
                    selectedNumbers[i].classList.toggle('bg-green-600');
                    opt.classList.toggle('bg-green-600');
                    opt.classList.toggle('text-white');
                    opt.classList.toggle('bg-white');
                    break;
                }
                else if (val == selectedNumbers[i].textContent) {
                    selectedNumbers[i].textContent = "";
                    selectedNumbers[i].classList.toggle('bg-green-600');
                    opt.classList.toggle('bg-green-600');
                    opt.classList.toggle('text-white');
                    opt.classList.toggle('bg-white');
                    break;
                }
            }
            console.log(selectedNumbers);
        })
    }
    )
})();