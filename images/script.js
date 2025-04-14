/ LOADING OVERLAY
window.addEventListener('load', () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
  }
});

// MOBILE NAV
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const mobileFooter = navLinks.querySelector('.mobile-footer');
const body = document.body;

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show', isActive);
    mobileFooter.classList.toggle('show', isActive);
    body.classList.toggle('menu-open', isActive);
  });
}

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('show');
    mobileFooter.classList.remove('show');
    body.classList.remove('menu-open');
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('show');
    mobileFooter.classList.remove('show');
    body.classList.remove('menu-open');
  }
});

// FADE-IN ON SCROLL
const faders = document.querySelectorAll('.fade-in-on-scroll');
const options = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, options);

faders.forEach(fader => observer.observe(fader));
// COMPARISON SECTION
const msgSlider = document.getElementById('msgSlider');
const msgCountEl = document.getElementById('msgCount');
const manualCostEl = document.getElementById('manualCost');
const breezyCostEl = document.getElementById('breezyCost');
const savingsEl = document.getElementById('savings');

let currentValues = {
  msgCount: '1,000',
  manualCost: '500',
  breezyCost: '50',
  savings: '450'
};

let updateQueue = [];

function formatNumber(num) {
  num = Math.round(num);
  return num.toLocaleString('en-US').replace(/^0+/, ''); // Format with commas and remove leading zeros
}

function animateNumber(element, newValue, key) {
  const oldValue = currentValues[key] || '0';
  const oldStr = oldValue.toString().replace(/,/g, ''); // Remove commas for comparison
  const newStr = newValue.toString().replace(/,/g, ''); // Remove commas for comparison

  // Use the newValue directly (already formatted without leading zeros)
  const finalDisplayStr = newValue; // e.g., "400", "4,500"
  const finalDigits = finalDisplayStr.split(''); // Split into individual characters (digits + commas)

  // Clear previous content
  element.innerHTML = '';

  // Remove leading zeros from the digit-only strings for accurate length comparison
  const oldDigitsOnly = oldStr.replace(/^0+/, '') || '0'; // Ensure "0" if empty
  const newDigitsOnly = newStr.replace(/^0+/, '') || '0'; // Ensure "0" if empty
  const maxDigitLength = Math.max(oldDigitsOnly.length, newDigitsOnly.length);

  // Pad the digit-only strings to the same length for animation
  const paddedOldStr = oldDigitsOnly.padStart(maxDigitLength, '0');
  const paddedNewStr = newDigitsOnly.padStart(maxDigitLength, '0');

  // Create digit containers based on the final formatted string length
  const digitContainers = [];
  for (let i = 0; i < finalDigits.length; i++) {
    const char = finalDigits[i];
    const container = document.createElement('span');
    container.className = char === ',' ? 'comma-container' : 'digit-container'; // Use a different class for commas

    if (char === ',') {
      // Handle commas without animation
      const comma = document.createElement('span');
      comma.className = 'comma';
      comma.textContent = ',';
      container.appendChild(comma);
    } else {
      // Map the position in the final display to the digit-only string
      const digitIndex = finalDigits.slice(0, i).filter(c => c !== ',').length;
      const oldDigit = document.createElement('span');
      oldDigit.className = 'digit old';
      oldDigit.textContent = digitIndex < paddedOldStr.length ? paddedOldStr[digitIndex] : '0';
      container.appendChild(oldDigit);

      const newDigit = document.createElement('span');
      newDigit.className = 'digit new';
      newDigit.textContent = digitIndex < paddedNewStr.length ? paddedNewStr[digitIndex] : '0';
      container.appendChild(newDigit);

      // Animate if the digit has changed
      if (paddedOldStr[digitIndex] !== paddedNewStr[digitIndex]) {
        setTimeout(() => {
          oldDigit.classList.add('active');
          newDigit.classList.add('active');
        }, i * 50);
      }
    }

    digitContainers.push(container);
    element.appendChild(container);
  }

  // Handle removal of extra digits (if the new number is shorter)
  if (paddedOldStr.length > paddedNewStr.length) {
    const excessDigits = paddedOldStr.length - paddedNewStr.length;
    for (let i = 0; i < excessDigits; i++) {
      const container = document.createElement('span');
      container.className = 'digit-container';

      const oldDigit = document.createElement('span');
      oldDigit.className = 'digit old';
      oldDigit.textContent = paddedOldStr[i];
      container.appendChild(oldDigit);

      const newDigit = document.createElement('span');
      newDigit.className = 'digit new';
      newDigit.textContent = '';
      container.appendChild(newDigit);

      setTimeout(() => {
        oldDigit.classList.add('active');
        newDigit.classList.add('active');
      }, i * 50);

      element.insertBefore(container, digitContainers[0]);
    }
  }

  currentValues[key] = newValue;
}

function updateCosts() {
  const messages = parseInt(msgSlider.value, 10);
  const msgCount = formatNumber(messages); // e.g., "1,200"
  const manualCost = formatNumber(messages * 0.50); // e.g., "600"
  const breezyCost = formatNumber(messages * 0.05); // e.g., "60"
  const savings = formatNumber(messages * 0.50 - messages * 0.05); // e.g., "540"

  updateQueue = [{ msgCount, manualCost, breezyCost, savings }];

  if (updateQueue.length) {
    const { msgCount, manualCost, breezyCost, savings } = updateQueue.shift();
    animateNumber(msgCountEl, msgCount, 'msgCount');
    animateNumber(manualCostEl, manualCost, 'manualCost');
    animateNumber(breezyCostEl, breezyCost, 'breezyCost');
    animateNumber(savingsEl, savings, 'savings');
  }
}

msgSlider.addEventListener('input', updateCosts);
updateCosts();
