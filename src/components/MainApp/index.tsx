import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';

/**
 * review
 * Вынес бы в шаред, много где он нужен
 *
 */
type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}

/**
 * review
 * в конце типа есть ;
 * в других метсах нет, надо бы к единому стилю
 *
 */
type MainAppState = {
    todoTitle: string
};

/**
 * review
 * отрефачить бы в функциональный компонент
 */
class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    /**
     * review
     * any затайпить бы :)
     */
    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        const { todoTitle } = this.state;
        /**
         * review
         * по мне так window.allTodosIsDone тут не оправдано, можно было использовать локальный стейт
         */
        window.allTodosIsDone = true;

        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            <div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {this.props.todos.map((t, idx) => (
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                            /* возможно лучше вынести в класс */
                            style={{ marginTop: -8, marginLeft: 5 }}
                            /*
                            пропсы в ряд читабельнее
                            Этого монстра из onChange вынести в метод
                            */
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                            const changedTodos = this.props.todos.map((t, index) => {
                                const res = { ...t }
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)

                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

/**
 * Про any много где писал  :)
 */
export default connect(
    (state) => ({}),
    (dispatch) => ({
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
