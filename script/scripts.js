function toggleQuestionCardDisplay(show) {
  const questionCards = document.querySelectorAll('.question-card');
  questionCards.forEach(card => {
    card.style.display = show ? 'block' : 'none';
  });
}

document.getElementById('nav-questions').addEventListener('click', function () {
  toggleQuestionCardDisplay(true);
});

document.getElementById('nav-answers').addEventListener('click', function () {
  toggleQuestionCardDisplay(false);
});

document.getElementById('nav-settings').addEventListener('click', function () {
  toggleQuestionCardDisplay(false);
});

function addQuestionCard() {
  const timestamp = Date.now();

  const questionCard = document.createElement("div");
  questionCard.className = "question-card";
  questionCard.id = `questionCard${timestamp}`;
  questionCard.innerHTML = `
<div class="question-header">
  <input type="text" class="questions-card-input" placeholder="Pergunta:" id="questionInput${timestamp}">
  <button class="icon-button" id="btn3"><i class="fas fa-image"></i></button>

  <div class="custom-select" id="customSelect${timestamp}" onclick="toggleSelectOptions('${timestamp}')">
    <div class="select-selected"><i class="fas fa-align-left"></i> Selecione uma opção</div>
    <div class="select-options select-hide">   
      <div class="select-option" onclick="selectQuestionType('shortAnswer', '${timestamp}')"><i class="fas fa-align-left"></i> Resposta curta</div>
      <div class="select-option" onclick="selectQuestionType('paragraph', '${timestamp}')"><i class="fas fa-align-justify"></i> Parágrafo</div>
      <div class="select-option" onclick="selectQuestionType('multipleChoice', '${timestamp}')"><i class="fas fa-list-ul"></i> Múltipla escolha</div>
      <div class="select-option" onclick="selectQuestionType('checkboxes', '${timestamp}')"><i class="fas fa-check-square"></i> Caixas de seleção</div>
      <div class="select-option" onclick="selectQuestionType('dropdown', '${timestamp}')"><i class="fas fa-caret-square-down"></i> Lista suspensa</div>
      <div class="select-option" onclick="selectQuestionType('fileUpload', '${timestamp}')"><i class="fas fa-file-upload"></i> Upload de arquivo</div>
      <div class="select-option" onclick="selectQuestionType('linearScale', '${timestamp}')"><i class="fas fa-ruler-horizontal"></i> Escala Linear</div>
      <div class="select-option" onclick="selectQuestionType('grid', '${timestamp}')"><i class="fas fa-th"></i> Grade de múltipla escolha</div>
      <div class="select-option" onclick="selectQuestionType('checkboxGrid', '${timestamp}')"><i class="fas fa-th-large"></i> Grade de caixa de seleção</div>
      <div class="select-option" onclick="selectQuestionType('date', '${timestamp}')"><i class="fas fa-calendar-alt"></i> Data</div>
      <div class="select-option" onclick="selectQuestionType('time', '${timestamp}')"><i class="fas fa-clock"></i> Horário</div>
    </div>
  </div>
</div>
<div class="question-options"  id="questionOptions${timestamp}">
  <!-- Opções de questão aqui -->
</div>
<div class="question-footer">
  <button class="icon-button" id="btn"><i class="fas fa-copy"></i></button>
  <button class="icon-button"id="btn4"><i class="fas fa-trash"></i></button>
  <button class="icon-button" id="btn2"><i class="fas fa-ellipsis-v"></i></button>
</div>
`;

  const deleteButton = questionCard.querySelector('#btn4');
  deleteButton.onclick = function () {
    deleteQuestionCard(timestamp);
  };

  document.getElementById('questionsContainer').appendChild(questionCard);
}

function deleteQuestionCard(timestamp) {
  const cardToDelete = document.getElementById(`questionCard${timestamp}`);
  if (cardToDelete) {
    cardToDelete.remove();
  }
}

function toggleSelectOptions(timestamp) {
  const selectOptions = document.getElementById(`customSelect${timestamp}`).querySelector('.select-options');
  selectOptions.classList.toggle('select-hide');
}

function selectQuestionType(type, timestamp) {
  console.log("Tipo de questão selecionada:", type, "para o questionário:", timestamp);
  const selectedText = document.getElementById(`customSelect${timestamp}`).querySelector('.select-selected');
  const selectedOption = document.getElementById(`customSelect${timestamp}`).querySelector(`.selected-option`);
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  switch (type) {
    case 'choice':
      selectedText.innerHTML = '<i class="fas fa-align-left"></i> Escolha uma opção';
      break;
    case 'shortAnswer':
      selectedText.innerHTML = '<i class="fas fa-align-left"></i> Resposta curta';
      questionOptionsDiv.innerHTML = `
            <input type="text" class="input-field fade-in" id="shortAnswerInput${timestamp}" 
                   placeholder="Texto de resposta curta" disabled style="background-color: #e9ecef;">
        `;
      break;
    case 'paragraph':
      selectedText.innerHTML = '<i class="fas fa-align-justify"></i> Parágrafo';
      questionOptionsDiv.innerHTML = `
            <input type="text" class="input-field fade-in" id="paragraphInput${timestamp}" 
                   placeholder="Texto de resposta longa" disabled style="background-color: #e9ecef; width: 100%;">
        `;
      break;
    case 'multipleChoice':
      selectedText.innerHTML = '<i class="fas fa-list-ul"></i> Múltipla escolha';
      addMultipleChoiceOptions(timestamp);
      break;
    case 'checkboxes':
      selectedText.innerHTML = '<i class="fas fa-check-square"></i> Caixas de seleção';
      addCheckboxOptions(timestamp);
      break;
    case 'dropdown':
      selectedText.innerHTML = '<i class="fas fa-caret-square-down"></i> Lista suspensa';
      addDropdownOptions(timestamp);
      break;
    case 'fileUpload':
      selectedText.innerHTML = '<i class="fas fa-file-upload"></i> Upload de arquivo';
      addFileUploadOptions(timestamp);
      break;
    case 'linearScale':
      selectedText.innerHTML = '<i class="fas fa-ruler-horizontal"></i> Escala Linear';
      addLinearScaleOptions(timestamp);
      break;
    case 'grid':
      selectedText.innerHTML = '<i class="fas fa-th"></i> Grade de múltipla escolha';
      addGridMultipleChoiceOptions(timestamp);
      break;
    case 'checkboxGrid':
      selectedText.innerHTML = '<i class="fas fa-th-large"></i> Grade de caixa de seleção';
      addCheckboxGridOptions(timestamp);
      break;
    case 'date':
      selectedText.innerHTML = '<i class="fas fa-calendar-alt"></i> Data';
      addDatePickerOptions(timestamp);
      break;
    case 'time':
      selectedText.innerHTML = '<i class="fas fa-clock"></i> Horário';
      addTimePickerOptions(timestamp);
      break;
    default:
      selectedText.innerHTML = 'Tipo de pergunta não reconhecido';
      break;
  }

}

