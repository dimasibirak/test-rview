/**
 * review
 * Можно деструктуризировать нужные хуки
 * как пример import React, { useEffect } from 'react';
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    idx: number,
}

/**
 * review
 *
 * Можно вместо props сразу деструктурризировать пропсы { user, idx }: UserSelectProps
 *
 * Контекст тут вроде тоже не нужен, можно обьявить компонент через стрелочную функцию
 *
 * const UserSelect = ({ user, idx }: UserSelectProps) => { тело компонента } не критично, но как то приятнее что-ли)
 *
 */
function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    /**
     * review
     * any протайпить, модель известна, тайпинг есть
     */
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    /**
     * review
     *
     * Я бы добавил обработку ошибок
     */
    React.useEffect(
        () => {
            console.log('userSelect');
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )

    /**
     * review
     * как то привычнее стейт инициализировать вначале компонента
     */
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            /**
             * review
             * не рисковал бы в языке без строгой типизации сравнивать без учета типа
             */
            if (index == idx) {
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    /**
     * review
     * user тоже можно протайпить, модель известна
     */

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
