(function() {
	const toggle = document.getElementById('theme-toggle');
	const html = document.documentElement;
	let isAnimating = false;

	const toDark = ['🌒', '🌓', '🌔', '🌕'];
	const toLight = ['🌔', '🌓', '🌒', '🌑'];

	// Check for saved preference or system preference
	function getPreferredTheme() {
		const saved = localStorage.getItem('theme');
		if (saved) return saved;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Animate through moon phases
	function animateToggle(phases, callback) {
		isAnimating = true;
		let i = 0;
		const interval = setInterval(() => {
			toggle.textContent = phases[i];
			i++;
			if (i >= phases.length) {
				clearInterval(interval);
				isAnimating = false;
				if (callback) callback();
			}
		}, 100);
	}

	// Apply theme without animation
	function setTheme(theme) {
		html.setAttribute('data-theme', theme);
		toggle.textContent = theme === 'dark' ? '🌕' : '🌑';
		localStorage.setItem('theme', theme);
	}

	// Initialize
	setTheme(getPreferredTheme());

	// Toggle on click with animation
	toggle.addEventListener('click', () => {
		if (isAnimating) return;
		const current = html.getAttribute('data-theme');
		const newTheme = current === 'dark' ? 'light' : 'dark';
		const phases = newTheme === 'dark' ? toDark : toLight;

		animateToggle(phases, () => {
			html.setAttribute('data-theme', newTheme);
			localStorage.setItem('theme', newTheme);
		});
	});

	// Listen for system preference changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		if (!localStorage.getItem('theme')) {
			setTheme(e.matches ? 'dark' : 'light');
		}
	});
})();