function salvarConfiguracoesFormulario() {
  const configuracoes = {
    titulo: document.querySelector('.form-title-input').value,
    perguntas: [...document.querySelectorAll('.question-card')].map(card => {
      return {
        pergunta: card.querySelector('.questions-card-input').value,
        tipo: card.querySelector('.select-selected').innerText,
      };
    })
  };
  localStorage.setItem('configuracoesFormulario', JSON.stringify(configuracoes));
}

const observer = new MutationObserver(mutations => {
  salvarConfiguracoesFormulario();
});

observer.observe(document.getElementById('questionsContainer'), { childList: true, subtree: true });

function addTimePickerOptions(timestamp) {
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  questionOptionsDiv.innerHTML = `
    <div class="time-picker-container">
        <span class="time-text">Horário</span>
        <hr class="time-line">
        <i class="fas fa-clock time-icon"></i>
    </div>
`;
}

function gerarVisualizacaoFormulario() {
  const configuracoesSalvas = JSON.parse(localStorage.getItem('configuracoesFormulario'));
  if (!configuracoesSalvas) {
    alert("Não há configurações salvas para visualizar.");
    return;
  }

  const janelaVisualizacao = window.open('', '_blank');
  let htmlContent = '<html><head><title>Visualização do Formulário</title></head><body>';

  htmlContent += `<h1>${configuracoesSalvas.titulo}</h1>`;

  configuracoesSalvas.perguntas.forEach(pergunta => {
    htmlContent += `<div class="question-card">
                        <div class="question-header">
                            <h2 class="question-text">${pergunta.pergunta}</h2>
                        </div>
                        <div class="question-type">${pergunta.tipo}</div>
                    </div>`;
  });

  htmlContent += '</body></html>';
  janelaVisualizacao.document.write(htmlContent);
  janelaVisualizacao.document.close();
}

function addDatePickerOptions(timestamp) {
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  questionOptionsDiv.innerHTML = `
    <div class="date-picker-container">
        <span class="date-text">Mês, dia, ano</span>
        <hr class="date-line">
        <i class="fas fa-calendar date-icon"></i>
    </div>
`;
}

function addCheckboxGridOptions(timestamp) {
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  questionOptionsDiv.innerHTML = `
    <div class="grid-cb-options fade-in">
        <div class="grid-cb-columns">
            <div class="grid-cb-column">
                <h3>Linhas</h3>
                <ol class="grid-cb-list" id="gridCbRowsList${timestamp}">
                    <li class="grid-cb-item">
                        <input type="text" class="questions-card-input" placeholder="Linha 1">
                        <button class="icon-button" onclick="deleteCheckboxGridItem('${timestamp}', this.parentElement, 'gridCbRowsList${timestamp}')"><i class="fas fa-times"></i></button>
                    </li>
                    <span class="grid-cb-add-item" onclick="addCheckboxGridRow('${timestamp}')">Adicionar linha</span>
                </ol>
            </div>
            <div class="grid-cb-column">
                <h3>Colunas</h3>
                <ol class="grid-cb-list" id="gridCbColumnsList${timestamp}">
                    <li class="grid-cb-item">
                        <input type="checkbox" class="column-checkbox">
                        <input type="text" class="questions-card-input" placeholder="Coluna 1">
                        <button class="icon-button" onclick="deleteCheckboxGridItem('${timestamp}', this.parentElement, 'gridCbColumnsList${timestamp}')"><i class="fas fa-times"></i></button>
                    </li>
                    <span class="grid-cb-add-item" onclick="addCheckboxGridColumn('${timestamp}')">Adicionar coluna</span>
                </ol>
            </div>
        </div>
    </div>
`;
}

function addCheckboxGridRow(timestamp) {
  const list = document.getElementById(`gridCbRowsList${timestamp}`);
  const itemCount = list.getElementsByClassName('grid-cb-item').length;

  const newRow = document.createElement('li');
  newRow.className = 'grid-cb-item fade-in';
  newRow.innerHTML = `
    <input type="text" class="questions-card-input" placeholder="Linha ${itemCount + 1}">
    <button class="icon-button" onclick="deleteCheckboxGridItem('${timestamp}', this.parentElement, 'gridCbRowsList${timestamp}')"><i class="fas fa-times"></i></button>
`;

  const addItem = list.querySelector('.grid-cb-add-item');
  list.insertBefore(newRow, addItem);
  setTimeout(() => newRow.classList.add('animate'), 50); 
}

