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
    let selectedNumbers = document.querySelectorAll('.selectedNumber');
    drawOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            let val = opt.lastChild.textContent;
            for (let i = 0; i < selectedNumbers.length; i++) {
                if (selectedNumbers[i].textContent == "" || selectedNumbers[i].textContent == null) {
                    selectedNumbers[i].textContent = val;
                    // if (!selectedNumbers[i].classList.contains('bg-green-600')) {
                    // }
                    if (!opt.classList.contains('bg-green-600')) {
                        opt.classList.toggle('bg-green-600');
                        opt.classList.toggle('text-white');
                        opt.classList.toggle('bg-white');
                    }
                    break;
                }
            }
        })
    }
    )

    selectedNumbers.forEach(num => {
        num.addEventListener('click', () => {
            if(num.textContent == "" || num.textContent == null) return;
            let check = false;
            let index = 0;
            for (let i = 0; i < selectedNumbers.length; i++) {
                if (selectedNumbers[i] !== num && selectedNumbers[i].textContent == num.textContent) {
                    check = true;
                    break;
                }
            }
            if (!check) {
            for (let i = 0; i < drawOpts.length; i++) {
                if (drawOpts[i].lastChild.textContent == num.textContent) {
                    check = true;
                    index = i;
                    break;
                }
            }
                drawOpts[index].classList.toggle('bg-green-600');
                drawOpts[index].classList.toggle('text-white');
                drawOpts[index].classList.toggle('bg-white');
            }
            num.textContent = "";
        })
    })

})();