document.querySelectorAll(".glass-btn").forEach((btn) => {
	btn.addEventListener("mousedown", () => {
		btn.style.transform = "scale(.94)";
	});

	btn.addEventListener("mouseup", () => {
		btn.style.transform = "";
	});
});
