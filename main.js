var personList = [];

function maskCpf(value){
    value=value.replace(/\D/g,"");
    value=value.replace(/(\d{3})(\d)/,"$1.$2");
    value=value.replace(/(\d{3})(\d)/,"$1.$2");
    value=value.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

    return value;
}

var cpfInput = document.querySelector('#cpf');
cpfInput.addEventListener('input', function() {
    cpfInput.value = maskCpf(cpfInput.value);
});

function getPersonByCpf(cpf) {
    return personList.find((person) => person.cpf == cpf);
}

function registerPerson() {
    var form = document.getElementById('registerForm');
    console.log(personList);
    
    if (form.checkValidity()) {
        var nameInput = document.querySelector('#nome');
        var cpfInput = document.querySelector('#cpf');
        var birthDateInput = document.querySelector('#dataNascimento');
        var addressInput = document.querySelector('#endereco');
        
        if (getPersonByCpf(cpfInput.value) != null) {
            alert('CPF já utilizado.');
            return;
        }

        var personObject = {
            'name': nameInput.value,
            'cpf': cpfInput.value,
            'birthDate': birthDateInput.value,
            'address': addressInput.value
        }

        personList.push(personObject);

        alert('Contato salvo com sucesso.');
        nameInput.value = '';
        cpfInput.value = '';
        birthDateInput.value = '';
        addressInput.value = '';
        getPersonList();
    } else {
        alert('Campos faltantes. Preencha o formulário corretamente.');
    }
}

function getPersonList() {
    var contactRow = document.getElementById('contactRow');
    contactRow.innerHTML = '';
    if (contactRow.style.visibility == 'hidden') {
        contactRow.style.visibility = 'visible';
    }

    personList.forEach((person) => {
        contactRow.innerHTML += `<div class="customContainer contactCard">
            <h4 class="contactTitle">${person.name}</h4>
            <p><b>CPF: </b>${person.cpf}</p>
            <p><b>Data de nascimento: </b>${person.birthDate}</p>
            <p><b>Endereço: </b>${person.address}</p>
        </div>`
    });
}

function searchPersonByCpf() {
    var cpfToSearch = prompt("Digite o CPF do contato que deseja buscar:");
    
    if (cpfToSearch == null || cpfToSearch == "" || !cpfToSearch.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
        alert('CPF inválido.');
        return;
    }

    var person = getPersonByCpf(cpfToSearch);

    if (person == null) {
        alert('Contato não encontrado.');
    } else {
        var personString = `Nome: ${person.name}\nCPF: ${person.cpf}\nData de nascimento: ${person.birthDate}\nEndereço: ${person.address}`;
        alert(personString);
    }
}

function deletePersonByCpf() {
    var cpfToSearch = prompt("Digite o CPF do contato que deseja buscar:");
    
    if (cpfToSearch == null || cpfToSearch == "" || !cpfToSearch.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
        alert('CPF inválido.');
        return;
    }

    var person = getPersonByCpf(cpfToSearch);

    if (person == null) {
        alert('Contato não encontrado.');
    } else {
        personList = personList.filter(person => person.cpf != cpfToSearch);
        alert('Contato excluído com sucesso.');
        getPersonList();
    }
}