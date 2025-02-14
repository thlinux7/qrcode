const qrType = document.getElementById('qr-type');
const dynamicFields = document.getElementById('dynamic-fields');
const generateBtn = document.getElementById('generate-btn');
const qrcodeDiv = document.getElementById('qrcode');

// Função para atualizar os campos dinâmicos
function updateFields() {
    const type = qrType.value;
    let fieldsHTML = '';

    switch (type) {
        case 'url':
            fieldsHTML = `
                <div class="form-group">
                    <label for="url">URL:</label>
                    <input type="url" id="url" placeholder="https://exemplo.com" required>
                </div>
            `;
            break;
        case 'text':
            fieldsHTML = `
                <div class="form-group">
                    <label for="text">Texto:</label>
                    <input type="text" id="text" placeholder="Digite seu texto" required>
                </div>
            `;
            break;
        case 'contact':
            fieldsHTML = `
                <div class="form-group">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" placeholder="Nome do contato" required>
                </div>
                <div class="form-group">
                    <label for="phone">Telefone:</label>
                    <input type="tel" id="phone" placeholder="Telefone do contato" required>
                </div>
            `;
            break;
        case 'email':
            fieldsHTML = `
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="exemplo@email.com" required>
                </div>
                <div class="form-group">
                    <label for="subject">Assunto:</label>
                    <input type="text" id="subject" placeholder="Assunto do email">
                </div>
                <div class="form-group">
                    <label for="body">Corpo do Email:</label>
                    <textarea id="body" placeholder="Corpo do email"></textarea>
                </div>
            `;
            break;
        case 'pix':
            fieldsHTML = `
                <div class="form-group">
                    <label for="pix-key">Chave PIX:</label>
                    <input type="text" id="pix-key" placeholder="Chave PIX" required>
                </div>
                <div class="form-group">
                    <label for="amount">Valor (opcional):</label>
                    <input type="number" id="amount" placeholder="Valor em R$">
                </div>
            `;
            break;
    }

    dynamicFields.innerHTML = fieldsHTML;
}

// Atualiza os campos ao mudar o tipo de QR Code
qrType.addEventListener('change', updateFields);

// Gera o QR Code
generateBtn.addEventListener('click', function() {
    const type = qrType.value;
    let qrData = '';

    switch (type) {
        case 'url':
            qrData = document.getElementById('url').value;
            break;
        case 'text':
            qrData = document.getElementById('text').value;
            break;
        case 'contact':
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEND:VCARD`;
            break;
        case 'email':
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const body = document.getElementById('body').value;
            qrData = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            break;
        case 'pix':
            const pixKey = document.getElementById('pix-key').value;
            const amount = document.getElementById('amount').value;
            qrData = `pix:${pixKey}${amount ? `?amount=${amount}` : ''}`;
            break;
    }

    if (!qrData.trim()) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Limpa o conteúdo anterior
    qrcodeDiv.innerHTML = '';

    // Gera o QR Code
    new QRCode(qrcodeDiv, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: '#ffffff', // Pontos brancos
        colorLight: 'transparent', // Fundo transparente
        correctLevel: QRCode.CorrectLevel.H
    });

    // Adiciona animação ao QR Code
    qrcodeDiv.style.opacity = 0;
    setTimeout(() => {
        qrcodeDiv.style.opacity = 1;
    }, 100);
});

// Inicializa os campos ao carregar a página
updateFields();