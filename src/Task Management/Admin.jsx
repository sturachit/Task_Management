import React, { useEffect, useState } from 'react';

const Admin = ({ isAdmin }) => {
  const [item, setItem] = useState(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [inputValue, setInputValue] = useState({
    task: '',
    category: 'Work',
  });

  const [edit, setEdit] = useState(null);

  const categories = ['Work', 'Personal'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.task === '') {
      alert('Please enter a task');
    } else {
      if (edit !== null) {
        const updatedTasks = [...item];
        updatedTasks[edit] = { ...inputValue, completed: false };
        setItem(updatedTasks);
        setEdit(null);
      } else {
        setItem([...item, { ...inputValue, completed: false }]);
      }
      setInputValue({ task: '', category: 'Work' });
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

  const handleComplete = (index) => {
    const updatedTasks = [...item];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setItem(updatedTasks);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const categorizedTasks = categories.reduce((acc, category) => {
    acc[category] = item.filter((task) => task.category === category);
    return acc;
  }, {});

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Task Management</h2>

        {!isAdmin && (
          <>
            {/* Form for Users */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="task"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Task
                </label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter task name"
                  value={inputValue.task}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={inputValue.category}
                  onChange={handleInput}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-2/4 px-4 ml-24 py-2 bg-indigo-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                {edit !== null ? 'Update Task' : 'Add Task'}
              </button>
            </form>
          </>
        )}

        {Object.keys(categorizedTasks).map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mt-6">{category}</h3>
            <table border="1" className="w-full mt-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Completed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categorizedTasks[category].map((element, taskIndex) => {
                  const globalIndex = item.findIndex((task) => task === element); // Find the actual index in `item`
                  return (
                    <tr
                      key={globalIndex}
                      style={{
                        textDecoration: element.completed
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      <td>{taskIndex + 1}</td>
                      <td>{element.task}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={element.completed}
                          onChange={() => handleComplete(globalIndex)}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(globalIndex)}
                          className="ml-2 rounded bg-cyan-600 text-white px-4 py-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(globalIndex)}
                          className="ml-2 rounded bg-red-600 text-white px-4 py-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}

        {isAdmin && (
          <div>
            <h2 className="text-2xl font-bold text-center mt-6 mb-6">
              Admin Task Management
            </h2>
            <table border="1" className="w-full mt-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Category</th>
                  <th>Completed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {item.map((element, index) => (
                  <tr
                    key={index}
                    style={{
                      textDecoration: element.completed ? 'line-through' : 'none',
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{element.task}</td>
                    <td>{element.category}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={element.completed}
                        onChange={() => handleComplete(index)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(index)}
                        className="ml-2 rounded bg-cyan-600 text-white px-4 py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="ml-2 rounded bg-red-600 text-white px-4 py-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
