import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    /**
     * review
     *
     * в MainApp/index.tsx
     * есть типTodo, описал что его нужно в шары, и заменить any им
     */
    onSubmit: (todo: any) => void,

}
type InputNewTodoState = {
    value: string
}

/**
 * интересно, почему бы не экспортировать по дуфолту, только класс же экспортируется
 */
export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    handleKeyDown = (event: React.KeyboardEvent) => {
        /**
         * Review
         * Я бы использовал event.key === 'Enter'
         */
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        /**
         * Review
         * var может привести к неочевидному поведению, я бы посоветовал использовать const
         */
        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            /**
             * review
             * Наверное надо везед предерживатся единого стиля именования классаов, я топлю за CamelCase
             *
             */
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
