import axios from 'axios';
import {useEffect, useState } from "react";
 
function Student()
{
    const [id, setId] = useState('');
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [education, setEducation] = useState("");
 
  const [students, setUsers] = useState([]);
 
useEffect(() => {
  (async () => await Load())();
  }, []);
 
  
  
  async function Load()
  {
     const result = await axios.get("http://localhost:8085/api/stud_mang/");
         setUsers(result.data.data);
         console.log(result.data);
  }
    
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8085/api/stud_mang/add",
        {
              
          fname: fname,
          lname: lname,
          location: location,
          email: email,
          dob: dob,
          education: education

        });
          alert("Student Registation Successfully");
        
        
          Load();
        
        }
    catch(err)
        {
          alert("User Registation Failed");

        }
   }
   async function editStudent(students)
   {
      
    setFname(students.fname);
    setLname(students.lname);
    setLocation(students.locatiom);
    setEmail(students.email);
    setDob(students.dob);
    setEducation(students.education);

    setId(students.id);

   }
 
 
 
   async function DeleteStudent(id)
   {
      
        await axios.delete("http://localhost:8085/api/stud_mang/delete/" + id);
        alert("Are you sure you want to 'DELETE'")
        alert("Student deleted Successfully");
        Load();
  
   }
 
 
 
   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        
        await axios.put("http://localhost:8085/api/stud_mang/update/"+ students.find(u => u.id === id).id || id,
       {
        id: id,
        fname: fname,
        lname: lname,
        location: location,
        email: email,
        dob: dob,
        education: education
      
       });
         alert("Registation Updated !!");
      
      
       }
   catch(err)
       {
         alert("Registation Failed !");
       }
  }
 
 
 
  return (
    <div>
       <h1>Student Management System</h1>
       <div class="container mt-4" >
          <form>
              <div class="form-group">
               <input  type="text" class="form-control" id="student_id" hidden
               value={id}
               onChange={(event) =>
                {
                  setId(event.target.value);      
                }}
              
               />
                <label>First Name : </label>
                <input  type="text" class="form-control" id="fname"
                value={fname}
                onChange={(event) =>
                  {
                    setFname(event.target.value);      
                  }}
                />

                <label>Last Name : </label>
                <input  type="text" class="form-control" id="lname"
                value={lname}
                onChange={(event) =>
                  {
                    setLname(event.target.value);      
                  }}
                />
              </div>

              <div class="form-group">
                <label>Location : </label>
                <input  type="text" class="form-control" id="location"
                 value={location}
                  onChange={(event) =>
                    {
                      setLocation(event.target.value);      
                    }}
                />
              </div>
 
              <div class="form-group">
                <label>Email : </label>
                <input type="email" class="form-control" id="email"
                  value={email}
                onChange={(event) =>
                  {
                    setEmail(event.target.value);      
                  }}
                />
              </div>
              
              <div class="form-group">
                <label>DOB : </label>
                <input  type="date" class="form-control" id="date"
                 value={dob}
                  onChange={(event) =>
                    {
                      setDob(event.target.value);      
                    }}
                />
              </div>

              <div class="form-group">
                <label>Education : </label>
                <input  type="text" class="form-control" id="education"
                 value={education}
                  onChange={(event) =>
                    {
                      setEducation(event.target.value);      
                    }}
                />
              </div>
               <br></br>
              <div class="form-group">
                <label>About : </label>
                <textarea></textarea>
              </div>

              <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Submit</button>
              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>  
            </form>
          </div>
 
<table class="table table-dark" align="center">
  <thead>
    <tr>
      
      <th scope="col">ID</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Location</th>
      <th scope="col">Email</th>
      <th scope="col">DOB</th>
      <th scope="col">Education</th>
      <th scope="col">Option</th>
      <th scope="col">Delete</th>

    </tr>
  </thead>
       {students.map(function fn(student)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{student.id} </th>
                <td>{student.fname}</td>
                <td>{student.lname}</td>
                <td>{student.location}</td>   
                <td>{student.email}</td>
                <td>{student.dob}</td>
                <td>{student.education}</td>       
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>  
                </td>
                <td>   
                    <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
export default Student;