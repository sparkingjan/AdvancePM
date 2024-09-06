function simulate() {
    // Get user input
    const velocityInput = document.getElementById('velocity').value;
    const angleInput = document.getElementById('angle').value;
    const unit = document.getElementById('unit').value;

    let velocity = parseFloat(velocityInput);
    const angle = parseFloat(angleInput) * (Math.PI / 180); // Convert angle to radians

    // Convert velocity based on the selected unit
    if (unit === 'cmps') {
        velocity = velocity / 100; // cm/s to m/s
    } else if (unit === 'kmph') {
        velocity = velocity * (1000 / 3600); // km/h to m/s
    }

    // Constants
    const g = 9.81; // Acceleration due to gravity in m/s^2

    // Calculations
    const timeOfFlight = (2 * velocity * Math.sin(angle)) / g;
    const maxHeight = (Math.pow(velocity * Math.sin(angle), 2)) / (2 * g);
    const range = (Math.pow(velocity, 2) * Math.sin(2 * angle)) / g;

    // Display results
    document.getElementById('timeOfFlight').innerHTML = `Time of Flight: ${timeOfFlight.toFixed(2)} s`;
    document.getElementById('maxHeight').innerHTML = `Maximum Height: ${maxHeight.toFixed(2)} m`;
    document.getElementById('range').innerHTML = `Range: ${range.toFixed(2)} m`;

    // Equation of trajectory
    const trajectoryEq = `y = (tan(${angleInput}) * x) - ((${g} * x^2) / (2 * ${Math.pow(velocity * Math.cos(angle), 2)}))`;
    document.getElementById('trajectoryEq').innerHTML = `Equation of trajectory: ${trajectoryEq}`;

    // Draw the trajectory path
    drawTrajectory(velocity, angle, timeOfFlight);
}

function drawTrajectory(velocity, angle, timeOfFlight) {
    const canvas = document.getElementById('trajectoryCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scaling factors
    const scale = 5; // Scale factor for better visualization
    const heightOffset = canvas.height; // Set the base of the projectile

    // Plot trajectory
    ctx.beginPath();
    ctx.moveTo(0, heightOffset);
    
    for (let t = 0; t <= timeOfFlight; t += 0.01) {
        const x = velocity * Math.cos(angle) * t;
        const y = velocity * Math.sin(angle) * t - 0.5 * 9.81 * Math.pow(t, 2);
        ctx.lineTo(x * scale, heightOffset - y * scale);
    }

    ctx.strokeStyle = 'blue';
    ctx.stroke();
}
