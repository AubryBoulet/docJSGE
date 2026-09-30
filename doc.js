// ===== Function to copy code =====
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Copy failed: ', err);
        button.textContent = 'Error';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

// ===== Syntax Highlighting =====
function highlightCode() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(block => {
        // Get the raw text content
        const text = block.textContent;
        let html = text;
        
        // First, escape all HTML special characters to prevent XSS and double-encoding
        html = html.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;')
                   .replace(/'/g, '&#39;');
        
        // JavaScript keywords
        const keywords = [
            'import', 'export', 'from', 'class', 'const', 'let', 'var', 'function',
            'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
            'default', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super',
            'static', 'async', 'await', 'yield', 'null', 'true', 'false', 'undefined'
        ];
        
        // JSGE types and classes
        const jsgeTypes = [
            'Camera', 'Sprite', 'Entity', 'Element', 'Animation', 'Button',
            'Gadget', 'Text', 'Transition', 'Bezier', 'Scene', 'position', 'dimensions',
            'velocity', 'acceleration', 'scale', 'physic', 'gravity', 'flip',
            'currentAnimation', 'frameRate', 'ctx', 'canvas', 'backgroundColor',
            'backgroundImage', 'backgroundImageVelocity', 'backgroundImageLoop',
            'backgroundImageFillStyle', 'backgroundType', 'backgroundImagePosition',
            'backgroundImageDimension', 'cacheCanvas', 'targetFPS', 'toleranceDelta',
            'create', 'load', 'update', 'draw', 'drawEntity', 'drawElement',
            'clear', 'moveCamera', 'flipBuffer', 'addColisionWithEntity',
            'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onClick', 'addTextGradient',
            'updateText', 'zOrder', 'remove', 'assign', 'JSGE'
        ];
        
        // Functions and methods
        const functions = [
            'requestAnimationFrame', 'document\\.querySelector', 'document\\.createElement',
            'addEventListener', 'performance\\.now', 'Math\\.floor', 'Math\\.random',
            'console\\.log', 'setTimeout', 'clearRect', 'fillRect', 'drawImage',
            'measureText', 'fillText', 'strokeRect', 'beginPath', 'moveTo', 'lineTo',
            'stroke', 'fill', 'save', 'restore', 'translate', 'rotate', 'scale'
        ];
        
        // Comments (multi-line first, then single-line)
        html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
        html = html.replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>');
        
        // Strings
        html = html.replace(/("[^"]*")/g, '<span class="string">$1</span>');
        html = html.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="string">$1</span>');
        
        // Numbers
        html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>');
        
        // Operators
        html = html.replace(/([+\-*/%=<>!&|^~?:]|\.|\()|(\))|(\{)|(\})|(\[)|(\])/g, '<span class="operator">$1</span>');
        
        // JSGE Types (case-sensitive, word boundaries)
        jsgeTypes.forEach(type => {
            const regex = new RegExp('\\b(' + type.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'g');
            html = html.replace(regex, '<span class="jsge-type">$1</span>');
        });
        
        // JavaScript keywords
        keywords.forEach(keyword => {
            const regex = new RegExp('\\b(' + keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'g');
            html = html.replace(regex, '<span class="keyword">$1</span>');
        });
        
        // Functions
        functions.forEach(func => {
            const regex = new RegExp('\\b(' + func.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'g');
            html = html.replace(regex, '<span class="function">$1</span>');
        });
        
        block.innerHTML = html;
    });
}

            // Scroll up
            sidebar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add smooth scroll for anchors
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

// ===== Initialize Demos =====
function initDemos() {
    // Demo for home page
    if (document.getElementById('full-demo')) {
        initFullDemo();
    }
    
    // Camera demo
    if (document.getElementById('camera-demo')) {
        initCameraDemo();
    }
    
    // Sprite demo
    if (document.getElementById('sprite-demo')) {
        initSpriteDemo();
    }
    
    // Entity demo
    if (document.getElementById('entity-demo')) {
        initEntityDemo();
    }
    
    // Animation demo
    if (document.getElementById('animation-demo')) {
        initAnimationDemo();
    }
    
    // Button demo
    if (document.getElementById('button-demo')) {
        initButtonDemo();
    }
    
    // Text demo
    if (document.getElementById('text-demo')) {
        initTextDemo();
    }
    
    // Transition demo
    if (document.getElementById('transition-demo')) {
        initTransitionDemo();
    }
    
    // Bezier demo
    if (document.getElementById('bezier-demo')) {
        initBezierDemo();
    }
    
    // Scene demo
    if (document.getElementById('scene-demo')) {
        initSceneDemo();
    }
}

// ===== Full Demo for Home Page =====
function initFullDemo() {
    const canvas = document.getElementById('full-demo');
    const ctx = canvas.getContext('2d');
    
    let cameraX = 0;
    let cameraY = 0;
    let playerX = canvas.width / 2;
    let playerY = canvas.height / 2;
    let buttonHovered = false;
    
    // Button position
    const button = {
        x: canvas.width / 2 - 100,
        y: canvas.height - 100,
        width: 200,
        height: 50
    };
    
    // Keyboard input
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
    
    // Mouse handling
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Check if mouse is over button
        buttonHovered = mouseX >= button.x && mouseX <= button.x + button.width &&
                       mouseY >= button.y && mouseY <= button.y + button.height;
    });
    
    // Game loop simulation
    function gameLoop() {
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a larger "world"
        ctx.fillStyle = '#166088';
        ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
        
        // Move player
        const speed = 3;
        if (keys.ArrowUp) playerY -= speed;
        if (keys.ArrowDown) playerY += speed;
        if (keys.ArrowLeft) playerX -= speed;
        if (keys.ArrowRight) playerX += speed;
        
        // Keep player within bounds
        playerX = Math.max(0, Math.min(canvas.width, playerX));
        playerY = Math.max(0, Math.min(canvas.height, playerY));
        
        // Move camera to follow player (centered)
        cameraX = playerX - canvas.width / 2;
        cameraY = playerY - canvas.height / 2;
        
        // Draw player (red square)
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(
            playerX - cameraX - 25,
            playerY - cameraY - 25,
            50, 50
        );
        
        // Draw button
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
            'JSGE Button',
            button.x + button.width / 2 - cameraX,
            button.y + button.height / 2 - cameraY
        );
        
        // Draw camera border
        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Draw information
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 200, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Position: (${Math.round(playerX)}, ${Math.round(playerY)})`, 15, 25);
        ctx.fillText(`Camera: (${Math.round(cameraX)}, ${Math.round(cameraY)})`, 15, 40);
        ctx.fillText('Arrows: Move', 15, 55);
        
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}

// ===== Camera Demo =====
function initCameraDemo() {
    const canvas = document.getElementById('camera-demo');
    const ctx = canvas.getContext('2d');
    
    let cameraX = 0;
    let cameraY = 0;
    
    // JSGE camera simulation
    function drawDemo() {
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a world larger than the camera
        ctx.fillStyle = '#4a6fa5';
        ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
        
        // Draw a red rectangle (entity simulation)
        ctx.fillStyle = 'red';
        ctx.fillRect(100 - cameraX, 100 - cameraY, 50, 50);
        
        // Draw a blue circle
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(300 - cameraX, 200 - cameraY, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw camera border
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Move camera with arrow keys
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

// ===== Sprite Demo =====
function initSpriteDemo() {
    const canvas = document.getElementById('sprite-demo');
    const ctx = canvas.getContext('2d');
    
    // Create a simple sprite (square with gradient)
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
        
        // Draw the sprite
        ctx.save();
        ctx.translate(x + 32, y + 32);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        ctx.drawImage(spriteCanvas, -32, -32, 64, 64);
        ctx.restore();
        
        // Draw controls
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 200, 120);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Controls:', 15, 25);
        ctx.fillText('Arrows: Move', 15, 40);
        ctx.fillText('+ / -: Zoom', 15, 55);
        ctx.fillText('R: Rotate', 15, 70);
        ctx.fillText('S: Reset', 15, 85);
        ctx.fillText(`Scale: ${scale.toFixed(1)}`, 15, 100);
        ctx.fillText(`Rotation: ${(rotation * 180 / Math.PI).toFixed(1)}deg`, 15, 115);
        
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
        
        // Limit scale
        scale = Math.max(0.5, Math.min(3, scale));
    });
    
    drawDemo();
}

// ===== Entity Demo =====
function initEntityDemo() {
    const canvas = document.getElementById('entity-demo');
    const ctx = canvas.getContext('2d');
    
    // Simulation of an entity with physics
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
        
        // Apply gravity
        entity.velocityY += gravity;
        
        // Apply friction
        entity.velocityX *= friction;
        entity.velocityY *= friction;
        
        // Update position
        entity.x += entity.velocityX;
        entity.y += entity.velocityY;
        
        // Keep within bounds
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
        
        // Draw entity
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
        
        // Draw eyes
        ctx.fillStyle = '#fff';
        ctx.fillRect(entity.x + 10, entity.y + 10, 8, 8);
        ctx.fillRect(entity.x + 22, entity.y + 10, 8, 8);
        
        // Draw mouth
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(entity.x + 10, entity.y + 30);
        ctx.quadraticCurveTo(entity.x + 20, entity.y + 35, entity.x + 30, entity.y + 30);
        ctx.stroke();
        
        // Draw information
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 250, 80);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Position: (${Math.round(entity.x)}, ${Math.round(entity.y)})`, 15, 25);
        ctx.fillText(`Velocity: (${entity.velocityX.toFixed(1)}, ${entity.velocityY.toFixed(1)})`, 15, 40);
        ctx.fillText('Arrows: Move', 15, 55);
        ctx.fillText('Space: Jump', 15, 70);
        
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

