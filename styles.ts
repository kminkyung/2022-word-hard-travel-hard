import { StyleSheet } from 'react-native';
import { theme } from './colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.bg,
		paddingHorizontal: 20,
	},
	header: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginTop: 100,
	},
	btnText: {
		fontSize: 38,
		fontWeight: '600',
		color: 'white'
	},
	input: {
		backgroundColor: 'white',
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 30,
		marginVertical: 20,
		fontSize: 18
	},
	todo: {
		backgroundColor: theme.todoBg,
		marginBottom: 10,
		paddingVertical: 20,
		paddingHorizontal: 25,
		borderRadius: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	todoText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500'
	}
});
