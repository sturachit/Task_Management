import React, { useEffect, useState } from 'react';

const UserTask = () => {
  const [item, setItem] = useState(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [inputValue, setInputValue] = useState({
    task: '',
  });

  const [edit, setEdit] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.task === '') {
      alert('Please enter a task');
    } else {
      if (edit !== null) {
       
        const updatedTasks = [...item];
        updatedTasks[edit] = inputValue;
        setItem(updatedTasks);
        setEdit(null);
      } else {
        
        setItem([...item, inputValue]);
      }
      setInputValue({ task: '' });
    }
  };

 
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(item));
  }, [item]);

  const handleDelete = (index) => {
    const updatedData = [...item];
    updatedData.splice(index, 1); 
    setItem(updatedData);
  };

  const handleEdit = (index) => {
    setInputValue(item[index]);
    setEdit(index); 
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setInputValue({ task: value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Task Management</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="task" className="block text-sm font-medium text-gray-700">
              User Task
            </label>
            <input
              type="text"
              id="task"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter task name"
              value={inputValue.task}
              onChange={handleInput}
            />
          </div>

          <button
            type="submit"
            className="w-2/4 px-4 ml-24 py-2 bg-indigo-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            {edit !== null ? 'Update Task' : 'Add Task'}
          </button>
        </form>

        <table border="1" className="w-full mt-6">
          <thead>
            <tr>
              <th>#</th>
              <th className=''>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {item.map((element, index) => (
              <tr key={index}>
                <td className='mx-4 text-center'>{index + 1}</td>
                <td className='ml-10 text-center'>{element.task}</td>
                <td>
                  <button onClick={() => handleEdit(index)} className='ml-16 text-center rounded rounded-red-700 pl-4 pt-2 pb-2  pr-4 bg-cyan-600'>Edit</button>
                   <button onClick={() => handleDelete(index)} className='ml-10  rounded rounded-  red-700 pl-4 bg-red-600 pt-2 pb-2  pr-4'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTask;