// ===== Animation Demo =====
function initAnimationDemo() {
    const canvas = document.getElementById('animation-demo');
    const ctx = canvas.getContext('2d');
    
    // Simulation of a sprite sheet animation
    const spriteSheet = document.createElement('canvas');
    spriteSheet.width = 128;
    spriteSheet.height = 32;
    const spriteCtx = spriteSheet.getContext('2d');
    
    // Draw a simple sprite sheet (4 frames)
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
        
        // Update animation
        if (!frameTimer) {
            frameTimer = timestamp;
        }
        
        const elapsed = timestamp - frameTimer;
        if (elapsed > 1000 / frameRate) {
            frame = (frame + 1) % frameCount;
            frameTimer = timestamp;
        }
        
        // Draw current frame
        ctx.drawImage(
            spriteSheet,
            frame * frameWidth, 0, frameWidth, frameHeight,
            x, y, frameWidth, frameHeight
        );
        
        // Draw complete sprite sheet
        ctx.drawImage(spriteSheet, 10, 10, 128, 32);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(10, 10, 128, 32);
        
        // Highlight current frame in sprite sheet
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.strokeRect(10 + frame * 32, 10, 32, 32);
        
        // Draw information
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, canvas.height - 60, 200, 50);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Frame: ${frame + 1}/${frameCount}`, 15, canvas.height - 45);
        ctx.fillText(`Frame Rate: ${frameRate} FPS`, 15, canvas.height - 30);
        ctx.fillText('+ / -: Change speed', 15, canvas.height - 15);
        
        requestAnimationFrame(drawDemo);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === '+') frameRate += 2;
        if (e.key === '-') frameRate = Math.max(1, frameRate - 2);
    });
    
    requestAnimationFrame(drawDemo);
}

// ===== Button Demo =====
function initButtonDemo() {
    const canvas = document.getElementById('button-demo');
    const ctx = canvas.getContext('2d');
    
    // JSGE button simulation
    const button = {
        x: canvas.width / 2 - 100,
        y: canvas.height / 2 - 25,
        width: 200,
        height: 50,
        text: 'JSGE Button',
        color: '#3498db',
        hoverColor: '#2980b9',
        textColor: '#fff',
        hovered: false,
        pressed: false
    };
    
    // Mouse handling
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
        
        // Draw button
        ctx.fillStyle = button.pressed ? button.hoverColor : button.hovered ? button.hoverColor : button.color;
        // Draw rounded rectangle (fallback for browsers without roundRect)
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(button.x, button.y, button.width, button.height, 5);
            ctx.fill();
        } else {
            ctx.fillRect(button.x, button.y, button.width, button.height);
        }
        
        // Draw border
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(button.x, button.y, button.width, button.height, 5);
            ctx.stroke();
        } else {
            ctx.strokeRect(button.x, button.y, button.width, button.height);
        }
        
        // Draw text
        ctx.fillStyle = button.textColor;
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
        
        // Draw information
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 250, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`State: ${button.hovered ? 'Hovered' : button.pressed ? 'Pressed' : 'Normal'}`, 15, 25);
        ctx.fillText('Click the button', 15, 40);
        ctx.fillText('to interact', 15, 55);
        
        requestAnimationFrame(drawDemo);
    }
    
    drawDemo();
}

// ===== Text Demo =====
function initTextDemo() {
    const canvas = document.getElementById('text-demo');
    const ctx = canvas.getContext('2d');
    
    let angle = 0;
    let scale = 1;
    let direction = 1;
    
    function drawDemo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#3498db');
        gradient.addColorStop(1, '#2980b9');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update animation
        angle += 0.01;
        scale += 0.01 * direction;
        if (scale > 1.2 || scale < 0.8) direction *= -1;
        
        // Draw text with different styles
        ctx.save();
        
        // Text 1: Normal
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('JSGE Text', canvas.width / 2, 50);
        
        // Text 2: With shadow
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fillText('Text with shadow', canvas.width / 2, 100);
        ctx.shadowBlur = 0;
        
        // Text 3: Rotation
        ctx.translate(canvas.width / 2, 150);
        ctx.rotate(angle);
        ctx.fillStyle = '#f1c40f';
        ctx.font = '18px Arial';
        ctx.fillText('Rotating text', 0, 0);
        ctx.rotate(-angle);
        ctx.translate(-canvas.width / 2, -150);
        
        // Text 4: Scale
        ctx.translate(canvas.width / 2, 200);
        ctx.scale(scale, scale);
        ctx.fillStyle = '#e74c3c';
        ctx.font = '20px Arial';
        ctx.fillText('Scaled text', 0, 0);
        ctx.scale(1/scale, 1/scale);
        ctx.translate(-canvas.width / 2, -200);
        
        // Text 5: Gradient
        const textGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        textGradient.addColorStop(0, '#e74c3c');
        textGradient.addColorStop(0.5, '#f1c40f');
        textGradient.addColorStop(1, '#2ecc71');
        ctx.fillStyle = textGradient;
        ctx.font = '24px Arial';
        ctx.fillText('Gradient text', canvas.width / 2, 250);
        
        ctx.restore();
        
        // Draw information
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, canvas.height - 50, 200, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Rotation: ${(angle * 180 / Math.PI).toFixed(1)}deg`, 15, canvas.height - 35);
        ctx.fillText(`Scale: ${scale.toFixed(2)}`, 15, canvas.height - 20);
        
        requestAnimationFrame(drawDemo);
    }
    
    drawDemo();
}

