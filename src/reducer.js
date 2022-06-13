export default function (state, action) {
    switch (action.type) {
        case 'add':
            return [
                ...state,
                {
                    id: Date.now(),
                    title: action.payload,
                    completed: false,
                }
            ]
        case 'edit':
            return state.map(todo => {
                if (todo.id === action.id) {
                    todo.title = action.payload
                }
                return todo
            })
        case 'toggle':
            return state.map(todo => {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        case 'remove':
            return state.filter(todo => todo.id !== action.payload)
        default:
            return state
    }
}