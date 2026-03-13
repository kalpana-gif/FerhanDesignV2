import { useRef, useEffect } from 'react';

const Squares = ({
                     direction = 'right',
                     speed = 1,
                     borderColor = '#999',
                     squareSize = 40,
                     hoverFillColor = '#222'
                 }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const gridOffset = useRef({ x: 0, y: 0 });
    const hoveredSquareRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        // ResizeObserver fires once the element has actual dimensions
        const ro = new ResizeObserver(() => resizeCanvas());
        ro.observe(canvas);
        resizeCanvas();

        const drawGrid = () => {
            if (!ctx || canvas.width === 0 || canvas.height === 0) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
            const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

            for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
                for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
                    const squareX = x - (gridOffset.current.x % squareSize);
                    const squareY = y - (gridOffset.current.y % squareSize);

                    if (
                        hoveredSquareRef.current &&
                        Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
                        Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
                    ) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(squareX, squareY, squareSize, squareSize);
                    }

                    ctx.strokeStyle = borderColor;
                    ctx.strokeRect(squareX, squareY, squareSize, squareSize);
                }
            }

            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2,
                Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
            );
            gradient.addColorStop(0, 'rgba(0,0,0,0)');
            gradient.addColorStop(1, '#060010');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const updateAnimation = () => {
            const effectiveSpeed = Math.max(speed, 0.1);
            switch (direction) {
                case 'right':
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize; break;
                case 'left':
                    gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize; break;
                case 'up':
                    gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize; break;
                case 'down':
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize; break;
                case 'diagonal':
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize; break;
            }
            drawGrid();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
            const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
            hoveredSquareRef.current = {
                x: Math.floor((mouseX + gridOffset.current.x - startX) / squareSize),
                y: Math.floor((mouseY + gridOffset.current.y - startY) / squareSize),
            };
        };

        const handleMouseLeave = () => { hoveredSquareRef.current = null; };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            ro.disconnect();
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [direction, speed, borderColor, hoverFillColor, squareSize]);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', height: '100%' }}
        />
    );
};

export default Squares;