// ===== Transition Demo =====
function initTransitionDemo() {
    const canvas = document.getElementById('transition-demo');
    const ctx = canvas.getContext('2d');
    
    // Transition with easing simulation
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
    let duration = 2000; // 2 seconds
    let easingFunction = 'easeInOutQuad';
    
    // Easing functions (simplified)
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
        
        // Apply easing
        const easedProgress = easings[easingFunction](progress);
        box.x = 50 + (targetX - 50) * easedProgress;
        
        if (progress >= 1) {
            startTime = null;
            progress = 0;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw progress line
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, canvas.height / 2 + 30);
        ctx.lineTo(canvas.width - 50, canvas.height / 2 + 30);
        ctx.stroke();
        
        // Draw progress
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, canvas.height / 2 + 30);
        ctx.lineTo(50 + (canvas.width - 100) * progress, canvas.height / 2 + 30);
        ctx.stroke();
        
        // Draw box
        ctx.fillStyle = box.color;
        ctx.fillRect(box.x, box.y, box.width, box.height);
        
        // Draw positions
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Start', 50, canvas.height / 2 + 50);
        ctx.fillText('End', canvas.width - 50, canvas.height / 2 + 50);
        
        // Draw information
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 300, 80);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Progress: ${(progress * 100).toFixed(1)}%`, 15, 25);
        ctx.fillText(`Easing: ${easingFunction}`, 15, 40);
        ctx.fillText('1-7: Change easing', 15, 55);
        ctx.fillText('R: Reset', 15, 70);
        
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

// ===== Scene Demo =====
function initSceneDemo() {
    const canvas = document.getElementById('scene-demo');
    const ctx = canvas.getContext('2d');
    
    // Create a simple scene with layered elements
    let cameraX = 0;
    let cameraY = 0;
    
    // Elements at different depths
    const elements = [
        { x: 0, y: 0, width: 800, height: 400, color: '#166088', zOrder: 0, name: 'Background' },
        { x: 200, y: 150, width: 50, height: 100, color: '#4a6fa5', zOrder: 1, name: 'Tree' },
        { x: 400, y: 200, width: 60, height: 60, color: '#e74c3c', zOrder: 2, name: 'Player' },
        { x: 300, y: 100, width: 40, height: 40, color: '#f1c40f', zOrder: 3, name: 'Foreground' }
    ];
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        const speed = 5;
        if (e.key === 'ArrowRight') cameraX += speed;
        if (e.key === 'ArrowLeft') cameraX -= speed;
        if (e.key === 'ArrowDown') cameraY += speed;
        if (e.key === 'ArrowUp') cameraY -= speed;
    });
    
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a larger world
        ctx.fillStyle = '#4a6fa5';
        ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
        
        // Draw elements sorted by z-order (simulating scene drawing)
        // In JSGE, the Scene class automatically sorts elements by z-order
        elements.sort((a, b) => a.zOrder - b.zOrder);
        
        elements.forEach(element => {
            ctx.fillStyle = element.color;
            ctx.fillRect(
                element.x - cameraX,
                element.y - cameraY,
                element.width,
                element.height
            );
            
            // Draw element label
            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(
                element.name,
                element.x + element.width / 2 - cameraX,
                element.y + element.height / 2 - cameraY
            );
        });
        
        // Draw camera border
    if (ctx.strokeRect) {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }
        
        // Draw information
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 250, 80);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Camera: (${cameraX.toFixed(0)}, ${cameraY.toFixed(0)})`, 15, 25);
        ctx.fillText('Elements sorted by z-order', 15, 40);
        ctx.fillText('Arrows: Move camera', 15, 55);
        ctx.fillText('Higher z-order = on top', 15, 70);
        
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}

