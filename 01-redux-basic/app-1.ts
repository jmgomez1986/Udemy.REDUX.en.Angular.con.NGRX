// Acciones
interface Action {
	type: string;
	payload?: any;
}

// const incementadorAction: Action = {
// 	type: 'INCREMENTAR	'
// };

function reducer(state = 10, action: Action) {
	// if (action.type === 'INCREMENTAR') {
	// 	return state += 1;
	// }
	// return state;

	switch (action.type) {
		case 'INCREMENTAR':
			return state += 1;
		case 'DECREMENTAR':
			return state -= 1;
		case 'MULTIPLICAR':
			return state * action.payload;
		case 'DIVIDIR':
			return state / action.payload;
		default:
			return state;
	}
}

// Usar el reducer

const incementadorAction: Action = {
	type: 'INCREMENTAR'
};

const decrementadorAction: Action = {
	type: 'DECREMENTAR'
};

const multiplicadorAction: Action = {
	type: 'MULTIPLICAR',
	payload: 2
};

const divisionAction: Action = {
	type: 'DIVIDIR',
	payload: 2
};

console.log(reducer(10, incementadorAction)); // 11
console.log(reducer(10, decrementadorAction)); // 9
console.log(reducer(10, multiplicadorAction)); // 20
console.log(reducer(10, divisionAction)); // 5