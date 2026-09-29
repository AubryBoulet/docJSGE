// ===== Fonction pour copier du code =====
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copié !';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = 'Copier';
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Échec de la copie: ', err);
        button.textContent = 'Erreur';
        setTimeout(() => {
            button.textContent = 'Copier';
        }, 2000);
    });
}

// ===== Mise en surbrillance de la syntaxe =====
function highlightCode() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(block => {
        let html = block.innerHTML;
        
        // Échapper le HTML pour éviter les problèmes
        const text = block.textContent;
        
        // Mots-clés JavaScript
        const keywords = [
            'import', 'export', 'from', 'class', 'const', 'let', 'var', 'function',
            'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
            'default', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super',
            'static', 'async', 'await', 'yield', 'null', 'true', 'false', 'undefined'
        ];
        
        // Types et classes JSGE
        const jsgeTypes = [
            'Camera', 'Sprite', 'Entity', 'Element', 'Animation', 'Button',
            'Gadget', 'Text', 'Transition', 'Bezier', 'position', 'dimensions',
            'velocity', 'acceleration', 'scale', 'physic', 'gravity', 'flip',
            'currentAnimation', 'frameRate', 'ctx', 'canvas', 'backgroundColor',
            'backgroundImage', 'backgroundImageVelocity', 'backgroundImageLoop',
            'backgroundImageFillStyle', 'create', 'load', 'update', 'draw',
            'drawEntity', 'drawElement', 'clear', 'moveCamera', 'addColisionWithEntity',
            'onMouseEnter', 'onMouseLeave', 'onClick', 'addTextGradient', 'updateText'
        ];
        
        // Fonctions et méthodes
        const functions = [
            'requestAnimationFrame', 'document\.querySelector', 'document\.createElement',
            'addEventListener', 'performance\.now', 'Math\.floor', 'Math\.random',
            'console\.log', 'setTimeout', 'clearRect', 'fillRect', 'drawImage',
            'measureText', 'fillText', 'strokeRect', 'beginPath', 'moveTo', 'lineTo',
            'stroke', 'fill', 'save', 'restore', 'translate', 'rotate', 'scale'
        ];
        
        // Chaînes de caractères
        html = html.replace(/("[^"]*"|'[^']*')/g, '<span class="string">$1</span>');
        
        // Nombres
        html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>');
        
        // Commentaires
        html = html.replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>');
        html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
        
        // Opérateurs
        html = html.replace(/([+\-*/%=<>!&|^~?:]|\(\)|\{\}|\\[\]|\\.)/g, '<span class="operator">$1</span>');
        
        // Fonctions JSGE
        jsgeTypes.forEach(type => {
            const regex = new RegExp(`\b(${type})\b`, 'g');
            html = html.replace(regex, '<span class="jsge-type">$1</span>');
        });
        
        // Mots-clés JavaScript
        keywords.forEach(keyword => {
            const regex = new RegExp(`\b(${keyword})\b`, 'g');
            html = html.replace(regex, '<span class="keyword">$1</span>');
        });
        
        // Fonctions
        functions.forEach(func => {
            const regex = new RegExp(`\b(${func})\b`, 'g');
            html = html.replace(regex, '<span class="function">$1</span>');
        });
        
        block.innerHTML = html;
    });
}

// ===== Initialisation de la page =====
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter la classe active à la page courante dans la navbar
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Initialisation des démos
    initDemos();

    // Mise en surbrillance du code
    highlightCode();

    // Gestion du scroll pour la sidebar
    let lastScrollTop = 0;
    const sidebar = document.querySelector('.sidebar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scroll down
            if (window.innerWidth > 768) {
                sidebar.style.transform = 'translateY(-20px)';
            }
        } else {
            // Scroll up
            sidebar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Ajouter un effet de smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});