// ===== Bezier Demo =====
function initBezierDemo() {
    const canvas = document.getElementById('bezier-demo');
    const ctx = canvas.getContext('2d');
    
    // Control points
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
        
        // Update t
        t += direction;
        if (t > 1) {
            t = 1;
            direction = -0.005;
        } else if (t < 0) {
            t = 0;
            direction = 0.005;
        }
        
        // Calculate point on Bezier curve
        const point = calculateBezierPoint(t, points.p0, points.p1, points.p2, points.p3);
        
        // Draw control lines
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points.p0.x, points.p0.y);
        ctx.lineTo(points.p1.x, points.p1.y);
        ctx.lineTo(points.p2.x, points.p2.y);
        ctx.lineTo(points.p3.x, points.p3.y);
        ctx.stroke();
        
        // Draw Bezier curve
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points.p0.x, points.p0.y);
        for (let i = 0; i <= 1; i += 0.01) {
            const p = calculateBezierPoint(i, points.p0, points.p1, points.p2, points.p3);
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        
        // Draw control points
        ctx.fillStyle = '#e74c3c';
        [points.p0, points.p1, points.p2, points.p3].forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw current point
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw information
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 250, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`t: ${t.toFixed(2)}`, 15, 25);
        ctx.fillText(`Point: (${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, 15, 40);
        ctx.fillText('Auto animation', 15, 55);
        
        requestAnimationFrame(drawDemo);
    }
    
    // Function to calculate a point on a cubic Bezier curve
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
