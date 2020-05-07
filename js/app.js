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
    let numQuesInput = document.querySelector('input[type=number]');

    // Initially add 50 questions
    addRemoveQues(numQuesInput.value);

    // On click of download button
    document.querySelector("button").onclick = btnclick;

    // Enter keypress on input field or out of focus, add/remove ques
    numQuesInput.onkeypress = function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            addRemoveQues(e.target.value);
        }
    }
    numQuesInput.onblur = (e) => addRemoveQues(e.target.value);
}

function addRemoveQues(numQues) {
    if (numQues < 0 || numQues > 1000)
        return;

    let table = document.querySelector('table'),
        trow = document.querySelector('tr');

    // table.childcount - 1 because there is tbody child in table which we don't want to count
    if (numQues > table.childElementCount - 1) {
        for (let i = table.childElementCount; i <= numQues; i++) {
            trow = trow.cloneNode(true);
            let inputs = trow.querySelectorAll('input');
            let td = trow.querySelector('td');

            td.innerHTML = i + '.';
            inputs.forEach(element => {
                element.name = i;
                element.onclick = toggleRadio;
            });

            table.appendChild(trow);
        }
    }
    else {
        for (let i = table.children.length - 1; i > numQues; i--) {
            table.removeChild(table.lastElementChild);
        }
    }
}

function toggleRadio() {
    thisRadio = this
    if (thisRadio.classList.contains("imChecked")) {
        thisRadio.classList.remove("imChecked");
        thisRadio.checked = false;
    }
    else {
        thisRadio.checked = true;
        thisRadio.classList.add("imChecked");
    };
}

function btnclick() {
    html2canvas(document.body).then(function (canvas) {
        // Export canvas as a blob 
        canvas.toBlob(function (blob) {
            // Generate file download
            window.saveAs(blob, "OMR.png");
        });
    });
}
