/**
 * data.js — Single source of truth for all page content.
 *
 * To add or reorder a link, edit only this file:
 *   - Add an object to a section's `links` array (or add a whole new section).
 *   - `icon` uses Bootstrap Icons class names (https://icons.getbootstrap.com).
 *   - `label` is bilingual: { pt, en }.
 *   - Optional flags: `primary` (renders as the hero CTA style),
 *                      `copy` (copies the address to clipboard on click — used for email).
 *   - `external` defaults to true; set false for same-origin links.
 */

const PROFILE = {
	name: "English with Pedro",
	logo: "logo.png",
	subtitle: {
		pt: "Aulas de inglês online · Professor & Desenvolvedor",
		en: "Online English Lessons · Teacher & Developer",
	},
	// Short, calm intro line shown under the subtitle.
	tagline: {
		pt: "Aulas sob medida, ferramentas para professores e tradutores.",
		en: "Tailored lessons, plus tools for teachers and translators.",
	},
};

// The single, primary call-to-action highlighted in the hero.
const PRIMARY = {
	id: "book",
	icon: "bi-calendar-check",
	label: { pt: "Agende uma aula", en: "Book a class" },
	href: "https://calendar.app.google/aBgQfrGp6K5Vo17Y8",
};

const SECTIONS = [
	{
		id: "tools",
		label: { pt: "Ferramentas", en: "Teaching Tools" },
		links: [
			{
				id: "efl",
				icon: "bi-mortarboard",
				label: { pt: "EFL Lesson Framework", en: "EFL Lesson Framework" },
				note: {
					pt: "Planeje aulas com base acadêmica",
					en: "Design academically-based lessons",
				},
				href: "https://pedrobritx.github.io/efl-lesson-framework/",
			},
			{
				id: "verbalis",
				icon: "bi-translate",
				label: { pt: "Verbalis", en: "Verbalis" },
				note: {
					pt: "Tradução com memória, glossário e IA",
					en: "Translation memory, glossary & AI",
				},
				href: "https://pedrobritx.github.io/verbalis/",
			},
		],
	},
	{
		id: "work",
		label: { pt: "Trabalho", en: "Work" },
		links: [
			{
				id: "github",
				icon: "bi-github",
				label: { pt: "Portfólio", en: "Portfolio" },
				note: { pt: "Projetos no GitHub", en: "Projects on GitHub" },
				href: "https://github.com/pedrobritx",
			},
			{
				id: "linkedin",
				icon: "bi-linkedin",
				label: { pt: "Currículo", en: "Resume" },
				note: { pt: "Perfil no LinkedIn", en: "Profile on LinkedIn" },
				href: "https://linkedin.com/in/pedrobritx",
			},
		],
	},
	{
		id: "connect",
		label: { pt: "Contato", en: "Connect" },
		links: [
			{
				id: "whatsapp",
				icon: "bi-whatsapp",
				label: { pt: "WhatsApp", en: "WhatsApp" },
				href: "https://wa.me/5561981015565",
			},
			{
				id: "email",
				icon: "bi-envelope",
				label: { pt: "E-mail", en: "Email" },
				href: "mailto:teacher.pedro.brito@gmail.com",
				copy: "teacher.pedro.brito@gmail.com",
			},
		],
	},
	{
		id: "support",
		label: { pt: "Apoie", en: "Support" },
		links: [
			{
				id: "bmc",
				icon: "bi-cup-hot",
				label: { pt: "Buy Me a Coffee", en: "Buy Me a Coffee" },
				note: { pt: "Apoie meu trabalho", en: "Support my work" },
				href: "https://buymeacoffee.com/pedrobritx",
			},
		],
	},
];

// UI strings that are not links.
const UI = {
	copy: { pt: "Copiar", en: "Copy" },
	copied: { pt: "Copiado!", en: "Copied!" },
	themeToggle: { pt: "Alternar tema claro/escuro", en: "Toggle light/dark theme" },
	langToggle: { pt: "Mudar idioma", en: "Change language" },
};

window.SITE = { PROFILE, PRIMARY, SECTIONS, UI };
