document.addEventListener("DOMContentLoaded", () => {
	const loader = document.getElementById("loader");
	const mainContent = document.getElementById("mainContent");
	const buttons = document.querySelectorAll(".btn-stagger");
	const langToggle = document.getElementById("langToggle");
	const blobs = document.querySelectorAll(".blob");

	// --- 1. Loader & Staggered Entry ---
	setTimeout(() => {
		loader.classList.add("fade-out");
		mainContent.classList.add("visible");

		// Stagger buttons
		buttons.forEach((btn, index) => {
			setTimeout(() => {
				btn.classList.add("reveal");
			}, 200 * (index + 1));
		});
	}, 1500);

	// --- 2. Magnetic & Glimmer Effect ---
	buttons.forEach((btn) => {
		btn.addEventListener("mousemove", (e) => {
			const rect = btn.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// Update CSS variables for glimmer
			btn.style.setProperty("--x", `${x}px`);
			btn.style.setProperty("--y", `${y}px`);

			// Magnetic transform
			const centerX = x - rect.width / 2;
			const centerY = y - rect.height / 2;
			btn.style.transform = `translate(${centerX * 0.3}px, ${centerY * 0.5}px) scale(1.02)`;
		});

		btn.addEventListener("mouseleave", () => {
			btn.style.transform = "translate(0, 0) scale(1)";
		});
	});

	// --- 3. Dynamic Background Blobs (Mouse Follow) ---
	document.addEventListener("mousemove", (e) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		blobs.forEach((blob, index) => {
			const speed = (index + 1) * 0.02;
			const x = (window.innerWidth / 2 - mouseX) * speed;
			const y = (window.innerHeight / 2 - mouseY) * speed;
			blob.style.transform = `translate(${x}px, ${y}px)`;
		});
	});

	// --- 4. Language Toggle ---
	let currentLang = "pt";
	langToggle.addEventListener("click", () => {
		currentLang = currentLang === "pt" ? "en" : "pt";

		// Update toggle UI
		langToggle.querySelectorAll("span").forEach((s) => {
			s.classList.toggle("active");
		});

		// Update all translatable text
		document.querySelectorAll("[data-pt]").forEach((el) => {
			const text = el.getAttribute(`data-${currentLang}`);
			const span = el.querySelector("span");
			if (span) {
				span.textContent = text;
			} else if (el.tagName === "H1" || el.classList.contains("subtitle")) {
				el.textContent = text;
			}
		});
	});

	// --- 5. Testimonial Slider ---
	const testimonials = document.querySelectorAll(".testimonial");
	let testIndex = 0;

	if (testimonials.length > 0) {
		setInterval(() => {
			testimonials[testIndex].classList.remove("active");
			testIndex = (testIndex + 1) % testimonials.length;
			testimonials[testIndex].classList.add("active");
		}, 5000);
	}

	// --- 6. Copy Email to Clipboard ---
	const emailBtn = document.getElementById("emailBtn");
	const copyTooltip = document.getElementById("copyTooltip");

	if (emailBtn) {
		emailBtn.addEventListener("click", (e) => {
			// On desktop, we copy and show feedback. On mobile, we let the link work normally (mostly).
			// To be safe and premium, let's copy AND open mailto.
			const email = "teacher.pedro.brito@gmail.com";
			navigator.clipboard.writeText(email).then(() => {
				copyTooltip.textContent = currentLang === "pt" ? "Copiado!" : "Copied!";
				copyTooltip.classList.add("show");
				setTimeout(() => copyTooltip.classList.remove("show"), 2000);
			});
		});
	}
});