// ===== Initialisation des démos =====
function initDemos() {
    // Démo pour la page d'accueil
    if (document.getElementById('full-demo')) {
        initFullDemo();
    }
    
    // Démo Camera
    if (document.getElementById('camera-demo')) {
        initCameraDemo();
    }
    
    // Démo Sprite
    if (document.getElementById('sprite-demo')) {
        initSpriteDemo();
    }
    
    // Démo Entity
    if (document.getElementById('entity-demo')) {
        initEntityDemo();
    }
    
    // Démo Animation
    if (document.getElementById('animation-demo')) {
        initAnimationDemo();
    }
    
    // Démo Button
    if (document.getElementById('button-demo')) {
        initButtonDemo();
    }
    
    // Démo Text
    if (document.getElementById('text-demo')) {
        initTextDemo();
    }
    
    // Démo Transition
    if (document.getElementById('transition-demo')) {
        initTransitionDemo();
    }
    
    // Démo Bezier
    if (document.getElementById('bezier-demo')) {
        initBezierDemo();
    }
}

// ===== Démo complète pour la page d'accueil =====
function initFullDemo() {
    const canvas = document.getElementById('full-demo');
    const ctx = canvas.getContext('2d');
    
    let cameraX = 0;
    let cameraY = 0;
    let playerX = canvas.width / 2;
    let playerY = canvas.height / 2;
    let buttonHovered = false;
    
    // Position du bouton
    const button = {
        x: canvas.width / 2 - 100,
        y: canvas.height - 100,
        width: 200,
        height: 50
    };
    
    // Gestion des entrées clavier
    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };
    
    document.addEventListener('keydown', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = true;
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = false;
        }
    });
    
    // Gestion de la souris
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Vérifier si la souris est sur le bouton
        buttonHovered = mouseX >= button.x && mouseX <= button.x + button.width &&
                       mouseY >= button.y && mouseY <= button.y + button.height;
    });
    
    // Simulation de la boucle de jeu
    function gameLoop() {
        // Effacer
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner l'arrière-plan
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner un "monde" plus grand
        ctx.fillStyle = '#166088';
        ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
        
        // Déplacer le joueur
        const speed = 3;
        if (keys.ArrowUp) playerY -= speed;
        if (keys.ArrowDown) playerY += speed;
        if (keys.ArrowLeft) playerX -= speed;
        if (keys.ArrowRight) playerX += speed;
        
        // Garder le joueur dans les limites
        playerX = Math.max(0, Math.min(canvas.width, playerX));
        playerY = Math.max(0, Math.min(canvas.height, playerY));
        
        // Déplacer la caméra pour suivre le joueur (centré)
        cameraX = playerX - canvas.width / 2;
        cameraY = playerY - canvas.height / 2;
        
        // Dessiner le joueur (carré rouge)
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(
            playerX - cameraX - 25,
            playerY - cameraY - 25,
            50, 50
        );
        
        // Dessiner le bouton
        ctx.fillStyle = buttonHovered ? '#3498db' : '#2980b9';
        ctx.fillRect(
            button.x - cameraX,
            button.y - cameraY,
            button.width, button.height
        );
        
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            'Bouton JSGE',
            button.x + button.width / 2 - cameraX,
            button.y + button.height / 2 - cameraY
        );
        
        // Dessiner la bordure de la caméra
        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner les informations
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 200, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Position: (${Math.round(playerX)}, ${Math.round(playerY)})`, 15, 25);
        ctx.fillText(`Caméra: (${Math.round(cameraX)}, ${Math.round(cameraY)})`, 15, 40);
        ctx.fillText('Flèches: Déplacer', 15, 55);
        
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}

// ===== Démo Camera =====
function initCameraDemo() {
    const canvas = document.getElementById('camera-demo');
    const ctx = canvas.getContext('2d');
    
    let cameraX = 0;
    let cameraY = 0;
    
    // Simulation d'une caméra JSGE
    function drawDemo() {
        // Effacer
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner l'arrière-plan
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner un "monde" plus grand que la caméra
        ctx.fillStyle = '#4a6fa5';
        ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
        
        // Dessiner un rectangle rouge (simulation d'entité)
        ctx.fillStyle = 'red';
        ctx.fillRect(100 - cameraX, 100 - cameraY, 50, 50);
        
        // Dessiner un cercle bleu
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(300 - cameraX, 200 - cameraY, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Dessiner la bordure de la caméra
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Déplacer la caméra avec les flèches
        document.addEventListener('keydown', (e) => {
            const speed = 5;
            if (e.key === 'ArrowRight') cameraX += speed;
            if (e.key === 'ArrowLeft') cameraX -= speed;
            if (e.key === 'ArrowDown') cameraY += speed;
            if (e.key === 'ArrowUp') cameraY -= speed;
        });
        
        requestAnimationFrame(drawDemo);
    }
    
    drawDemo();
}

// ===== Démo Sprite =====
function initSpriteDemo() {
    const canvas = document.getElementById('sprite-demo');
    const ctx = canvas.getContext('2d');
    
    // Créer un sprite simple (carré avec un dégradé)
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const spriteCtx = spriteCanvas.getContext('2d');
    
    const gradient = spriteCtx.createLinearGradient(0, 0, 64, 64);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, '#2980b9');
    
    spriteCtx.fillStyle = gradient;
    spriteCtx.fillRect(0, 0, 64, 64);
    spriteCtx.fillStyle = '#fff';
    spriteCtx.font = '20px Arial';
    spriteCtx.textAlign = 'center';
    spriteCtx.textBaseline = 'middle';
    spriteCtx.fillText('S', 32, 32);
    
    let x = 50;
    let y = 50;
    let scale = 1;
    let rotation = 0;
    
    function drawDemo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner le sprite
        ctx.save();
        ctx.translate(x + 32, y + 32);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        ctx.drawImage(spriteCanvas, -32, -32, 64, 64);
        ctx.restore();
        
        // Dessiner les contrôles
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 200, 120);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Controles:', 15, 25);
        ctx.fillText('Flèches: Déplacer', 15, 40);
        ctx.fillText('+ / -: Zoom', 15, 55);
        ctx.fillText('R: Rotation', 15, 70);
        ctx.fillText('S: Réinitialiser', 15, 85);
        ctx.fillText(`Scale: ${scale.toFixed(1)}`, 15, 100);
        ctx.fillText(`Rotation: ${(rotation * 180 / Math.PI).toFixed(1)}°`, 15, 115);
        
        requestAnimationFrame(drawDemo);
    }
    
    document.addEventListener('keydown', (e) => {
        const speed = 5;
        switch(e.key) {
            case 'ArrowRight': x += speed; break;
            case 'ArrowLeft': x -= speed; break;
            case 'ArrowDown': y += speed; break;
            case 'ArrowUp': y -= speed; break;
            case '+': scale *= 1.1; break;
            case '-': scale /= 1.1; break;
            case 'r': rotation += 0.1; break;
            case 'R': rotation -= 0.1; break;
            case 's': 
                x = 50;
                y = 50;
                scale = 1;
                rotation = 0;
                break;
        }
        
        // Limiter le scale
        scale = Math.max(0.5, Math.min(3, scale));
    });
    
    drawDemo();
}

// ===== Démo Entity =====
function initEntityDemo() {
    const canvas = document.getElementById('entity-demo');
    const ctx = canvas.getContext('2d');
    
    // Simulation d'une entité avec physique
    const entity = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 40,
        height: 40,
        velocityX: 0,
        velocityY: 0,
        acceleration: 0.5,
        color: '#e74c3c'
    };
    
    let gravity = 0.2;
    let friction = 0.98;
    
    function drawDemo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Appliquer la gravité
        entity.velocityY += gravity;
        
        // Appliquer la friction
        entity.velocityX *= friction;
        entity.velocityY *= friction;
        
        // Mettre à jour la position
        entity.x += entity.velocityX;
        entity.y += entity.velocityY;
        
        // Garder dans les limites
        if (entity.x < 0) {
            entity.x = 0;
            entity.velocityX *= -0.5;
        }
        if (entity.x + entity.width > canvas.width) {
            entity.x = canvas.width - entity.width;
            entity.velocityX *= -0.5;
        }
        if (entity.y < 0) {
            entity.y = 0;
            entity.velocityY *= -0.5;
        }
        if (entity.y + entity.height > canvas.height) {
            entity.y = canvas.height - entity.height;
            entity.velocityY *= -0.5;
        }
        
        // Dessiner l'entité
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
        
        // Dessiner les yeux
        ctx.fillStyle = '#fff';
        ctx.fillRect(entity.x + 10, entity.y + 10, 8, 8);
        ctx.fillRect(entity.x + 22, entity.y + 10, 8, 8);
        
        // Dessiner la bouche
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(entity.x + 10, entity.y + 30);
        ctx.quadraticCurveTo(entity.x + 20, entity.y + 35, entity.x + 30, entity.y + 30);
        ctx.stroke();
        
        // Dessiner les informations
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 250, 80);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Position: (${Math.round(entity.x)}, ${Math.round(entity.y)})`, 15, 25);
        ctx.fillText(`Vitesse: (${entity.velocityX.toFixed(1)}, ${entity.velocityY.toFixed(1)})`, 15, 40);
        ctx.fillText('Flèches: Déplacer', 15, 55);
        ctx.fillText('Espace: Sauter', 15, 70);
        
        requestAnimationFrame(drawDemo);
    }
    
    document.addEventListener('keydown', (e) => {
        const force = 5;
        switch(e.key) {
            case 'ArrowRight': entity.velocityX = force; break;
            case 'ArrowLeft': entity.velocityX = -force; break;
            case 'ArrowUp': entity.velocityY = -force * 2; break;
            case ' ': entity.velocityY = -force * 2; break;
        }
    });
    
    drawDemo();
}