function addCheckboxGridColumn(timestamp) {
  const list = document.getElementById(`gridCbColumnsList${timestamp}`);
  const itemCount = list.getElementsByClassName('grid-cb-item').length;

  const newColumn = document.createElement('li');
  newColumn.className = 'grid-cb-item fade-in';
  newColumn.innerHTML = `
    <input type="checkbox" class="column-checkbox">
    <input type="text" class="questions-card-input" placeholder="Coluna ${itemCount + 1}">
    <button class="icon-button" onclick="deleteCheckboxGridItem('${timestamp}', this.parentElement, 'gridCbColumnsList${timestamp}')"><i class="fas fa-times"></i></button>
`;

  const addItem = list.querySelector('.grid-cb-add-item');
  list.insertBefore(newColumn, addItem);
  setTimeout(() => newColumn.classList.add('animate'), 50);
}

function deleteCheckboxGridItem(timestamp, element, listId) {
  const list = document.getElementById(listId);
  if (list.children.length > 2) {
    element.classList.add('fade-out');
    setTimeout(() => list.removeChild(element), 300);
  }
}

function addGridMultipleChoiceOptions(timestamp) {
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  questionOptionsDiv.innerHTML = `
    <div class="grid-mc-options fade-in">
        <div class="grid-mc-columns">
            <div class="grid-mc-column">
                <h3>Linhas</h3>
                <ol class="grid-mc-list" id="gridRowsList${timestamp}">
                    <li class="grid-mc-item">
                        <input type="text" class="questions-card-input" placeholder="Linha 1">
                        <button class="icon-button" onclick="deleteGridItem('${timestamp}', this.parentElement, 'gridRowsList${timestamp}')"><i class="fas fa-times"></i></button>
                    </li>
                    <span class="grid-mc-add-item" onclick="addGridItem('${timestamp}', 'gridRowsList${timestamp}', 'Linha')">Adicionar linha</span>
                </ol>
            </div>
            <div class="grid-mc-column">
                <h3>Colunas</h3>
                <ol class="grid-mc-list" id="gridColumnsList${timestamp}">
                    <li class="grid-mc-item">
                        <input type="radio" name="columnRadio${timestamp}" class="column-radio-button">
                        <input type="text" class="questions-card-input" placeholder="Coluna 1">
                        <button class="icon-button" onclick="deleteGridItem('${timestamp}', this.parentElement, 'gridColumnsList${timestamp}')"><i class="fas fa-times"></i></button>
                    </li>
                    <span class="grid-mc-add-item" onclick="addGridItem('${timestamp}', 'gridColumnsList${timestamp}', 'Coluna')">Adicionar coluna</span>
                </ol>
            </div>
        </div>
    </div>
`;
}

function addGridItem(timestamp, listId, itemType) {
  const list = document.getElementById(listId);
  const itemCount = list.getElementsByClassName('grid-mc-item').length;

  const newItem = document.createElement('li');
  newItem.className = 'grid-mc-item fade-in';
  const isColumn = listId.includes('Columns');
  newItem.innerHTML = `
    ${isColumn ? '<input type="radio" name="columnRadio' + timestamp + '" class="column-radio-button">' : ''}
    <input type="text" class="questions-card-input" placeholder="${itemType} ${itemCount + 1}">
    <button class="icon-button" onclick="deleteGridItem('${timestamp}', this.parentElement, '${listId}')"><i class="fas fa-times"></i></button>
`;
  const addItem = list.querySelector('.grid-mc-add-item');
  list.insertBefore(newItem, addItem);

  setTimeout(() => newItem.classList.add('animate'), 50);
}

function deleteGridItem(timestamp, element, listId) {
  const list = document.getElementById(listId);
  if (list.children.length > 2) {
    element.classList.add('fade-out');
    setTimeout(() => list.removeChild(element), 300);
  }
}
function addGridRow(timestamp) {
  addGridItem(timestamp, 'gridRowsList' + timestamp, 'Linha');
}

function addGridColumn(timestamp) {
  addGridItem(timestamp, 'gridColumnsList' + timestamp, 'Coluna');
}

function addLinearScaleOptions(timestamp) {
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  questionOptionsDiv.innerHTML = `
    <div class="linear-scale-options fade-in">
        <div class="option-row">
            <div class="select-container">
                <select class="linear-scale-start" id="linearScaleStart${timestamp}">
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>
                <i class="fas fa-chevron-down"></i>
            </div>
            <span class="scale-to">a</span>
            <div class="select-container">
                <select class="linear-scale-end" id="linearScaleEnd${timestamp}">
                    ${Array.from({ length: 9 }, (_, i) => `<option value="${i + 2}">${i + 2}</option>`).join('')}
                </select>
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>
        <div class="option-row align-items">
            <span id="startScaleLabel${timestamp}" class="scale-label">0</span>
            <input type="text" class="questions-card-input" placeholder="Marcador (opcional)" id="startMarkerInput${timestamp}">
        </div>
        <div class="option-row align-items">
            <span id="endScaleLabel${timestamp}" class="scale-label">2</span>
            <input type="text" class="questions-card-input" placeholder="Marcador (opcional)" id="endMarkerInput${timestamp}">
        </div>
    </div>
`;
  document.getElementById(`linearScaleStart${timestamp}`).addEventListener('change', function () {
    document.getElementById(`startScaleLabel${timestamp}`).textContent = this.value;
  });
  document.getElementById(`linearScaleEnd${timestamp}`).addEventListener('change', function () {
    document.getElementById(`endScaleLabel${timestamp}`).textContent = this.value;
  });
}

