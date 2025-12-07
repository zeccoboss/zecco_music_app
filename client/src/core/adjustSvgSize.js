function adjustAsideSvg(svgs, size = 20) {
	svgs.forEach((svg) => {
		if (svg.classList.contains("home")) {
			svg.setAttribute("width", `${size + 10}`);
			svg.setAttribute("height", `${size + 10}`);
		}

		svg.setAttribute("width", `${size}`);
		svg.setAttribute("height", `${size}`);
	});

	// spans.forEach((span) => {
	// 	// console.log(`${size / 17}rem`);
	// 	// span.style.fontSize = `${size / 16 + 1}rem`;
	// });
}
function adjustFooterSvg(
	svgs,
	playSvgSize = 50,
	nextSvgSize = 27,
	svgSize = 20,
	color
) {
	svgs.forEach((svg) => {
		if (svg.classList.contains("pause") || svg.classList.contains("play")) {
			svg.setAttribute("width", `${playSvgSize}`);
			svg.setAttribute("height", `${playSvgSize}`);
		} else if (
			svg.classList.contains("next") ||
			svg.classList.contains("back")
		) {
			svg.setAttribute("width", `${nextSvgSize}`);
			svg.setAttribute("height", `${nextSvgSize}`);
		} else {
			svg.setAttribute("width", `${svgSize}`);
			svg.setAttribute("height", `${svgSize}`);
			svg.fill = color;
		}
	});
}

// function adjustHeaderSvg(
// 	svgs,
// 	musicIconSvgSize = 0,
// 	musicIconOptSvgSize,
// 	heading,
// 	span
// ) {
// 	svgs.forEach((svg) => {
// 		console.log(svg);
// 	});
// }

function adjustMusicCardSvg(svgs, size = 20) {
	svgs.forEach((svg) => {
		svg.setAttribute("width", `${size}`);
		svg.setAttribute("height", `${size}`);
	});
}

// function adjustMusicListSvg(svgs, size = 20) {
// 	// console.log(svgs);
// }

export {
	adjustAsideSvg,
	adjustFooterSvg,
	// adjustHeaderSvg,
	adjustMusicCardSvg,
	// adjustMusicListSvg,
};
