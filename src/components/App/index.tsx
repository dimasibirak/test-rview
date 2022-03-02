import React from 'react';
/**
 * Не используемый импорт, нужно удалить
 */
import logo from '../../logo.svg';
/**
 * Конечно не знаю какие договоренности на проекте, но я бы придерижвалмя одного стиля, если в дргих компонентах
 * если в других компонентах стиль такой
 * import { App } from './App.css';
 *
 * Субьективно но вы глядит как каша :)
 */
import './App.css';
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';

/**
 * review
 *
 * Я бы все таки убрал закомментированные фрогменты кода, визуально очень захламляют код
 * Позиция по поводу any однозначная:) В этих случаях известна модель и any быть не должно
 */

function App() {
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
  return (
      // туду лист для юзеров:
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
        {/* MAIN APP: */}
        <MainApp todos={todos}/>

        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