function addFileUploadOptions(timestamp) {
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  questionOptionsDiv.innerHTML = `
    <div class="file-upload-options fade-in">
        <div class="option-row">
            <span>Permitir apenas tipos de arquivo específicos</span>
            <label class="switch">
                <input type="checkbox" class="file-type-toggle" id="fileTypeToggle${timestamp}">
                <span class="slider round"></span>
            </label>
        </div>
        <div id="fileTypeOptions${timestamp}" class="file-type-options">
            <div class="option-column">
                <label><input type="checkbox"> Documento</label>
                <label><input type="checkbox"> Planilha</label>
                <label><input type="checkbox"> PDF</label>
                <label><input type="checkbox"> Vídeo</label>
            </div>
            <div class="option-column">
                <label><input type="checkbox"> Apresentação</label>
                <label><input type="checkbox"> Desenho</label>
                <label><input type="checkbox"> Imagem</label>
                <label><input type="checkbox"> Áudio</label>
            </div>
        </div>
        <div class="option-row">
            <span>Número máximo de arquivos</span>
            <div class="select-container">
                <select class="file-number-selector">
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <i class="fas fa-chevron-down"></i> <!-- Ícone do FontAwesome -->
            </div>
        </div>
        <div class="option-row">
            <span>Tamanho máximo de arquivo</span>
            <div class="select-container">
                <select class="file-size-selector">
                    <option value="1">1 MB</option>
                    <option value="10">10 MB</option>
                    <option value="100">100 MB</option>
                    <option value="1000">1 GB</option>
                    <option value="10000">10 GB</option>
                </select>
                <i class="fas fa-chevron-down"></i> <!-- Ícone do FontAwesome -->
            </div>
        </div>
    </div>
`;
  const fileTypeOptions = document.getElementById(`fileTypeOptions${timestamp}`);
  document.getElementById(`fileTypeToggle${timestamp}`).addEventListener('change', function () {
    if (this.checked) {
      fileTypeOptions.style.maxHeight = fileTypeOptions.scrollHeight + "px";
      fileTypeOptions.style.marginBottom = "20px";
    } else {
      fileTypeOptions.style.maxHeight = "0";
      fileTypeOptions.style.marginBottom = "0";
    }
  });
}

window.onscroll = function () {
  var sidebar = document.querySelector('.sidebar');
  var espacoAdicional = document.getElementById('espacoAdicional');
  var alturaContainer = document.getElementById('questionsContainer').getBoundingClientRect().bottom;
  var alturaJanela = window.innerHeight;

  var espacoNecessario = window.scrollY + alturaJanela - alturaContainer;
  var limiteAltura = sidebar.offsetHeight - 600;

  if (espacoNecessario > 0) {
    espacoAdicional.style.height = Math.min(espacoNecessario, limiteAltura) + 'px';
  } else {
    espacoAdicional.style.height = '10px';
  }

  var posicaoSidebar = window.scrollY > alturaContainer - limiteAltura ?
    alturaContainer - limiteAltura : window.scrollY;
  sidebar.style.top = posicaoSidebar + '-20px';
};

function addDropdownOptions(timestamp) {
  event.preventDefault();

  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  questionOptionsDiv.innerHTML = '';

  questionOptionsDiv.innerHTML = `
<ol class="dropdown-list fade-in" id="dropdownList${timestamp}">
    <li class="dropdown-option">
        <span contenteditable="true" class="editable-label">Opção 1</span>
        <span class="delete-icon-drop" onclick="deleteDropdownOption(event, '${timestamp}', '1')">&times;</span>
    </li>
    <div class="add-option">
        <a href="#" onclick="addDynamicDropdownOption('${timestamp}')">Adicionar opção</a>
    </div>
</ol>
`;

  setupEditableLabel();
}

function addDynamicDropdownOption(timestamp) {
  event.preventDefault();

  const dropdownList = document.getElementById(`dropdownList${timestamp}`);
  const dropdownCount = dropdownList.getElementsByClassName('dropdown-option').length;
  const newOptionId = `dropdown${dropdownCount + 1}${timestamp}`;

  const newDropdownOption = document.createElement('li');
  newDropdownOption.className = 'dropdown-option';
  newDropdownOption.innerHTML = `
<span contenteditable="true" class="editable-label">Opção ${dropdownCount + 1}</span>
<span class="delete-icon-drop" onclick="deleteDropdownOption(event, '${timestamp}', '${dropdownCount + 1}')">&times;</span>
`;

  dropdownList.insertBefore(newDropdownOption, dropdownList.lastElementChild);
  setupEditableLabel();
}

function deleteDropdownOption(event, timestamp, optionNumber) {
  const dropdownOption = event.target.parentNode;
  dropdownOption.parentNode.removeChild(dropdownOption);
}

function addCheckboxOptions(timestamp) {
  event.preventDefault();

  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);
  questionOptionsDiv.innerHTML = '';

  questionOptionsDiv.innerHTML = `
    <div class="checkbox-container fade-in">
        <div class="checkbox-option">
            <input type="checkbox" name="checkboxes${timestamp}" id="checkbox1${timestamp}">
            <label for="checkbox1${timestamp}" contenteditable="true" class="editable-label">Opção 1</label>
            <span class="delete-icon" onclick="deleteCheckboxOption(event, '${timestamp}', '1')">&times;</span>
        </div>
        <div class="add-option">
            <a href="#" onclick="addDynamicCheckboxOption('${timestamp}')">Adicionar opção</a> ou 
            <a href="#" onclick="addOtherCheckboxOption('${timestamp}')">adicionar "Outro"</a>
        </div>
    </div>
`;

  setupEditableLabel();
}

