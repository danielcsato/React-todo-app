import './assets/App.scss';
import TodoContextProvider from './context/context';
import Nav from './components/Nav';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {

  return (
    <TodoContextProvider>
      <Nav />
      <TodoList />
      <TodoForm />
    </TodoContextProvider>
  );
}

export default App;
