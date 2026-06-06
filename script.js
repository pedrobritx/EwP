/**
 * script.js — Renders the page from data.js and wires all interactions.
 * Content lives in data.js; this file only renders and animates it.
 */
document.addEventListener("DOMContentLoaded", () => {
	const { PROFILE, PRIMARY, SECTIONS, UI } = window.SITE;

	const root = document.documentElement;
	const loader = document.getElementById("loader");
	const mainContent = document.getElementById("mainContent");
	const heroEl = document.getElementById("hero");
	const sectionsEl = document.getElementById("sections");
	const themeToggle = document.getElementById("themeToggle");
	const langToggle = document.getElementById("langToggle");

	const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const finePointer = window.matchMedia("(pointer: fine)").matches;

	/* ---- Language ---------------------------------------------------------- */
	const browserLang = (navigator.language || "pt").toLowerCase().startsWith("pt")
		? "pt"
		: "en";
	let lang = localStorage.getItem("ewp-lang") || browserLang;

	const t = (obj) => (obj ? obj[lang] ?? obj.en ?? "" : "");

	/* ---- Render ------------------------------------------------------------ */
	function renderHero() {
		heroEl.innerHTML = `
			<img src="${PROFILE.logo}" class="profile-logo reveal-item" alt="${PROFILE.name}" />
			<h1 class="reveal-item">${PROFILE.name}</h1>
			<p class="subtitle reveal-item" data-i18n="subtitle">${t(PROFILE.subtitle)}</p>
			<p class="tagline reveal-item" data-i18n="tagline">${t(PROFILE.tagline)}</p>
			<a class="btn-primary reveal-item" href="${PRIMARY.href}" target="_blank" rel="noopener"
			   data-i18n="primary">
				<i class="bi ${PRIMARY.icon}" aria-hidden="true"></i>
				<span>${t(PRIMARY.label)}</span>
			</a>`;
	}

	function linkMarkup(link) {
		const isMail = link.href.startsWith("mailto:");
		const external = !isMail;
		const note = link.note
			? `<span class="note" data-i18n-note>${t(link.note)}</span>`
			: "";
		const tooltip = link.copy
			? `<span class="copy-tooltip" data-copy-tooltip>${t(UI.copy)}</span>`
			: "";
		const attrs = external ? ' target="_blank" rel="noopener"' : "";
		return `
			<a class="glass-btn reveal-item" href="${link.href}"${attrs}
			   data-link-id="${link.id}"${link.copy ? ` data-copy="${link.copy}"` : ""}>
				<span class="icon"><i class="bi ${link.icon}" aria-hidden="true"></i></span>
				<span class="body">
					<span class="label" data-i18n-label>${t(link.label)}</span>
					${note}
				</span>
				<i class="bi bi-arrow-up-right chev" aria-hidden="true"></i>
				${tooltip}
			</a>`;
	}

	function renderSections() {
		sectionsEl.innerHTML = SECTIONS.map(
			(section) => `
			<section class="link-section" data-section="${section.id}">
				<h2 class="section-label" data-i18n-section>${t(section.label)}</h2>
				${section.links.map(linkMarkup).join("")}
			</section>`
		).join("");
	}

	function render() {
		renderHero();
		renderSections();
		document.documentElement.lang = lang;
		wireLinks();
	}

	/* ---- Re-translate without re-rendering (keeps reveal state) ----------- */
	function retranslate() {
		document.querySelector('[data-i18n="subtitle"]').textContent = t(PROFILE.subtitle);
		document.querySelector('[data-i18n="tagline"]').textContent = t(PROFILE.tagline);
		document.querySelector('[data-i18n="primary"] span').textContent = t(PRIMARY.label);

		SECTIONS.forEach((section) => {
			const sectionEl = sectionsEl.querySelector(`[data-section="${section.id}"]`);
			sectionEl.querySelector("[data-i18n-section]").textContent = t(section.label);
			section.links.forEach((link) => {
				const a = sectionEl.querySelector(`[data-link-id="${link.id}"]`);
				a.querySelector("[data-i18n-label]").textContent = t(link.label);
				const noteEl = a.querySelector("[data-i18n-note]");
				if (noteEl && link.note) noteEl.textContent = t(link.note);
			});
		});
		document.documentElement.lang = lang;
	}

	/* ---- Link interactions (glimmer, magnetic, copy) ---------------------- */
	function wireLinks() {
		const cards = document.querySelectorAll(".glass-btn");
		cards.forEach((card) => {
			if (finePointer && motionOK) {
				card.addEventListener("mousemove", (e) => {
					const r = card.getBoundingClientRect();
					card.style.setProperty("--x", `${e.clientX - r.left}px`);
					card.style.setProperty("--y", `${e.clientY - r.top}px`);
				});
			}

			// Email: copy address to clipboard with feedback.
			const copyVal = card.getAttribute("data-copy");
			if (copyVal && navigator.clipboard) {
				const tip = card.querySelector("[data-copy-tooltip]");
				card.addEventListener("click", () => {
					navigator.clipboard
						.writeText(copyVal)
						.then(() => {
							if (!tip) return;
							tip.textContent = t(UI.copied);
							tip.classList.add("show");
							setTimeout(() => tip.classList.remove("show"), 1800);
						})
						.catch(() => {});
				});
			}
		});
	}

	/* ---- Theme ------------------------------------------------------------- */
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

	function applyTheme(theme) {
		root.setAttribute("data-theme", theme);
		const icon = themeToggle.querySelector("i");
		icon.className = theme === "dark" ? "bi bi-moon-stars" : "bi bi-sun";
		themeToggle.setAttribute("aria-label", t(UI.themeToggle));
	}

	applyTheme(root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light"));

	themeToggle.addEventListener("click", () => {
		const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
		localStorage.setItem("ewp-theme", next);
		applyTheme(next);
	});

	// Follow the OS when the user hasn't chosen an explicit override.
	systemDark.addEventListener("change", (e) => {
		if (!localStorage.getItem("ewp-theme")) applyTheme(e.matches ? "dark" : "light");
	});

	/* ---- Language toggle --------------------------------------------------- */
	function syncLangUI() {
		langToggle.querySelectorAll("span").forEach((s) => {
			s.classList.toggle("active", s.getAttribute("data-lang") === lang);
		});
		langToggle.setAttribute("aria-label", t(UI.langToggle));
	}

	function setLang(next) {
		lang = next;
		localStorage.setItem("ewp-lang", next);
		syncLangUI();
		retranslate();
	}

	langToggle.addEventListener("click", () => setLang(lang === "pt" ? "en" : "pt"));
	langToggle.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			setLang(lang === "pt" ? "en" : "pt");
		}
	});

	/* ---- Background parallax ---------------------------------------------- */
	if (finePointer && motionOK) {
		const blobs = document.querySelectorAll(".blob");
		document.addEventListener("mousemove", (e) => {
			blobs.forEach((blob, i) => {
				const speed = (i + 1) * 0.02;
				const x = (window.innerWidth / 2 - e.clientX) * speed;
				const y = (window.innerHeight / 2 - e.clientY) * speed;
				blob.style.transform = `translate(${x}px, ${y}px)`;
			});
		});
	}

	/* ---- Boot -------------------------------------------------------------- */
	render();
	syncLangUI();
	document.getElementById("year").textContent = new Date().getFullYear();

	const settle = motionOK ? 1200 : 0;
	setTimeout(() => {
		loader.classList.add("fade-out");
		mainContent.classList.add("visible");

		const items = document.querySelectorAll(".reveal-item");
		items.forEach((item, i) => {
			setTimeout(() => item.classList.add("reveal"), motionOK ? 70 * i : 0);
		});
	}, settle);
});
