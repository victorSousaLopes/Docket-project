// await for load page
document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById('refresh-page').style.display = 'none';

    //focus method for put and remove '()' on number input, 
    //detail if you click outside and then inside again then the value remains the same
    document.getElementById('number-1').addEventListener('focus', (e) => {
        e.target.value == '' || e.target.value == null ? e.target.value = '(' : e.target.value;
    });
    
  
    document.getElementById('number-1').addEventListener('blur', (e) => {
        e.target.value == '' || e.target.value == '()' ? e.target.value = '' : e.target.value;
    });

    document.getElementById('number-2').addEventListener('focus', (e) => {
        e.target.value == '' || e.target.value == null ? e.target.value = '(' : e.target.value;
    });

    document.getElementById('number-2').addEventListener('blur', (e) => {
        e.target.value == '' || e.target.value == '()' ? e.target.value = '' : e.target.value;
    });


    // Object that has all values of input
    const obj = {}

    // Regular function | Show alert
    function showAlert(value, message, className) {

        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.setAttribute('id', 'danger');
        div.appendChild(document.createTextNode(message));

        //put in respective value of each div
        if (value == 'name') {
            const nameFull = document.getElementById('full-Name');
            nameFull.replaceWith(div);
        }

        if (value == 'email') {
            const candidateEmail = document.getElementById('email-candidate');
            candidateEmail.replaceWith(div);
        }

        if (value == 'numberOne') {
            const numberOne = document.getElementById('number-one');
            numberOne.replaceWith(div);
        }

        if (value == 'numberTwo') {
            const numberTwo = document.getElementById('number-two');
            numberTwo.replaceWith(div);
        }

        if (value == 'badRequest') {
            const btn = document.getElementById('btn-enviar');
            $(div).insertAfter(btn);
        }

     
        //timeout for remove alert
        setTimeout(() => {
            //remove border color
            document.getElementById('fullName').style.border = '';
            document.getElementById('email').style.border = '';
            document.getElementById('number-1').style.border = '';
            document.getElementById('number-2').style.border = '';
            //remove all div
            document.querySelector('#danger').remove();
            // put feedback divs back
            if (document.getElementById('full-Name') == null) {
                $(`<small id="full-Name" class="form-text text-muted">O nome é essêncial para identificação
                do candidato, confirme-o antes de enviá-lo!</small>`).insertAfter('#fullName');
            }
            if (document.getElementById('email-candidate') == null) {
                $(`   <small id="email-candidate" class="form-text text-muted">Digite o seu melhor
                e-mail!</small>`).insertAfter('#email');
            }
            if (document.getElementById('number-one') == null) {
                $(`<small id="number-one" class="form-text text-muted">Obrigatório.</small>`).insertAfter('#number-1');
            }
            if (document.getElementById('number-two') == null) {
                $(`<small id="number-two" class="form-text text-muted">Opcional.</small>`).insertAfter('#number-2');
            }
        }, 7000);
    }

    //Btn for validate and send datas
    document.getElementById('btn-enviar').addEventListener('click', (event) => {
        event.preventDefault();

        const name = document.getElementById('fullName').value,
            email = document.getElementById('email').value,
            numberOne = document.getElementById('number-1').value,
            numberTwo = document.getElementById('number-2').value;

        // Name
        if (name === '') {
            showAlert('name', 'Por-favor insira seu "NOME" no local indicado!', 'danger');
        }

        // get Name if regex
        const newName = name.match(/([a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+).*?/g);
        
        if (newName) {
            document.getElementById('fullName').style.border = "2px solid green";
            obj.name = newName.join(' ');
            //I need more time for capitalize the first letter without use text-transform: capitalize in a single letter 
            //like Silva E Silva to Silva e Silva
        } else {
            document.getElementById('fullName').style.border = "2px solid red";
            showAlert('name', 'Não conseguimos identificar o nome', 'danger');
        }

        //Email
        if (email === '') {
            showAlert('email', 'Por-favor insira seu "E-MAIL" no local indicado!', 'danger');
        }

        const newEmail = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (newEmail == null) {
            document.getElementById('email').style.border = "2px solid red";
            showAlert('email', 'Não conseguimos identificar o email', 'danger');
        } else {
            document.getElementById('email').style.border = "2px solid green";
            obj.email = newEmail[0].toLowerCase();
        }


        // Number one
        if (numberOne === '') {
            showAlert('numberOne', '"Número" inválido!', 'danger');
        }

        const newNumberOne = numberOne.match(/^(\([0-9]{2}\))\s*([0-9]{4})-?([0-9]{4})$/g);

        if (newNumberOne == null) {
            document.getElementById('number-1').style.border = "2px solid red";
            showAlert('numberOne', '"Número" inválido!', 'danger');
        } else {
            document.getElementById('number-1').style.border = "2px solid green";

            let arr = Array.from(newNumberOne[0])
            //clear the string 
            const [...newArrOne] = arr.join('').replace(/\s/, '').replace(/\-/, '');
            //make a pattern for any data 
            newArrOne.splice(4, 0, ' ');
            newArrOne.splice(9, 0, '-');
            obj.numOne = newArrOne.join('');
        }

        // Number two
        if (numberTwo === '') {
            obj.numTwo = 'null'
        } else {
            const newNumberTwo = numberTwo.match(/^(\([0-9]{2}\))\s*([0-9]{4})-?([0-9]{4})$/g);

            if (newNumberTwo == null) {
                obj.numTwo = 'null'
                document.getElementById('number-2').style.border = "2px solid red";
                showAlert('numberTwo', '"Número" inválido!', 'danger');
            } else {
                document.getElementById('number-2').style.border = "2px solid green";
                let arrOptional = Array.from(newNumberTwo[0])
                //clear the string 
                const [...newArrOne] = arrOptional.join('').replace(/\s/, '').replace(/\-/, '');
                //make a pattern
                newArrOne.splice(4, 0, ' ');
                newArrOne.splice(9, 0, '-');
                obj.numTwo = newArrOne.join('');
            }
        }
        sendData(obj);
    });

    //arrow function
    let sendData = obj => {

        if (obj.name == null || obj.email == null || obj.numOne == null) {
            showAlert('badRequest', '"Certifique-se de validar todos os campos', 'danger');
        } else {
            [div1, div2] = document.querySelectorAll('.con-content');
            [div1, div2].map(data => {
                data.style.display = 'none';
            }
            );

            // spinner
            $(`<div class="col-lg-12 text-center" id="spin"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>`).insertAfter('.card-right');
            document.getElementById('success').style.display = '';

            setTimeout(() => {
                $('#spin').remove();

                document.getElementById('refresh-page').style.display = '';

                [div1, div2] = document.querySelectorAll('.con-content');
                [div1, div2].map(data => {
                    data.style.display = '';
                    document.getElementById('cadidate-name').innerText = obj.name;
                    document.getElementById('cadidate-email').innerText = obj.email;
                    document.getElementById('cadidate-number-one').innerText = obj.numOne;
                    // Ternary
                    obj.numTwo == 'null' || obj.numTwo == undefined || obj.numTwo == null ? document.getElementById('cadidate-number-two').innerText = `Não informado` : document.getElementById('cadidate-number-two').innerText = obj.numTwo;

                    // if the page os slow you can to comment the line api
                    const api = new Api;

                    //fecth API
                    api.fetchApi();

                    //Jquery API
                    // api.jqueryApi();

                })

            }, 4000)
        }
    }
    
    // This function calls your self without the need for interaction. 
    // Good for pre-loaded page
    (() => {
        $('#refresh-page').on('click', function () {
            window.location.reload();
        })
    })();
})

// ------------------------- some info about the project ---------------------------------- //

// Recomendation
// if the page is slow, comment out the API call maybe

// I reused the carousel code it was not mine

// I used some functionalities ES6 like destructing, map, arrow function, ternary operator for if and some more

/*
How I not used a database not was possible refresh page when send data, but if
you to need to refresh you can simple update page clicking on button 'refresh page' or on browser default refresh button.
*/

//some functionalities is the same but I used others methods for to do the same things

// ------------------------ aditional in portuguese same -----------------//
/*
    Em relação a responsividade talvez não fique 100% porque meu monitor é pequeno e antigo o que faz
    da minha produção um horror, outro fator é que estou aprendendo a lidar com
    responsividade quando esta no modo zoom e no modo landscape ou mesmo em transição do layout, ou seja, quando a screen não está fixa,
    entretanto, estou aprofundando ainda mais meus conhecimentos para tornar esse processo o mais fácil possível no menor
    tempo.
*/

