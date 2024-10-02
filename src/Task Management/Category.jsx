import React, { useState, useEffect } from 'react';

const Category = () => {
  const [items, setItems] = useState(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [inputValue, setInputValue] = useState({
    task: '',
    category: 'Work',
  });

  const [editIndex, setEditIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const categories = ['Work', 'Personal'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.task === '') {
      alert('Please enter a task');
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = items.map((item, index) =>
        index === editIndex ? { ...inputValue, completed: false } : item
      );
      setItems(updatedTasks);
      setEditIndex(null);
    } else {
      setItems([...items, { ...inputValue, completed: false }]);
    }
    setInputValue({ task: '', category: '' });
  };

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(items));
  }, [items]);

  const handleDelete = (index) => {
    const updatedData = items.filter((_, i) => i !== index);
    setItems(updatedData);
  };

  const handleEdit = (index) => {
    setInputValue(items[index]);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedTasks = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedTasks);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const categorizedTasks = categories.reduce((acc, category) => {
    acc[category] = items.filter(task => task.category === category);
    return acc;
  }, {});

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Task Management</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="task" className="block text-sm font-medium text-gray-700">User Task</label>
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
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
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
            {editIndex !== null ? 'Update Task' : 'Add Task'}
          </button>
        </form>

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
                {categorizedTasks[category].map((element, index) => (
                  <tr key={index} style={{ textDecoration: element.completed ? 'line-through' : 'none' }}>
                    <td>{index + 1}</td>
                    <td onClick={() => handleTaskClick(element)} className="cursor-pointer">{element.task}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={element.completed}
                        onChange={() => handleComplete(index)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(index)} className="ml-16 text-center rounded pl-4 pt-2 pb-2 pr-4 bg-cyan-600 text-white">Edit</button>
                      <button onClick={() => handleDelete(index)} className="ml-2 rounded pl-4 bg-red-600 pt-2 pb-2 pr-4 text-white">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {modalVisible && selectedTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Task Details</h3>
              <p><strong>Task:</strong> {selectedTask.task}</p>
              <p><strong>Category:</strong> {selectedTask.category}</p>
              <p><strong>Completed:</strong> {selectedTask.completed ? 'Yes' : 'No'}</p>
              <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
