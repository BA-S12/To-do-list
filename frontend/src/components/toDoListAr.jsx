import { useState, useEffect } from 'react';
import '../style/toDoList.css';
import '../style/globel.css';
import axios from 'axios';

function ToDoListAR() {
const [label, setLabel] = useState('');
const [tasks, setTasks] = useState([]);
const [editState, setEditState] = useState({ id: 0, isEditing: false });

const handleChangeInAdd = (e) => {
    setLabel(e.target.value);
};

const sendValueToServer = () => {
    const addDate = new Date();
    axios
    .post('http://localhost:3001/addTesk', {
        label,
        addDate,
    })
    .catch((err) => console.log(err));
    setLabel('');
    window.location.reload();
};

useEffect(() => {
    axios
    .get('http://localhost:3001/getTesk')
    .then((res) => setTasks(res.data))
    .catch((err) => console.log(err));
}, []);

const handleDelete = (id) => {
    axios
    .post(`http://localhost:3001/deletetask/${id}`)
    .then(() => window.location.reload())
    .catch((err) => console.log(err));
};

const handleEditChange = (e, id) => {
    const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, label: e.target.value } : task
        );
        setTasks(updatedTasks);
    
        // Send the updated label to the server
        const updatedLabel = e.target.value;
        axios
        .post(`http://localhost:3001/editTask/${id}`, {
            label: updatedLabel,
        })
        .then(() => console.log('Task updated successfully'))
        .catch((err) => console.log(err));
};

const Edit = (id) => {
    setEditState({ id, isEditing: true });
};

const handleOK = (id) => {
    setEditState({ id: 0, isEditing: false });
};

return (
    <main>
    <div className="container">
        <div className="add">
        <label htmlFor="">أضف مهمة</label>
        <div className="input">
            <input type="text" value={label} onChange={handleChangeInAdd} />
            {label && <button onClick={sendValueToServer}>إضافة</button>}<i class="fa-solid fa-plus"></i>
        </div>
        </div>
        <div className="display">
        {tasks.map((item) => (
            <div className="tasks" key={item.id}>
            <span>{item.id}</span>
            {editState.isEditing && editState.id === item.id ? (
                <>
                <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleEditChange(e, item.id)}
                />
                <button className="btn ok" onClick={() => handleOK(item.id)}>
                    حفظ
                </button>
                </>
            ) : (
                <>
                <h4>{item.label}</h4>
                <button className="btn edit" onClick={() => Edit(item.id)}>
                    تعديل
                </button>
                    <button className="btn del" onClick={() => handleDelete(item.id)}>
                        حذف
                    </button>
                </>
            )}
            </div>
        ))}
        </div>
    </div>
    </main>
);
}

export default ToDoListAR;
