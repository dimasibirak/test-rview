import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {
                    /**
                     * review
                     * Можно так чтоб в оодном стиле
                     *
                     * return {
                     *     ...state,
                     *     todos: [...state.todos, action.payload]
                     * }
                     */
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        /**
                         * review
                         * any убрать и протайпить
                         *
                         * index !== action.payload
                         * Странная конструкция, index это number, action.payload это обьект,
                         * неверная логическая конструкция
                         */
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