function addDynamicCheckboxOption(timestamp) {
  event.preventDefault();
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);
  const checkboxContainer = questionOptionsDiv.querySelector('.checkbox-container');
  const checkboxCount = checkboxContainer.getElementsByClassName('checkbox-option').length;
  const newOptionId = `checkbox${checkboxCount + 1}${timestamp}`;

  const newCheckboxOption = document.createElement('div');
  newCheckboxOption.className = 'checkbox-option';
  newCheckboxOption.innerHTML = `
    <input type="checkbox" name="checkboxes${timestamp}" id="${newOptionId}">
    <label for="${newOptionId}" contenteditable="true" class="editable-label">Opção ${checkboxCount + 1}</label>
    <span class="delete-icon" onclick="deleteCheckboxOption(event, '${timestamp}', '${checkboxCount + 1}')">&times;</span>
`;

  checkboxContainer.insertBefore(newCheckboxOption, checkboxContainer.lastElementChild);
  setupEditableLabel();
}

function deleteCheckboxOption(event, timestamp, optionNumber) {
  const checkboxOption = document.getElementById(`checkbox${optionNumber}${timestamp}`).parentNode;
  checkboxOption.parentNode.removeChild(checkboxOption);
}

function addMultipleChoiceOptions(timestamp) {

  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);

  questionOptionsDiv.innerHTML = '';

  questionOptionsDiv.innerHTML = `
    <div class="radio-container fade-in">
        <div class="radio-option">
            <input type="radio" name="options${timestamp}" id="option1${timestamp}">
            <label for="option1${timestamp}" contenteditable="true" class="editable-label">Opção 1</label>
            <span class="delete-icon" onclick="deleteRadioOption(event, '${timestamp}', '1')">&times;</span>
        </div>
        <div class="add-option">
            <a href="#" onclick="addDynamicRadioOption('${timestamp}')">Adicionar opção</a> ou 
            <a href="#" onclick="addOtherRadioOption('${timestamp}')">adicionar "Outro"</a>
        </div>
    </div>
`;

  setupEditableLabel();
}

function createAddOptionsDiv(timestamp) {
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);
  const addOptionDiv = document.createElement('div');
  addOptionDiv.className = 'add-option';
  addOptionDiv.innerHTML = `
    <a href="#" onclick="addDynamicCheckboxOption('${timestamp}')">Adicionar opção</a> ou 
    <a href="#" onclick="addOtherCheckboxOption('${timestamp}')">adicionar "Outro"</a>
`;
  questionOptionsDiv.appendChild(addOptionDiv);
}

function addDynamicRadioOption(timestamp) {
  event.preventDefault();
  const questionOptionsDiv = document.getElementById(`questionOptions${timestamp}`);
  const radioContainer = questionOptionsDiv.querySelector('.radio-container');
  const radioCount = radioContainer.getElementsByClassName('radio-option').length;
  const newOptionId = `option${radioCount + 1}${timestamp}`;

  const newRadioOption = document.createElement('div');
  newRadioOption.className = 'radio-option';
  newRadioOption.innerHTML = `
    <input type="radio" name="options${timestamp}" id="${newOptionId}">
    <label for="${newOptionId}" contenteditable="true" class="editable-label">Opção ${radioCount + 1}</label>
    <span class="delete-icon" onclick="deleteRadioOption(event, '${timestamp}', '${radioCount + 1}')">&times;</span>
`;

  radioContainer.insertBefore(newRadioOption, radioContainer.lastElementChild);
  setupEditableLabel();
}

function deleteRadioOption(event, timestamp, optionNumber) {
  const radioOption = document.getElementById(`option${optionNumber}${timestamp}`).parentNode;
  radioOption.parentNode.removeChild(radioOption);
}


function setupEditableLabel() {
  const labels = document.querySelectorAll('.editable-label');
  labels.forEach(label => {
    label.onclick = function (event) {
      event.preventDefault();
      this.setAttribute('contenteditable', 'true');
      this.focus();
    };

    label.onfocus = function () {
      this.classList.add('editing');
      if (this.textContent === 'Opção') {
        this.textContent = '';
        this.style.color = 'black';
      }
    };

    label.onblur = function () {
      this.classList.remove('editing');
      if (this.textContent.trim() === '') {
        this.textContent = 'Opção';
        this.style.color = 'gray';
        this.removeAttribute('contenteditable');
      }
    };
  });
}

setupEditableLabel();

document.getElementById('responseToggle').addEventListener('change', function () {
  var responseStatus = document.getElementById('responseStatus');
  if (this.checked) {
    responseStatus.textContent = 'Aceitando respostas';
    responseStatus.style.backgroundColor = 'transparent';
  } else {
    responseStatus.textContent = 'Não está aceitando respostas';
    responseStatus.style.backgroundColor = 'red';
  }
});
document.getElementById('formDescriptionInput').addEventListener('focus', function () {
  document.getElementById('descriptionFormattingToolbar').style.display = 'block';
});

document.getElementById('formDescriptionInput').addEventListener('blur', function () {
  document.getElementById('descriptionFormattingToolbar').style.display = 'none';
});



function applyStyleToDescription(style) {
  document.execCommand(style, false, null);
}

function insertLinkToDescription() {
  var url = prompt("Enter the URL");
  if (url) {
    document.execCommand('createLink', false, url);
  }
}

