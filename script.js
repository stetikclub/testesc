// ==========================================
// STETIK CLUB - JAVASCRIPT MASTER
// ==========================================

// Configuração inicial
document.addEventListener('DOMContentLoaded', () => {
    initAll();
});

function initAll() {
    initCursor();
    initMatrixRain();
    init3DGrid();
    initParticles();
    initTypedText();
    initCounters();
    initGatilhos();
    initPecados();
    initQuiz();
    initTimer();
    initVagas();
    initTestimonials();
    initModulosProgress();
    initCTAButtons();
    initScrollAnimations();
    initAOS();
    initEasterEgg();
    initPeopleViewing();
}

// ==========================================
// CURSOR CUSTOMIZADO
// ==========================================
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower
    function animateFollower() {
        const speed = 0.15;
        
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Efeitos hover
    const hoverElements = document.querySelectorAll('a, button, .pecado-card, .gatilho-cube');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#00d9ff';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#00ff41';
        });
    });
}

// ==========================================
// MATRIX RAIN EFFECT
// ==========================================
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Caracteres personalizados (marketing/persuasão)
    const characters = 'PERSUASÃOINFLUÊNCIAGATILHOCONVERSÃO01$%@#&*';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==========================================
// GRID 3D COM THREE.JS
// ==========================================
function init3DGrid() {
    const container = document.getElementById('grid-3d');
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Grid geometry
    const gridSize = 50;
    const gridDivisions = 50;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00ff41, 0x00ff41);
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    
    // Rotate grid for perspective
    gridHelper.rotation.x = Math.PI / 4;
    
    camera.position.z = 30;
    camera.position.y = 15;
    camera.lookAt(0, 0, 0);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        gridHelper.rotation.z += 0.001;
        gridHelper.position.y = Math.sin(Date.now() * 0.001) * 2;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==========================================