// ===== Démo Animation =====
function initAnimationDemo() {
    const canvas = document.getElementById('animation-demo');
    const ctx = canvas.getContext('2d');
    
    // Simulation d'une animation de sprite sheet
    const spriteSheet = document.createElement('canvas');
    spriteSheet.width = 128;
    spriteSheet.height = 32;
    const spriteCtx = spriteSheet.getContext('2d');
    
    // Dessiner un sprite sheet simple (4 frames)
    for (let i = 0; i < 4; i++) {
        spriteCtx.fillStyle = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f'][i];
        spriteCtx.fillRect(i * 32, 0, 32, 32);
        spriteCtx.fillStyle = '#fff';
        spriteCtx.font = '16px Arial';
        spriteCtx.textAlign = 'center';
        spriteCtx.textBaseline = 'middle';
        spriteCtx.fillText(i + 1, i * 32 + 16, 16);
    }
    
    let frame = 0;
    let frameCount = 4;
    let frameWidth = 32;
    let frameHeight = 32;
    let frameRate = 10;
    let frameTimer = 0;
    
    let x = canvas.width / 2 - 16;
    let y = canvas.height / 2 - 16;
    
    function drawDemo(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Mettre à jour l'animation
        if (!frameTimer) {
            frameTimer = timestamp;
        }
        
        const elapsed = timestamp - frameTimer;
        if (elapsed > 1000 / frameRate) {
            frame = (frame + 1) % frameCount;
            frameTimer = timestamp;
        }
        
        // Dessiner le frame actuel
        ctx.drawImage(
            spriteSheet,
            frame * frameWidth, 0, frameWidth, frameHeight,
            x, y, frameWidth, frameHeight
        );
        
        // Dessiner le sprite sheet complet
        ctx.drawImage(spriteSheet, 10, 10, 128, 32);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(10, 10, 128, 32);
        
        // Mettre en évidence le frame actuel dans le sprite sheet
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.strokeRect(10 + frame * 32, 10, 32, 32);
        
        // Dessiner les informations
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, canvas.height - 60, 200, 50);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Frame: ${frame + 1}/${frameCount}`, 15, canvas.height - 45);
        ctx.fillText(`Frame Rate: ${frameRate} FPS`, 15, canvas.height - 30);
        ctx.fillText('+ / -: Changer la vitesse', 15, canvas.height - 15);
        
        requestAnimationFrame(drawDemo);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === '+') frameRate += 2;
        if (e.key === '-') frameRate = Math.max(1, frameRate - 2);
    });
    
    requestAnimationFrame(drawDemo);
}

// ===== Démo Button =====
function initButtonDemo() {
    const canvas = document.getElementById('button-demo');
    const ctx = canvas.getContext('2d');
    
    // Simulation d'un bouton JSGE
    const button = {
        x: canvas.width / 2 - 100,
        y: canvas.height / 2 - 25,
        width: 200,
        height: 50,
        text: 'Bouton JSGE',
        color: '#3498db',
        hoverColor: '#2980b9',
        textColor: '#fff',
        hovered: false,
        pressed: false
    };
    
    // Gestion de la souris
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        button.hovered = mouseX >= button.x && mouseX <= button.x + button.width &&
                       mouseY >= button.y && mouseY <= button.y + button.height;
    });
    
    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        if (button.hovered) {
            button.pressed = true;
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        button.pressed = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
        button.hovered = false;
        button.pressed = false;
    });
    
    function drawDemo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner le bouton
        ctx.fillStyle = button.pressed ? button.hoverColor : button.hovered ? button.hoverColor : button.color;
        ctx.beginPath();
        ctx.roundRect(button.x, button.y, button.width, button.height, 5);
        ctx.fill();
        
        // Dessiner la bordure
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(button.x, button.y, button.width, button.height, 5);
        ctx.stroke();
        
        // Dessiner le texte
        ctx.fillStyle = button.textColor;
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
        
        // Dessiner les informations
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 250, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`État: ${button.hovered ? 'Survolé' : button.pressed ? 'Enfoncé' : 'Normal'}`, 15, 25);
        ctx.fillText('Cliquez sur le bouton', 15, 40);
        ctx.fillText('pour interagir', 15, 55);
        
        requestAnimationFrame(drawDemo);
    }
    
    drawDemo();
}

// ===== Démo Text =====
function initTextDemo() {
    const canvas = document.getElementById('text-demo');
    const ctx = canvas.getContext('2d');
    
    let angle = 0;
    let scale = 1;
    let direction = 1;
    
    function drawDemo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner un dégradé d'arrière-plan
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#3498db');
        gradient.addColorStop(1, '#2980b9');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Mettre à jour l'animation
        angle += 0.01;
        scale += 0.01 * direction;
        if (scale > 1.2 || scale < 0.8) direction *= -1;
        
        // Dessiner du texte avec différents styles
        ctx.save();
        
        // Texte 1: Normal
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Texte JSGE', canvas.width / 2, 50);
        
        // Texte 2: Avec ombre
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fillText('Texte avec ombre', canvas.width / 2, 100);
        ctx.shadowBlur = 0;
        
        // Texte 3: Rotation
        ctx.translate(canvas.width / 2, 150);
        ctx.rotate(angle);
        ctx.fillStyle = '#f1c40f';
        ctx.font = '18px Arial';
        ctx.fillText('Texte en rotation', 0, 0);
        ctx.rotate(-angle);
        ctx.translate(-canvas.width / 2, -150);
        
        // Texte 4: Scale
        ctx.translate(canvas.width / 2, 200);
        ctx.scale(scale, scale);
        ctx.fillStyle = '#e74c3c';
        ctx.font = '20px Arial';
        ctx.fillText('Texte redimensionné', 0, 0);
        ctx.scale(1/scale, 1/scale);
        ctx.translate(-canvas.width / 2, -200);
        
        // Texte 5: Dégradé
        const textGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        textGradient.addColorStop(0, '#e74c3c');
        textGradient.addColorStop(0.5, '#f1c40f');
        textGradient.addColorStop(1, '#2ecc71');
        ctx.fillStyle = textGradient;
        ctx.font = '24px Arial';
        ctx.fillText('Texte avec dégradé', canvas.width / 2, 250);
        
        ctx.restore();
        
        // Dessiner les informations
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, canvas.height - 50, 200, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Rotation: ${(angle * 180 / Math.PI).toFixed(1)}°`, 15, canvas.height - 35);
        ctx.fillText(`Scale: ${scale.toFixed(2)}`, 15, canvas.height - 20);
        
        requestAnimationFrame(drawDemo);
    }
    
    drawDemo();
}

