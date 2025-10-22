document.addEventListener('DOMContentLoaded', function () {
    const contatoForm = document.querySelector('.contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            // ** ATENÇÃO: Substitua pelos seus dados do EmailJS **
            const serviceID = 'seu_service_id';
            const templateID = 'seu_template_id';
            const userID = 'seu_user_id';

            if (serviceID === 'seu_service_id' || templateID === 'seu_template_id' || userID === 'seu_user_id') {
                alert('Por favor, configure suas credenciais do EmailJS no arquivo js/contato.js');
                return;
            }

            try {
                const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        service_id: serviceID,
                        template_id: templateID,
                        user_id: userID,
                        template_params: {
                            nome: nome,
                            email: email,
                            mensagem: mensagem
                        }
                    })
                });

                if (response.ok) {
                    alert('Mensagem enviada com sucesso!');
                    contatoForm.reset();
                } else {
                    const errorData = await response.text();
                    console.error('Erro da API EmailJS:', errorData);
                    alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
                }
            } catch (error) {
                console.error('Erro ao enviar a mensagem:', error);
                alert('Erro ao enviar a mensagem. Verifique sua conexão e tente novamente.');
            }
        });
    }
});