// PARTICLES.JS
// ==========================================
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: { enable: true, value_area: 800 }
            },
            color: { value: '#00ff41' },
            shape: {
                type: 'circle',
                stroke: { width: 0, color: '#000' }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00d9ff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// ==========================================
// TYPED TEXT EFFECT
// ==========================================
function initTypedText() {
    new Typed('#typed-text', {
        strings: [
            'Apenas 3% das pessoas descobrem os segredos da persuasão total',
            'Domine os 25 gatilhos mentais que controlam decisões',
            'Transforme conhecimento em poder de influência absoluto'
        ],
        typeSpeed: 40,
        backSpeed: 20,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// ==========================================
// COUNTERS ANIMADOS
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ==========================================
// OS 25 GATILHOS MENTAIS
// ==========================================
const gatilhosData = [
    // LINHA 1 - CONEXÃO EMOCIONAL
    { id: 1, nome: 'Reciprocidade', categoria: 'Conexão Emocional', icone: '🤝', cor: '#00ff41', descricao: 'Quando alguém nos dá algo, sentimos a necessidade de retribuir.', exemplo: 'Oferecendo um eBook gratuito antes de vender um curso.' },
    { id: 2, nome: 'Autoridade', categoria: 'Conexão Emocional', icone: '👑', cor: '#00ff41', descricao: 'Tendemos a confiar em especialistas e autoridades reconhecidas.', exemplo: 'Citando estudos científicos e certificações.' },
    { id: 3, nome: 'Prova Social', categoria: 'Conexão Emocional', icone: '👥', cor: '#00ff41', descricao: 'Seguimos o comportamento da maioria.', exemplo: '"Mais de 10.000 clientes satisfeitos"' },
    { id: 4, nome: 'Confiança', categoria: 'Conexão Emocional', icone: '🛡️', cor: '#00ff41', descricao: 'Base fundamental para qualquer transação.', exemplo: 'Selos de segurança e garantias.' },
    { id: 5, nome: 'Simpatia', categoria: 'Conexão Emocional', icone: '😊', cor: '#00ff41', descricao: 'Preferimos fazer negócios com quem gostamos.', exemplo: 'Storytelling pessoal e autenticidade.' },
    
    // LINHA 2 - DESEJO & ATRAÇÃO
    { id: 6, nome: 'Novidade', categoria: 'Desejo & Atração', icone: '⭐', cor: '#00d9ff', descricao: 'Nosso cérebro libera dopamina ao ver algo novo.', exemplo: '"NOVO: Método revolucionário de vendas"' },
    { id: 7, nome: 'Escassez', categoria: 'Desejo & Atração', icone: '⏳', cor: '#00d9ff', descricao: 'Valorizamos mais o que é raro.', exemplo: '"Apenas 10 unidades restantes"' },
    { id: 8, nome: 'Urgência', categoria: 'Desejo & Atração', icone: '⚡', cor: '#00d9ff', descricao: 'Tempo limitado força decisões rápidas.', exemplo: '"Oferta expira em 24 horas"' },
    { id: 9, nome: 'Curiosidade', categoria: 'Desejo & Atração', icone: '❓', cor: '#00d9ff', descricao: 'Lacunas de conhecimento geram desejo de descobrir.', exemplo: '"O segredo que 99% ignora sobre..."' },
    { id: 10, nome: 'Exclusividade', categoria: 'Desejo & Atração', icone: '🔑', cor: '#00d9ff', descricao: 'Querer fazer parte de algo seleto.', exemplo: '"Acesso VIP somente para membros"' },
    
    // LINHA 3 - TRANSFORMAÇÃO
    { id: 11, nome: 'Antecipação', categoria: 'Transformação', icone: '🚀', cor: '#8b00ff', descricao: 'Expectativa positiva aumenta o valor percebido.', exemplo: 'Countdown para lançamento de produto.' },
    { id: 12, nome: 'Segurança', categoria: 'Transformação', icone: '🔒', cor: '#8b00ff', descricao: 'Redução de riscos facilita a decisão.', exemplo: '"Garantia de 30 dias ou dinheiro de volta"' },
    { id: 13, nome: 'Pertencimento', categoria: 'Transformação', icone: '🏆', cor: '#8b00ff', descricao: 'Desejo de fazer parte de um grupo.', exemplo: 'Comunidades exclusivas de membros.' },
    { id: 14, nome: 'Autorrealização', categoria: 'Transformação', icone: '🎯', cor: '#8b00ff', descricao: 'Alcançar o potencial máximo.', exemplo: '"Torne-se a melhor versão de si mesmo"' },
    { id: 15, nome: 'Transformação', categoria: 'Transformação', icone: '🦋', cor: '#8b00ff', descricao: 'Promessa de mudança significativa.', exemplo: 'Antes e depois com resultados reais.' },
    
    // LINHA 4 - EXPERIÊNCIA
    { id: 16, nome: 'Facilidade', categoria: 'Experiência', icone: '✨', cor: '#ff0051', descricao: 'Soluções simples são mais atraentes.', exemplo: '"Configure em 3 cliques"' },
    { id: 17, nome: 'Simplicidade', categoria: 'Experiência', icone: '⚪', cor: '#ff0051', descricao: 'Menos é mais. Clareza atrai.', exemplo: 'Interface minimalista e direta.' },
    { id: 18, nome: 'Conforto', categoria: 'Experiência', icone: '🛋️', cor: '#ff0051', descricao: 'Busca por bem-estar e comodidade.', exemplo: '"Trabalhe de casa no seu ritmo"' },
    { id: 19, nome: 'Prazer', categoria: 'Experiência', icone: '🎉', cor: '#ff0051', descricao: 'Experiências gratificantes motivam ação.', exemplo: 'Gamificação e recompensas.' },
    { id: 20, nome: 'Surpresa', categoria: 'Experiência', icone: '🎁', cor: '#ff0051', descricao: 'Inesperado cria encantamento.', exemplo: 'Bônus surpresa após a compra.' },
    
    // LINHA 5 - ESTRATÉGIA MENTAL
    { id: 21, nome: 'Avareza', categoria: 'Estratégia Mental', icone: '💰', cor: '#ffd700', descricao: 'Maximizar ganhos, minimizar perdas.', exemplo: '"Compre 1, Leve 2" ou pacotes combinados.' },
    { id: 22, nome: 'Compromisso', categoria: 'Estratégia Mental', icone: '🤞', cor: '#ffd700', descricao: 'Coerência com decisões anteriores.', exemplo: 'Micro-compromissos antes da venda.' },
    { id: 23, nome: 'Admiração', categoria: 'Estratégia Mental', icone: '🏅', cor: '#ffd700', descricao: 'Imitar quem admiramos.', exemplo: 'Celebridades endossando produtos.' },
    { id: 24, nome: 'Comparação', categoria: 'Estratégia Mental', icone: '⚖️', cor: '#ffd700', descricao: 'Avaliar opções lado a lado.', exemplo: 'Tabelas comparativas destacando vantagens.' },
    { id: 25, nome: 'Relevância', categoria: 'Estratégia Mental', icone: '🎪', cor: '#ffd700', descricao: 'Impacto direto na vida do cliente.', exemplo: 'Personalização baseada em comportamento.' }
];

function initGatilhos() {
    const grid = document.getElementById('gatilhos-grid');
    
    gatilhosData.forEach((gatilho, index) => {
        const cube = document.createElement('div');
        cube.className = 'gatilho-cube';
        cube.dataset.id = gatilho.id;
        cube.setAttribute('data-aos', 'fade-up');
        cube.setAttribute('data-aos-delay', (index * 30));
        
        cube.innerHTML = `
            <div class="gatilho-icon">${gatilho.icone}</div>
            <div class="gatilho-name">${gatilho.nome}</div>
            <div class="gatilho-category">${gatilho.categoria}</div>
        `;
        
        cube.style.borderColor = gatilho.cor + '40';
        
        cube.addEventListener('click', () => openGatilhoModal(gatilho));
        
        cube.addEventListener('mouseenter', () => {
            cube.style.borderColor = gatilho.cor;
            cube.style.boxShadow = `0 10px 40px ${gatilho.cor}60`;
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.borderColor = gatilho.cor + '40';
            cube.style.boxShadow = 'none';
        });
        
        grid.appendChild(cube);
    });
}

function openGatilhoModal(gatilho) {
    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <h3>${gatilho.icone} ${gatilho.nome}</h3>
        <p><strong>Categoria:</strong> ${gatilho.categoria}</p>
        <p><strong>O que é:</strong> ${gatilho.descricao}</p>
        <p><strong>Exemplo prático:</strong> ${gatilho.exemplo}</p>
        <div style="margin-top: 30px; padding: 20px; background: rgba(0,255,65,0.1); border: 1px solid ${gatilho.cor}; border-radius: 10px;">
            <strong style="color: ${gatilho.cor};">💡 Como usar no seu negócio:</strong>
            <p style="margin-top: 10px;">Identifique onde este gatilho se encaixa na sua jornada do cliente e teste diferentes abordagens para maximizar seu impacto.</p>
        </div>
    `;
    
    modal.classList.add('active');
}

document.getElementById('modal-close')?.addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.remove('active');
});

document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') {
        e.target.classList.remove('active');
    }
});

// ==========================================
// PECADOS CARDS - EFEITOS INTERATIVOS
// ==========================================
function initPecados() {
    const pecadoCards = document.querySelectorAll('.pecado-card');
    
    pecadoCards.forEach(card => {
        // Efeito de multiplicação para GULA
        if (card.dataset.pecado === 'gula') {
            card.addEventListener('mouseenter', () => {
                const multiplyEffect = card.querySelector('.multiply-effect');
                if (multiplyEffect) {
                    animateMultiply(multiplyEffect);
                }
            });
        }
        
        // Efeito de moedas caindo para GANÂNCIA
        if (card.dataset.pecado === 'ganancia') {
            card.addEventListener('mouseenter', () => {
                const coinsRain = card.querySelector('.coins-rain');
                if (coinsRain) {
                    animateCoins(coinsRain);
                }
            });
        }
        
        // Efeito de shake para IRA
        if (card.dataset.pecado === 'ira') {
            card.addEventListener('mouseenter', () => {
                card.classList.add('shake-intense');
                setTimeout(() => card.classList.remove('shake-intense'), 500);
            });
        }
    });
}

function animateMultiply(element) {
    let count = 1;
    const interval = setInterval(() => {
        element.textContent = '∞'.repeat(count);
        count++;
        if (count > 5) {
            clearInterval(interval);
            setTimeout(() => {
                element.textContent = '∞';
            }, 500);
        }
    }, 100);
}

function animateCoins(element) {
    element.textContent = '💰💰💰';
    setTimeout(() => {
        element.textContent = '';
    }, 1000);
}

// ==========================================
// QUIZ INTERATIVO
// ==========================================
const quizQuestions = [
    {
        question: "Qual resultado você mais deseja alcançar?",
        options: [
            { text: "Aumentar vendas rapidamente", gatilhos: ['urgencia', 'escassez', 'avareza'] },
            { text: "Construir autoridade no mercado", gatilhos: ['autoridade', 'prova-social', 'admiracao'] },
            { text: "Criar conexão emocional com clientes", gatilhos: ['reciprocidade', 'simpatia', 'pertencimento'] },
            { text: "Transformar visitantes em compradores", gatilhos: ['curiosidade', 'transformacao', 'facilidade'] }
        ]
    },
    {
        question: "Como você prefere convencer pessoas?",
        options: [
            { text: "Mostrando resultados reais e provas", gatilhos: ['prova-social', 'autoridade', 'comparacao'] },
            { text: "Criando senso de urgência e oportunidade", gatilhos: ['urgencia', 'escassez', 'exclusividade'] },
            { text: "Oferecendo valor antes de pedir algo", gatilhos: ['reciprocidade', 'confianca', 'seguranca'] },
            { text: "Contando histórias que inspiram", gatilhos: ['simpatia', 'transformacao', 'autorrealizacao'] }
        ]
    },
    {
        question: "Qual é seu maior desafio atual?",
        options: [
            { text: "Falta de confiança dos clientes", gatilhos: ['confianca', 'seguranca', 'autoridade'] },
            { text: "Baixa taxa de conversão", gatilhos: ['urgencia', 'escassez', 'facilidade'] },
            { text: "Dificuldade em se destacar", gatilhos: ['novidade', 'exclusividade', 'admiracao'] },
            { text: "Engajamento fraco do público", gatilhos: ['curiosidade', 'surpresa', 'relevancia'] }
        ]
    }
];

let currentQuestion = 0;
let userAnswers = [];

function initQuiz() {
    renderQuestion();
}

function renderQuestion() {
    const container = document.getElementById('quiz-container');
    const question = quizQuestions[currentQuestion];
    
    container.innerHTML = `
        <div class="quiz-question">
            <p class="question-text">${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" data-index="${index}">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="quiz-nav">
            <button class="quiz-btn" id="quiz-prev" ${currentQuestion === 0 ? 'disabled' : ''}>
                ← Anterior
            </button>
            <button class="quiz-btn" id="quiz-next" disabled>
                ${currentQuestion === quizQuestions.length - 1 ? 'Ver Resultado' : 'Próxima →'}
            </button>
        </div>
    `;
    
    // Event listeners
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            document.getElementById('quiz-next').disabled = false;
        });
    });
    
    document.getElementById('quiz-next')?.addEventListener('click', () => {
        const selected = container.querySelector('.quiz-option.selected');
        if (selected) {
            const index = parseInt(selected.dataset.index);
            userAnswers[currentQuestion] = quizQuestions[currentQuestion].options[index];
            
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                showQuizResult();
            }
        }
    });
    
    document.getElementById('quiz-prev')?.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    });
}

function showQuizResult() {
    // Análise dos gatilhos
    const gatilhoCount = {};
    userAnswers.forEach(answer => {
        answer.gatilhos.forEach(g => {
            gatilhoCount[g] = (gatilhoCount[g] || 0) + 1;
        });
    });
    
    // Top 3 gatilhos
    const topGatilhos = Object.entries(gatilhoCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([nome]) => nome);
    
    const container = document.getElementById('quiz-container');
    container.style.display = 'none';
    
    const result = document.getElementById('quiz-result');
    result.style.display = 'block';
    result.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <h3 style="font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 30px; color: var(--matrix-green);">
                🎯 SEU PERFIL DECODIFICADO
            </h3>
            <p style="font-size: 1.3rem; margin-bottom: 40px; line-height: 1.8;">
                Baseado nas suas respostas, seus <strong style="color: var(--cyan-electric);">gatilhos dominantes</strong> são:
            </p>
            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px;">
                ${topGatilhos.map(g => `
                    <div style="padding: 20px 40px; background: rgba(0,255,65,0.1); border: 2px solid var(--matrix-green); border-radius: 15px;">
                        <div style="font-family: var(--font-display); font-size: 1.5rem; text-transform: uppercase; color: var(--matrix-green);">
                            ${g.replace('-', ' ')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <p style="font-size: 1.1rem; margin-bottom: 30px; color: var(--cyan-electric);">
                Com o STETIK CLUB, você vai dominar estes e os outros 22 gatilhos para <strong>resultados exponenciais</strong>.
            </p>
            <button class="quiz-btn" onclick="location.reload()">
                Refazer Quiz
            </button>
        </div>
    `;
}

// Continua na próxima parte...

// ==========================================
// TIMER DE ESCASSEZ
// ==========================================
function initTimer() {
    // Define o tempo final (24 horas a partir de agora ou fixo)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 horas
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Timer expirou - reiniciar
            location.reload();
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // Atualizar timers de bônus
        const bonusTimers = document.querySelectorAll('.timer-mini');
        bonusTimers.forEach(timer => {
            timer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        });
        
        // Timer de urgência no CTA
        const urgencyTimer = document.getElementById('urgency-timer');
        if (urgencyTimer) {
            urgencyTimer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ==========================================
// CONTADOR DE VAGAS
// ==========================================
function initVagas() {
    const vagasElement = document.getElementById('vagas-restantes');
    const vagasFill = document.getElementById('vagas-fill');
    
    let vagas = 7; // Começar com 7 vagas
    const totalVagas = 100;
    
    // Simular vagas sendo preenchidas
    setInterval(() => {
        if (vagas > 1 && Math.random() > 0.7) {
            vagas--;
            vagasElement.textContent = vagas;
            
            const percentage = ((totalVagas - vagas) / totalVagas) * 100;
            vagasFill.style.width = percentage + '%';
            
            // Efeito visual
            vagasElement.style.animation = 'none';
            setTimeout(() => {
                vagasElement.style.animation = 'pulse 0.5s ease';
            }, 10);
        }
    }, 15000); // A cada 15 segundos, chance de perder uma vaga
}

// ==========================================
// CARROSSEL DE DEPOIMENTOS
// ==========================================
function initTestimonials() {
    const track = document.getElementById('testimonial-track');
    if (!track) return;
    
    // Duplicar cards para loop infinito
    const cards = Array.from(track.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
}

// ==========================================
// ANIMAÇÃO PROGRESS BARS DOS MÓDULOS
// ==========================================
function initModulosProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.dataset.progress;
                
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, 300);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// ==========================================
// BOTÕES CTA - PÍLULAS E MEGA CTA
// ==========================================
function initCTAButtons() {
    // Pílula Vermelha
    const redPill = document.getElementById('red-pill');
    if (redPill) {
        redPill.addEventListener('click', () => {
            // Efeito de entrada na Matrix
            document.body.style.transition = 'all 1s ease';
            document.body.style.filter = 'hue-rotate(90deg) brightness(1.5)';
            
            setTimeout(() => {
                // Scroll suave para próxima seção
                document.getElementById('pecados').scrollIntoView({ behavior: 'smooth' });
                
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 500);
            }, 500);
        });
    }
    
    // Pílula Azul
    const bluePill = document.getElementById('blue-pill');
    if (bluePill) {
        bluePill.addEventListener('click', () => {
            // Efeito de glitch
            document.body.classList.add('glitch-effect');
            
            setTimeout(() => {
                alert('Você escolheu continuar na ilusão? 🔵\n\nMas a curiosidade sempre vence...');
                document.body.classList.remove('glitch-effect');
            }, 1000);
        });
    }
    
    // CTA Mega
    const ctaMega = document.getElementById('cta-mega');
    if (ctaMega) {
        ctaMega.addEventListener('click', () => {
            // Aqui você coloca o link de checkout real
            alert('🚀 Redirecionando para checkout...\n\nEm produção, aqui vai o link de pagamento!');
            
            // Exemplo:
            // window.location.href = 'https://checkout.stetikclub.com';
        });
        
        // Efeito de partículas no hover
        ctaMega.addEventListener('mouseenter', () => {
            createParticleExplosion(ctaMega);
        });
    }
}

function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const particles = 20;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.background = '#00ff41';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        particle.style.boxShadow = '0 0 10px #00ff41';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0;
        let opacity = 1;
        
        function animate() {
            x += vx;
            y += vy;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// ==========================================
// SCROLL ANIMATIONS COM GSAP
// ==========================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax nos fundos
    gsap.to('#grid-3d', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        },
        y: 500,
        opacity: 0.5
    });
    
    // Zoom nos títulos ao scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.fromTo(title,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );
    });
    
    // Efeito de revelação nos cards dos pecados
    gsap.utils.toArray('.pecado-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            rotation: 5,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.7)'
        });
    });
}

// ==========================================
// INITIALIZE AOS (Animate On Scroll)
// ==========================================
function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100
    });
}

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================
function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiPosition = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiPosition]) {
            konamiPosition++;
            
            if (konamiPosition === konamiCode.length) {
                activateEasterEgg();
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });
}

function activateEasterEgg() {
    const easterEgg = document.getElementById('easter-egg');
    easterEgg.classList.add('active');
    
    // Efeito visual especial
    document.body.style.animation = 'rainbow 5s linear infinite';
    
    setTimeout(() => {
        easterEgg.classList.remove('active');
        document.body.style.animation = 'none';
    }, 5000);
    
    // Salvar no localStorage para dar bônus real
    localStorage.setItem('stetik-easter-egg', 'true');
}

// ==========================================
// CONTADOR DE PESSOAS VENDO
// ==========================================
function initPeopleViewing() {
    const element = document.getElementById('pessoas-vendo');
    if (!element) return;
    
    let count = 23;
    
    setInterval(() => {
        // Variar entre 15 e 35 pessoas
        const change = Math.random() > 0.5 ? 1 : -1;
        count += change;
        count = Math.max(15, Math.min(35, count));
        
        element.textContent = count;
        
        // Efeito de pulso
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ff0051';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = 'inherit';
        }, 200);
    }, 8000);
}

// ==========================================
// CONTADOR ONLINE - VARIAÇÃO REALISTA
// ==========================================
function updateOnlineCount() {
    const element = document.getElementById('decodificadores-online');
    if (!element) return;
    
    let baseCount = 5247;
    
    setInterval(() => {
        // Variação aleatória de -10 a +15
        const variation = Math.floor(Math.random() * 26) - 10;
        baseCount += variation;
        
        // Manter entre 5000 e 5500
        baseCount = Math.max(5000, Math.min(5500, baseCount));
        
        // Animar a mudança
        animateCounter(element, baseCount);
    }, 12000);
}

// Iniciar contador online
setTimeout(updateOnlineCount, 2000);

// ==========================================
// SMOOTH SCROLL PARA LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// ANIMAÇÃO RAINBOW PARA EASTER EGG
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .glitch-effect {
        animation: glitch-body 0.3s infinite;
    }
    
    @keyframes glitch-body {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    .shake-intense {
        animation: shake-intense 0.5s ease;
    }
    
    @keyframes shake-intense {
        0%, 100% { transform: translateX(0) rotate(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) rotate(-2deg); }
        20%, 40%, 60%, 80% { transform: translateX(10px) rotate(2deg); }
    }
`;
document.head.appendChild(style);

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy loading de imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce para resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(() => {
    AOS.refresh();
}, 250));

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log('%c🎯 STETIK CLUB', 'color: #00ff41; font-size: 30px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
console.log('%cVocê encontrou o console! 🎉', 'color: #00d9ff; font-size: 16px;');
console.log('%cPara desbloquear bônus secretos, digite: ', 'color: #ffffff; font-size: 14px;');
console.log('%cunlock()', 'color: #ffd700; font-size: 16px; font-weight: bold;');

window.unlock = function() {
    console.log('%c🔓 BÔNUS DESBLOQUEADO!', 'color: #ffd700; font-size: 20px; font-weight: bold;');
    console.log('%cVocê ganhou acesso ao guia secreto de implementação!', 'color: #00ff41; font-size: 14px;');
    activateEasterEgg();
};

// ==========================================
// LOG DE INICIALIZAÇÃO
// ==========================================
console.log('%c✅ Sistema STETIK inicializado com sucesso!', 'color: #00ff41; font-size: 14px;');
console.log('%c⚡ Todos os gatilhos mentais ativos', 'color: #00d9ff; font-size: 12px;');
console.log('%c🎯 Matrix decodificada', 'color: #8b00ff; font-size: 12px;');