// ===== Démo Transition =====
function initTransitionDemo() {
    const canvas = document.getElementById('transition-demo');
    const ctx = canvas.getContext('2d');
    
    // Simulation de transition avec easing
    const box = {
        x: 50,
        y: canvas.height / 2 - 25,
        width: 50,
        height: 50,
        color: '#3498db'
    };
    
    const targetX = canvas.width - 100;
    let progress = 0;
    let startTime = null;
    let duration = 2000; // 2 secondes
    let easingFunction = 'easeInOutQuad';
    
    // Fonctions d'easing (simplifiées)
    const easings = {
        linear: (t) => t,
        easeInQuad: (t) => t * t,
        easeOutQuad: (t) => t * (2 - t),
        easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: (t) => t * t * t,
        easeOutCubic: (t) => (--t) * t * t + 1,
        easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    };
    
    function drawDemo(timestamp) {
        if (!startTime) startTime = timestamp;
        
        const elapsed = timestamp - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        // Appliquer l'easing
        const easedProgress = easings[easingFunction](progress);
        box.x = 50 + (targetX - 50) * easedProgress;
        
        if (progress >= 1) {
            startTime = null;
            progress = 0;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner la ligne de progression
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, canvas.height / 2 + 30);
        ctx.lineTo(canvas.width - 50, canvas.height / 2 + 30);
        ctx.stroke();
        
        // Dessiner la progression
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, canvas.height / 2 + 30);
        ctx.lineTo(50 + (canvas.width - 100) * progress, canvas.height / 2 + 30);
        ctx.stroke();
        
        // Dessiner la boîte
        ctx.fillStyle = box.color;
        ctx.fillRect(box.x, box.y, box.width, box.height);
        
        // Dessiner les positions
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Départ', 50, canvas.height / 2 + 50);
        ctx.fillText('Fin', canvas.width - 50, canvas.height / 2 + 50);
        
        // Dessiner les informations
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 300, 80);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Progression: ${(progress * 100).toFixed(1)}%`, 15, 25);
        ctx.fillText(`Easing: ${easingFunction}`, 15, 40);
        ctx.fillText('1-7: Changer easing', 15, 55);
        ctx.fillText('R: Réinitialiser', 15, 70);
        
        requestAnimationFrame(drawDemo);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
            startTime = null;
            progress = 0;
            box.x = 50;
        } else if (e.key >= '1' && e.key <= '7') {
            const easingsList = ['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic'];
            easingFunction = easingsList[parseInt(e.key) - 1];
            startTime = null;
            progress = 0;
            box.x = 50;
        }
    });
    
    requestAnimationFrame(drawDemo);
}

// ===== Démo Bezier =====
function initBezierDemo() {
    const canvas = document.getElementById('bezier-demo');
    const ctx = canvas.getContext('2d');
    
    // Points de contrôle
    const points = {
        p0: { x: 50, y: canvas.height / 2 },
        p1: { x: canvas.width / 3, y: canvas.height / 4 },
        p2: { x: canvas.width * 2 / 3, y: canvas.height * 3 / 4 },
        p3: { x: canvas.width - 50, y: canvas.height / 2 }
    };
    
    let t = 0;
    let direction = 0.005;
    
    function drawDemo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Mettre à jour t
        t += direction;
        if (t > 1) {
            t = 1;
            direction = -0.005;
        } else if (t < 0) {
            t = 0;
            direction = 0.005;
        }
        
        // Calculer le point sur la courbe de Bézier
        const point = calculateBezierPoint(t, points.p0, points.p1, points.p2, points.p3);
        
        // Dessiner les lignes de contrôle
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points.p0.x, points.p0.y);
        ctx.lineTo(points.p1.x, points.p1.y);
        ctx.lineTo(points.p2.x, points.p2.y);
        ctx.lineTo(points.p3.x, points.p3.y);
        ctx.stroke();
        
        // Dessiner la courbe de Bézier
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points.p0.x, points.p0.y);
        for (let i = 0; i <= 1; i += 0.01) {
            const p = calculateBezierPoint(i, points.p0, points.p1, points.p2, points.p3);
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        
        // Dessiner les points de contrôle
        ctx.fillStyle = '#e74c3c';
        [points.p0, points.p1, points.p2, points.p3].forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Dessiner le point actuel
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Dessiner les informations
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 250, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`t: ${t.toFixed(2)}`, 15, 25);
        ctx.fillText(`Point: (${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, 15, 40);
        ctx.fillText('Animation automatique', 15, 55);
        
        requestAnimationFrame(drawDemo);
    }
    
    // Fonction pour calculer un point sur une courbe de Bézier cubique
    function calculateBezierPoint(t, p0, p1, p2, p3) {
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;
        
        const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
        const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
        
        return { x, y };
    }
    
    drawDemo();
}