function createNumberedList() {
  document.execCommand('insertOrderedList', false, null);
}

function createBulletedList() {
  document.execCommand('insertUnorderedList', false, null);
}

function removeFormattingFromDescription() {
  document.execCommand('removeFormat', false, null);
}

document.getElementById('formTitleInput').addEventListener('focus', function () {
  document.getElementById('formattingToolbar').style.display = 'block';
});

document.getElementById('formTitleInput').addEventListener('blur', function () {
  document.getElementById('formattingToolbar').style.display = 'none';
});

function applyStyleToInput(style) {
  document.execCommand(style, false, null);
}

function insertLinkToInput() {
  var url = prompt("Enter the URL");
  if (url) {
    document.execCommand('createLink', false, url);
  }
}

function removeFormattingFromInput() {
  document.execCommand('removeFormat', false, null);
}

document.getElementById('nav-questions').addEventListener('click', function () {
  document.getElementById('questionsCard').style.display = 'block'; 
  document.querySelector('.sidebar').style.display = 'block';
  document.getElementById('answersCard').style.display = 'none';
  document.getElementById('settingsCard').style.display = 'none';
});

document.getElementById('nav-answers').addEventListener('click', function () {
  document.getElementById('questionsCard').style.display = 'none'; 
  document.querySelector('.sidebar').style.display = 'none'; 
  document.getElementById('answersCard').style.display = 'block'; 
  document.getElementById('settingsCard').style.display = 'none';
  document.querySelector('question-card').style.display = 'none';
});

document.getElementById('nav-settings').addEventListener('click', function () {
  document.getElementById('questionsCard').style.display = 'none';
  document.querySelector('.sidebar').style.display = 'none';
  document.getElementById('answersCard').style.display = 'none';
  document.getElementById('settingsCard').style.display = 'block';
  document.querySelector('.question-card').style.display = 'none'; 
});
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.nav-item').forEach(innerItem => {
      innerItem.classList.remove('active');
    });

    this.classList.add('active');
  });
});

function openMenuListModal() {
  document.getElementById("menuListModal").style.display = "block";
}

function openRadioButtonModal() {
  document.getElementById("radioButtonModal").style.display = "block";
}

function openCheckboxModal() {
  document.getElementById("checkboxModal").style.display = "block";
}

function addOption(containerId) {
  const container = document.getElementById(containerId);
  const newOptionInput = document.createElement("input");
  newOptionInput.type = "text";
  newOptionInput.className = "input-field";
  newOptionInput.placeholder = "Opção " + (container.children.length + 1);
  container.appendChild(newOptionInput);
}

function addMenuListToEditor() {
  const optionInputs = document.querySelectorAll(
    "#menuListOptions input"
  );
  let menuListHtml = "<select>";

  optionInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      menuListHtml += `<option value="${input.value}">${input.value}</option>`;
    }
  });

  menuListHtml += "</select>";
  insertElement(menuListHtml);

  console.log("Fechando o modal menuListModal");

  var modal = document.getElementById("menuListModal");
  if (modal) {
    modal.style.display = "none";
  } else {
    console.error("Modal menuListModal não encontrado");
  }
}

function addRadioButtonOption() {
  const radioButtonOptions =
    document.getElementById("radioButtonOptions");
  const newOptionInput = document.createElement("input");
  newOptionInput.type = "text";
  newOptionInput.className = "input-field";
  newOptionInput.placeholder =
    "Opção " + (radioButtonOptions.children.length + 1);
  radioButtonOptions.appendChild(newOptionInput);
}

function addRadioButtonsToEditor() {
  const optionInputs = document.querySelectorAll(
    "#radioButtonOptions input"
  );
  let radioButtonHtml = "";

  optionInputs.forEach((input, index) => {
    if (input.value.trim() !== "") {
      radioButtonHtml += `
                    <label>
                        <input type="radio" name="radioGroup" value="${input.value}">
                        ${input.value}
                    </label><br>`;
    }
  });

  insertElement(radioButtonHtml);
  document.getElementById("radioButtonModal").style.display = "none";
}

function addCheckboxOption() {
  const checkboxOptions = document.getElementById("checkboxOptions");
  const newOptionInput = document.createElement("input");
  newOptionInput.type = "text";
  newOptionInput.className = "input-field";
  newOptionInput.placeholder =
    "Opção " + (checkboxOptions.children.length + 1);
  checkboxOptions.appendChild(newOptionInput);
}

function addCheckboxesToEditor() {
  const optionInputs = document.querySelectorAll(
    "#checkboxOptions input"
  );
  let checkboxHtml = "";

  optionInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      checkboxHtml += `
            <label>
                <input type="checkbox" name="checkboxGroup" value="${input.value}">
                ${input.value}
            </label><br>`;
    }
  });

  insertElement(checkboxHtml);
  document.getElementById("checkboxModal").style.display = "none"; 
}

function insertElement(elementHtml, type = "") {
  const editor = document.querySelector(".editor");
  const newElement = document.createElement("div");
  newElement.innerHTML = elementHtml;

  if (type === "input") {
    const inputElement = newElement.querySelector("input[type='text']");
    inputElement.addEventListener("click", (e) => {
      showDetails(inputElement);
      e.stopPropagation();
    });
    lastTextInput = inputElement;
  }

  editor.appendChild(newElement);
}

let lastTextInput = null;

function updatePlaceholder() {
  if (lastTextInput) {
    const placeholderValue =
      document.getElementById("placeholderInput").value;
    lastTextInput.placeholder = placeholderValue;
  }
}

