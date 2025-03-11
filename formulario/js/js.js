const form = document.querySelector('#form'); // Seleciona o formulário pelo ID "form".

form.addEventListener('submit', function (e) { // Adiciona um ouvinte de evento para quando o formulário for submetido.
    e.preventDefault(); // Previne o envio padrão do formulário (para não recarregar a página).

    // Define um array de objetos, onde cada objeto representa um campo do formulário e o validador para esse campo.
    const fields = [
        {
            id: 'name', // ID do campo "name"
            label: 'Nome', // Rótulo do campo "Nome"
            validator: nameIsValid // Função de validação para "name"
        },
        {
            id: 'last_name', // ID do campo "last_name"
            label: 'Sobrenome', // Rótulo do campo "Sobrenome"
            validator: nameIsValid // Função de validação para "last_name"
        },
        {
            id: 'birthdate', // ID do campo "birthdate"
            label: 'Nascimento', // Rótulo do campo "Nascimento"
            validator: dateIsValid // Função de validação para "birthdate"
        },
        {
            id: 'email', // ID do campo "email"
            label: 'E-mail', // Rótulo do campo "E-mail"
            validator: emailIsValid // Função de validação para "email"
        },
        {
            id: 'password', // ID do campo "password"
            label: 'Senha', // Rótulo do campo "Senha"
            validator: passwordIsSecure // Função de validação para "password"
        },
        {
            id: 'confirm_password', // ID do campo "confirm_password"
            label: 'Confirmar senha', // Rótulo do campo "Confirmar senha"
            validator: passwordMatch // Função de validação para "confirm_password"
        }
    ]

    const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>'; // Define um ícone de erro (usado na exibição de mensagens de erro).

    // Itera sobre cada campo do formulário para realizar a validação.
    fields.forEach(function (field) {
        const input = document.getElementById(field.id); // Seleciona o campo de entrada pelo ID.
        const inputBox = input.closest('.input-box'); // Seleciona o contêiner mais próximo do campo (caixa de entrada).
        const inputValue = input.value; // Obtém o valor do campo de entrada.

        const errorSpan = inputBox.querySelector('.error'); // Seleciona o espaço onde a mensagem de erro será exibida.
        errorSpan.innerHTML = ''; // Limpa qualquer mensagem de erro anterior.

        inputBox.classList.remove('invalid'); // Remove a classe "invalid" do contêiner.
        inputBox.classList.add('valid'); // Adiciona a classe "valid" ao contêiner.

        const fieldValidator = field.validator(inputValue); // Chama o validador do campo e passa o valor do campo como parâmetro.

        if (!fieldValidator.isValid) { // Se o validador retornar "false", significa que a validação falhou.
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`; // Exibe a mensagem de erro com o ícone.
            inputBox.classList.add('invalid'); // Adiciona a classe "invalid" ao contêiner.
            inputBox.classList.remove('valid'); // Remove a classe "valid" do contêiner.
            return; // Sai da função para não continuar a validação para esse campo.
        } 
    })

    // Valida o campo de gênero.
    const genders = document.getElementsByName('gender'); // Seleciona todos os elementos com o nome "gender" (os botões de rádio).
    const radioContainer = document.querySelector('.radio-container'); // Seleciona o contêiner do grupo de botões de rádio.
    const genderErrorSpan = radioContainer.querySelector('.error'); // Seleciona o elemento de erro dentro do contêiner de gênero.

    const selectedGender =  [...genders].find(input => input.checked); // Verifica qual gênero foi selecionado.
    radioContainer.classList.add('invalid'); // Marca o contêiner de gênero como inválido.
    radioContainer.classList.remove('valid'); // Remove a classe "valid" do contêiner de gênero.
    genderErrorSpan.innerHTML = `${errorIcon} Selecione um gênero!`; // Exibe uma mensagem de erro caso nenhum gênero seja selecionado.

    if (selectedGender) { // Se um gênero foi selecionado.
        radioContainer.classList.add('valid'); // Marca o contêiner de gênero como válido.
        radioContainer.classList.remove('invalid'); // Remove a classe "invalid" do contêiner de gênero.
        genderErrorSpan.innerHTML = ''; // Limpa a mensagem de erro.
        return; // Sai da função, pois a validação foi bem-sucedida.
    }
})

// Função que verifica se o valor é vazio.
function isEmpty(value) {
    return value === ''; // Retorna true se o valor for uma string vazia.
}

// Função de validação do campo "Nome".
function nameIsValid(value) {
    const validator = {
        isValid: true, // Inicializa o validador como válido.
        errorMessage: null // Mensagem de erro inicializada como nula.
    };

    if (isEmpty(value)) { // Verifica se o valor está vazio.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = 'O campo é obrigatório!'; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    const min = 3; // Define o tamanho mínimo para o nome.
    if (value.length < min) { // Verifica se o nome tem pelo menos 3 caracteres.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = `O nome deve ter no mínimo ${min} caracteres!`; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    const regex = /^[a-zA-Z]/; // Define uma expressão regular para verificar se o nome contém apenas letras.
    if (!regex.test(value)) { // Se o nome não corresponder à expressão regular.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = 'O campo deve conter apenas letras!'; // Define a mensagem de erro.
    }

    return validator; // Retorna o validador.
}

// Função de validação do campo "Nascimento".
function dateIsValid(value) {
    const validator = {
        isValid: true, // Inicializa o validador como válido.
        errorMessage: null // Mensagem de erro inicializada como nula.
    }

    if (isEmpty(value)) { // Verifica se o valor está vazio.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = 'O nascimento é obrigatório!'; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    const year = new Date(value).getFullYear(); // Obtém o ano a partir da data fornecida.
    if (year < 1920 || year > new Date().getFullYear()) { // Verifica se o ano está dentro de um intervalo válido (1920 até o ano atual).
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = 'Data inválida!'; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    return validator; // Retorna o validador.
}

// Função de validação do campo "E-mail".
function emailIsValid(value) {
    const validator = {
        isValid: true, // Inicializa o validador como válido.
        errorMessage: null // Mensagem de erro inicializada como nula.
    }

    if (isEmpty(value)) { // Verifica se o valor está vazio.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = 'O e-mail é obrigatório!'; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"); // Expressão regular para validar o formato do e-mail.
    if (!regex.test(value)) { // Verifica se o e-mail corresponde à expressão regular.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = 'O e-mail precisa ser válido!'; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    return validator; // Retorna o validador.
}

// Função de validação de senha.
function passwordIsSecure(value) {
    const validator = {
        isValid: true, // Inicializa o validador como válido.
        errorMessage: null // Mensagem de erro inicializada como nula.
    }

    if (isEmpty(value)) { // Verifica se o valor está vazio.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = 'A senha é obrigatória!'; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); // Expressão regular para validar uma senha segura (mínimo de 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais).
    if (!regex.test(value)) { // Verifica se a senha corresponde à expressão regular.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = `
            Sua senha deve conter ao menos: <br/>
            8 dígitos <br/>
            1 letra minúscula <br/>
            1 letra maiúscula  <br/>
            1 número </br>
            1 caractere especial!
        `; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    return validator; // Retorna o validador.
}

// Função de validação para garantir que as senhas correspondem.
function passwordMatch(value) {
    const validator = {
        isValid: true, // Inicializa o validador como válido.
        errorMessage: null // Mensagem de erro inicializada como nula.
    }

    const passwordValue = document.getElementById('password').value; // Obtém o valor da senha.
    
    if (value === '' || passwordValue !== value) { // Verifica se a confirmação de senha é vazia ou não corresponde à senha original.
        validator.isValid = false; // Marca o validador como inválido.
        validator.errorMessage = 'Senhas não condizem!'; // Define a mensagem de erro.
        return validator; // Retorna o validador com erro.
    }

    return validator; // Retorna o validador.
}

// Função para exibir ou ocultar os ícones de senha (mostrar/ocultar senha).
const passwordIcons = document.querySelectorAll('.password-icon'); // Seleciona todos os ícones de senha.

passwordIcons.forEach(icon => { // Itera sobre todos os ícones.
    icon.addEventListener('click', function () { // Adiciona um ouvinte de evento para o clique no ícone.
        const input = this.parentElement.querySelector('.form-control'); // Seleciona o campo de entrada de senha.
        input.type = input.type === 'password' ? 'text' : 'password'; // Alterna o tipo do campo entre "password" e "text" (mostrar ou ocultar a senha).
        this.classList.toggle('fa-eye'); // Alterna a classe do ícone para "fa-eye" (exibir/ocultar). 
    })
})