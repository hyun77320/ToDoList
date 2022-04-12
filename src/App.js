import React from 'react';
import TodoTemplate from './component/TodoTemplate';
import TodoInsert from './component/TodoInsert';

const App = () => {
  return (
    <div>
      <TodoTemplate>
        <TodoInsert></TodoInsert>
      </TodoTemplate>
    </div>
  );
};

export default App;