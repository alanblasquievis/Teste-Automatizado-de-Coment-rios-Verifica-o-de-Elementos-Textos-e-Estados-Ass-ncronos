describe('template spec', () => {
  // Visitar a página uma vez antes de todos os testes
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/e2e/index.html'); // Substitua pelo caminho correto da página
  });

  // Verificar título visível
  it('Verificar título visível', () => {
    cy.contains('h1', 'Deixe seu comentário').should('be.visible');
  });

  // Verificar botão "Enviar Comentário" visível
  it('Verificar botão "Enviar Comentário" visível', () => {
    cy.get('#submit-button').should('be.visible');
  });

  // Verificar área de exibição de comentários vazia
  it('Verificar área de exibição de comentários vazia', () => {
    cy.get('#comment-section').should('be.empty');
  });

  // Verificar texto do botão
  it('Verificar texto do botão "Enviar Comentário"', () => {
    cy.get('#submit-button').should('have.text', 'Enviar Comentário');
  });

  // Verificar placeholder do campo de nome
  it('Verificar placeholder do campo de nome', () => {
    cy.get('#nome').should('have.attr', 'placeholder', 'Digite seu nome');
  });

  // Verificar placeholder do campo de comentário
  it('Verificar placeholder do campo de comentário', () => {
    cy.get('#comentario').should('have.attr', 'placeholder', 'Escreva seu comentário aqui...');
  });

  // Manipulação de estados assíncronos
  it('Preencher campos e verificar envio de comentário', () => {
    // Preencher os campos de nome e comentário
    cy.get('#nome').type('Alan');
    cy.get('#comentario').type('Este é um comentário de teste.');

    // Clicar no botão de envio e verificar a mensagem "Enviando..."
    cy.get('#submit-button').click();
    cy.get('#loading').should('be.visible');

    // Aguardar 2 segundos e confirmar que a mensagem desapareceu
    cy.wait(2000);
    cy.get('#loading').should('not.be.visible');

    // Confirmar que o comentário foi adicionado à lista
    cy.get('#comment-section').should('not.be.empty');
    cy.get('#comment-section').contains('Alan: Este é um comentário de teste.');
  });
});
