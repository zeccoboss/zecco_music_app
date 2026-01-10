const screenBreakPoints = {
	mobileScreen: matchMedia("(max-width: 620px)"),
	bigScreen: matchMedia("(min-width: 621px) and (max-width: 940px)"),
	largeScreen: matchMedia("(min-width: 941px)"),
};

//  and (max-width: 1400px)

const mobileScreen = screenBreakPoints.mobileScreen;
const bigScreen = screenBreakPoints.bigScreen;
const largeScreen = screenBreakPoints.largeScreen;

export { mobileScreen, bigScreen, largeScreen };
