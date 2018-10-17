
import {StyleSheet, TextInput} from 'react-native';
import {Constants} from 'expo';

export const PogoOrange = '#faa31a';

export const Styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// marginTop: Constants.statusBarHeight,
		height: '100%'
	},
	iconInputIcon: {
		width: 30
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
	},
	overlay: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	overlayLogo: {
		marginBottom: 50,
		marginTop: 35,
		height:150,
		width:150
	},
	overlayButton: {
		height: 60,
		borderColor: 'white',
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 15,
		marginTop: 35,
		backgroundColor: PogoOrange,
		width: 240,
		maxWidth: 240
	},
	scrollView: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 100
	},
	link: {
		backgroundColor: 'transparent',
	},
	overlayErrorText: {
		color: 'red',
		marginTop: 10,
		fontSize: 20
	},
	overlaySuccessText: {
		color: PogoOrange,
		marginTop: 10,
		fontSize: 20
	}
});



export const IconInputStyles = StyleSheet.create({
	text: {
		height: 25,
		width: '80%',
		lineHeight: 25,
		color: 'white',
		fontWeight: "400",
		fontSize: 14,
		marginLeft: 25
	},
	container:  {
		width: '72%',
		maxWidth: 350,
		borderStyle: 'solid',
		borderBottomColor: 'white',
		borderBottomWidth: 2,
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		height: 50,
		maxHeight: 50,
		marginBottom: 10
	},
	icon: {
		width: 20
	}
});

export const VenueTotalStyles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		marginTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: '#dddddd'
	},
	textVenueNameContainer: {
		width: '80%'
	},
	textLimitsContainers: {
		width: '20%'
	},
	textVenueName: {
		fontWeight: 'bold',
		textAlign: 'left',
		color: 'black'
	},
	textLimits: {
		textAlign: 'right',
		color: '#222222',
		fontSize: 20
	}
})


export const ShareStyles = StyleSheet.create({
	container: {
		height: 75,
		backgroundColor: 'rgba(30, 30, 30, .7)',
		width: '100%',
		alignItems: 'center',
		borderTopWidth: 2,
		borderTopColor: PogoOrange,
		borderStyle: 'solid'
	},
	buttonShare: {
		height: 50,
		borderColor: '#000000',
		backgroundColor: PogoOrange,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 15,
		marginTop: 10,
		width: 280,
		maxWidth: 280
	}
})

export const PassStyles = StyleSheet.create({
	container: {
		marginTop: 30,
		width: '95%',
		maxWidth: 320,
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: PogoOrange,
		borderRadius: 20,
		padding: 30,
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		justifyContent: 'center'
	},
	textName: {
		color: PogoOrange,
		fontSize: 50,
		textAlign: 'center'
	},
	textExpirationValid: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		margin: 5
	},
	textCity: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		margin: 5
	},
	textExpirationInvalid: {
		color: 'red',
		fontSize: 20,
		textAlign: 'center',
		margin: 5
	},
	textBarcode: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		margin: 5
	},
	buttonUsage: {
		height: 50,
		borderColor: PogoOrange,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 15,
		marginTop: 20,
		backgroundColor: 'transparent',
		width: 220,
		maxWidth: 220
	},
	modalContainer: {
		width: '90%',
		height: '90%',
		backgroundColor: '#ffffff',
		borderRadius: 20,
		padding: 30,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	modalTextContainer: {
		borderBottomColor: PogoOrange,
		borderStyle: 'solid',
		borderBottomWidth: 2,
		width: '100%',
		padding: 10,
		top: 0,
		position: 'absolute'
	},
	modalTextName: {
		color: PogoOrange,
		fontSize: 30,
		textAlign: 'center'
	},
	modalButtonContainer: {
		borderTopColor: PogoOrange,
		borderStyle: 'solid',
		borderTopWidth: 2,
		width: '100%',
		paddingBottom: 20,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0
	},
	modalButton: {
		height: 50,
		borderColor: PogoOrange,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 15,
		marginTop: 20,
		backgroundColor: 'transparent',
		width: 220,
		maxWidth: 220
	},
	modalScrollView: {
		width: '100%',
		marginTop: 40,
		marginBottom: 80,
		flex: 1

	}
})
