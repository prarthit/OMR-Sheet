if (document.readyState === 'ready' || document.readyState === 'complete') {
    jsload();
}

else {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            jsload();
        }
    }
}

function jsload() {
    let table = document.querySelector('table'),
        trow = document.querySelector('tr');

    for (let i = 1; i <= 50; i++) {
        let inputs = trow.querySelectorAll('input');
        let td = trow.querySelector('td');

        td.innerHTML = i + '.';
        inputs.forEach(element => {
            element.name = i;
        });

        table.appendChild(trow);
        trow = trow.cloneNode(true);
    }
}