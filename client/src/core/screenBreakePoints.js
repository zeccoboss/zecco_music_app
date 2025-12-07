const screenBreakePoints = {
	mobileScreen: matchMedia("(max-width: 620px)"),
	bigScreen: matchMedia("(min-width: 621px) and (max-width: 940px)"),
	largeScreen: matchMedia("(min-width: 941px)"),
};

//  and (max-width: 1400px)

const mobleScreen = screenBreakePoints.mobileScreen;
const bigScreen = screenBreakePoints.bigScreen;
const largeScreen = screenBreakePoints.largeScreen;

export { mobleScreen, bigScreen, largeScreen };