function addInput() {
  const inputHtml =
    '<input type="text" class="input-field" style="width: 150px;">';
  insertElement(inputHtml, "input");
}

function addTextarea() {
  insertElement('<textarea rows="4" cols="50"></textarea>', "textarea");
}

function addQuestion() {
  insertElement(
    '<span contenteditable="true">Your question here?</span> <input type="text" placeholder="Answer here...">'
  );
}

let activeStyles = {
  bold: false,
  italic: false,
  underline: false,
};

function toggleStyle(style, event) {
  event.preventDefault();
  const editor = document.querySelector(".editor");
  editor.focus();
  document.execCommand(style, false, null);
  updateToolbarButtonStyles();
}

function updateToolbarButtonStyles() {
  const styles = ["bold", "italic", "underline"];
  styles.forEach((style) => {
    const isActive = document.queryCommandState(style);
    const button = document.querySelector(
      `.toolbar button[data-style='${style}']`
    );
    if (button) {
      if (isActive) {
        button.classList.add(`${style}-active`);
      } else {
        button.classList.remove(`${style}-active`);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", updateToolbarButtonStyles);

function createStyledElement(style) {
  let element;
  switch (style) {
    case "bold":
      element = document.createElement("b");
      break;
    case "italic":
      element = document.createElement("i");
      break;
    case "underline":
      element = document.createElement("u");
      break;
    default:
      element = document.createElement("span");
  }
  element.innerHTML = "&#8203;";
  return element;
}

function selectElement(event) {
  const target = event.target;
  let elementToShowDetails = target;
  if (target.classList.contains("input-field")) {
    showDetails(target);
  }
  if (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.tagName === "LABEL"
  ) {
    showDetails(target);
  }
  if (target.tagName === "OPTION") {
    elementToShowDetails = target.parentElement;
  }

  if (
    elementToShowDetails.tagName === "INPUT" ||
    elementToShowDetails.tagName === "TEXTAREA" ||
    elementToShowDetails.tagName === "SELECT"
  ) {
    showDetails(elementToShowDetails);
  }
}

function showDetails(element) {
  const details = document.querySelector(".details");
  details.style.display = "block";

  if (!document.querySelector(".details-title")) {
    const title = document.createElement("div");
    title.className = "details-title";
    title.textContent = "Configuração do Componente";
    details.appendChild(title);

    const detailsContent = document.createElement("div");
    detailsContent.className = "details-content";
    details.appendChild(detailsContent);
  }

  const detailsContent = document.querySelector(".details-content");
  if (element.tagName === "INPUT" && element.type === "text") {
    showInputDetails(element, detailsContent);
  } else if (element.tagName === "TEXTAREA") {
    showTextareaDetails(element, detailsContent);
  } else if (element.tagName === "SELECT") {
    showSelectDetails(element, detailsContent);
  }
  if (element.tagName === "INPUT" && element.type === "radio") {
    showRadioButtonDetails(element, detailsContent);
  } else if (element.tagName === "INPUT" && element.type === "checkbox") {
    showCheckboxDetails(element, detailsContent);
  }
}

function showRadioButtonDetails(radioButton, detailsContainer) {
  detailsContainer.innerHTML = "";

  const radioGroup = radioButton.name;
  document
    .querySelectorAll(`input[type='radio'][name='${radioGroup}']`)
    .forEach((radio, index) => {
      const optionContainer = document.createElement("div");

      const optionInput = document.createElement("input");
      optionInput.type = "text";

      optionInput.value = radio.nextSibling.textContent.trim();
      optionInput.oninput = () => {
        radio.nextSibling.textContent = optionInput.value;
      };

      const deleteButton = document.createElement("button");
      deleteButton.className = "icon-button";
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.onclick = () => {
        radio.parentElement.removeChild(radio.nextSibling);
        radio.parentElement.removeChild(radio);
        optionContainer.remove();
        hideDetails();
      };

      optionContainer.appendChild(optionInput);
      optionContainer.appendChild(deleteButton);
      detailsContainer.appendChild(optionContainer);
    });

  const addButton = document.createElement("button");
  addButton.className = "icon-button";
  addButton.innerHTML = '<i class="fas fa-plus"></i>';
  addButton.onclick = () => {
    const radioLabel = prompt(
      "Digite o valor para a nova opção do RadioButton:"
    );
    if (radioLabel) {
      addRadioButton(radioGroup, radioLabel);
      hideDetails();
    }
  };
  detailsContainer.appendChild(addButton);
}

function addRadioButton(radioGroupName, radioLabel) {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = radioGroupName;
  radio.value = radioLabel;

  const label = document.createElement("label");
  label.appendChild(radio);
  label.appendChild(document.createTextNode(radioLabel));

  document.querySelector(".editor").appendChild(label);
  hideDetails();
}

function showCheckboxDetails(checkbox, detailsContainer) {
  detailsContainer.innerHTML = "";

  document
    .querySelectorAll("input[type='checkbox'][name='checkboxGroup']")
    .forEach((check) => {
      const optionContainer = document.createElement("div");

      const optionInput = document.createElement("input");
      optionInput.type = "text";
      optionInput.value = check.nextSibling.textContent.trim();
      optionInput.oninput = () => {
        check.nextSibling.textContent = optionInput.value;
      };

      const deleteButton = document.createElement("button");
      deleteButton.className = "icon-button";
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.onclick = () => {
        check.parentElement.removeChild(check.nextSibling);
        check.parentElement.removeChild(check);
        optionContainer.remove();
        hideDetails();
      };

      optionContainer.appendChild(optionInput);
      optionContainer.appendChild(deleteButton);
      detailsContainer.appendChild(optionContainer);
    });

  const addButton = document.createElement("button");
  addButton.className = "icon-button";
  addButton.innerHTML = '<i class="fas fa-plus"></i>';
  addButton.onclick = () => {
    const checkboxLabel = prompt(
      "Digite o valor para a nova opção do Checkbox:"
    );
    if (checkboxLabel) {
      addCheckbox(checkboxLabel);
      hideDetails();
    }
  };
  detailsContainer.appendChild(addButton);
}

function addCheckbox(checkboxLabel) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "checkboxGroup";
  checkbox.value = checkboxLabel;

  const label = document.createElement("label");
  label.textContent = checkboxLabel;
  label.insertBefore(checkbox, label.firstChild);

  document.querySelector(".editor").appendChild(label);
  hideDetails();
}

function showInputDetails(input, detailsContainer) {
  detailsContainer.innerHTML = "";

  const placeholderInput = document.createElement("input");
  placeholderInput.type = "text";
  placeholderInput.value = input.placeholder;
  placeholderInput.oninput = () =>
    (input.placeholder = placeholderInput.value);

  detailsContainer.appendChild(document.createTextNode("Placeholder: "));
  detailsContainer.appendChild(placeholderInput);
}

function showTextareaDetails(textarea, detailsContainer) { }

function showSelectDetails(select, detailsContainer) {
  detailsContainer.innerHTML = "";

  select.querySelectorAll("option").forEach((option, index) => {
    const optionContainer = document.createElement("div");

    const optionInput = document.createElement("input");
    optionInput.type = "text";
    optionInput.value = option.text;
    optionInput.onchange = (e) => {
      option.text = e.target.value;
      option.value = e.target.value;
    };

    const deleteButton = document.createElement("button");
    deleteButton.className = "icon-button";
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = () => {
      select.removeChild(option);
      showSelectDetails(select, detailsContainer);
    };

    optionContainer.appendChild(optionInput);
    optionContainer.appendChild(deleteButton);

    detailsContainer.appendChild(optionContainer);
  });

  const addButton = document.createElement("button");
  addButton.className = "icon-button";
  addButton.innerHTML = '<i class="fas fa-plus"></i>';
  addButton.onclick = () => {
    const newOptionValue = prompt(
      "Digite o valor para a nova opção do menu list:"
    );
    if (newOptionValue) {
      const newOption = new Option(newOptionValue, newOptionValue);
      select.add(newOption);
      showSelectDetails(select, detailsContainer);
    }
  };

  detailsContainer.appendChild(addButton);
}

function addOptionToSelect(select) {
  const newOptionValue = prompt("New option value:");
  if (newOptionValue) {
    const newOption = new Option(newOptionValue, newOptionValue);
    select.add(newOption);
    showDetails(select);
  }
}

function hideDetails() {
  const details = document.querySelector(".details");
  if (details) {
    details.style.display = "none";
  }
}

document.addEventListener("click", function (event) {
  const editor = document.querySelector(".editor");
  const details = document.querySelector(".details");
  if (
    editor &&
    details &&
    !editor.contains(event.target) &&
    !details.contains(event.target)
  ) {
    hideDetails();
  }
});
document
  .getElementById("fontSizeSelector")
  .addEventListener("change", function () {
    var fontSize = this.value;
    applyFontSizeToSelection(fontSize);
  });

function applyFontSizeToSelection(fontSize) {
  var selection = window.getSelection();
  if (!selection.rangeCount) return;

  var range = selection.getRangeAt(0);

  if (range.collapsed) {
    console.log("Nenhuma seleção de texto para formatar.");
    return;
  }

  var newSpan = document.createElement("span");
  newSpan.style.fontSize = fontSize;

  var docFragment = range.extractContents();

  formatNodes(docFragment, newSpan);

  range.insertNode(docFragment);

  selection.removeAllRanges();
  selection.addRange(range);
}

function formatNodes(node, formatSpan) {
  if (!node) return;

  node.childNodes.forEach((child) => {
    if (child.nodeType === 3) {
      var newSpan = formatSpan.cloneNode(false);
      newSpan.textContent = child.textContent;
      child.parentNode.replaceChild(newSpan, child);
    } else if (child.nodeType === 1) {
      formatNodes(child, formatSpan);
    }
  });
}
document
  .querySelector(".editor")
  .addEventListener("beforeinput", handleBeforeInput);

function handleBeforeInput(event) {
  var selection = window.getSelection();
  if (!selection.rangeCount) return;

  var range = selection.getRangeAt(0);

  if (range.collapsed) {
    applyCurrentStyles(selection);
  }
}

function applyCurrentStyles(selection) {
  var span = document.createElement("span");
  var fontSize = document.getElementById("fontSizeSelector").value;
  span.style.fontSize = fontSize;

  if (document.queryCommandState("bold")) {
    span.style.fontWeight = "bold";
  }
  if (document.queryCommandState("italic")) {
    span.style.fontStyle = "italic";
  }
  if (document.queryCommandState("underline")) {
    span.style.textDecoration = "underline";
  }

  wrapTextWithSpan(selection, span);
}

function wrapTextWithSpan(selection, span) {
  var range = selection.getRangeAt(0);

  if (!range.collapsed || !range.startContainer.textContent) {
    var textNode = document.createTextNode("");
    span.appendChild(textNode);
    range.insertNode(span);

    range.selectNodeContents(textNode);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
document
  .querySelector(".form-title-input")
  .addEventListener("input", function (event) {
    var formTitle = event.target.value;
    localStorage.setItem("formTitle", formTitle);
  });