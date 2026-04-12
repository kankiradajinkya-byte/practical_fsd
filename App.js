import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    rollNo: "",
    password: "",
    confirmPassword: "",
    contact: ""
  });

  const [students, setStudents] = useState([]);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch students
  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student
  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.rollNo || !form.contact) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords not matching");
      return;
    }

    await axios.post("http://localhost:5000/students/add", form);
    alert("Student Added");

    fetchStudents();

    setForm({
      firstName: "",
      lastName: "",
      rollNo: "",
      password: "",
      confirmPassword: "",
      contact: ""
    });
  };

  // Delete
  const deleteStudent = async (rollNo) => {
    await axios.delete(`http://localhost:5000/students/delete/${rollNo}`);
    fetchStudents();
  };

  // Update
  const updateStudent = async (rollNo) => {
    const newContact = prompt("Enter new contact:");
    if (!newContact) return;

    await axios.put(
      `http://localhost:5000/students/update/${rollNo}`,
      { contact: newContact }
    );

    fetchStudents();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Student Registration</h2>

      {/* FORM */}
      <div>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange}/>
        <br />

        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange}/>
        <br />

        <input name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange}/>
        <br />

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}/>
        <br />

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange}/>
        <br />

        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange}/>
        <br /><br />

        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* TABLE */}
      <h2>Students List</h2>

      <table border="1" style={{ margin: "auto", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students && students.length > 0 ? (
            students
              .filter(s => s.firstName) // fixes empty row
              .map((s) => (
                <tr key={s._id}>
                  <td>{s.firstName} {s.lastName}</td>
                  <td>{s.rollNo}</td>
                  <td>{s.contact}</td>
                  <td>
                    <button onClick={() => updateStudent(s.rollNo)}>Update</button>
                    <button onClick={() => deleteStudent(s.rollNo)}>Delete</button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="4">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;