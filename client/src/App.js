import './App.css';
import {useState} from "react";

function App() {
    const [name, setName] = useState("");
    const [studentId, setStudentId] = useState(0);
    const [age, setAge] = useState(0);
    const [position, setPosition] = useState("");
    const [contact, setContact] = useState("");


    return (
        <div className="App">
            <div className="information">
                <label>Name:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}/>
                <label>Student ID:</label>
                <input
                    type="number"
                    onChange={(event) => {
                        setStudentId(event.target.value);
                    }}/>
                <label>Age:"</label>
                <input
                    type="number"
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}/>
                <label>Position:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setPosition(event.target.value);
                    }}/>
                <label>Contact:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setContact(event.target.value);
                    }}/>
                <button>Add Member</button>
            </div>
        </div>
    );
}

export default App;
