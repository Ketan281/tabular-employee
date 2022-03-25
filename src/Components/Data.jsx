import React from 'react'
const Data = () => {
    const [formData, setFormData] = React.useState({
        name:'',
        age:'',
        address:'',
        salary:'',
        department:'',
        isMarried:false
    })
    const [employee,setEmployee] = React.useState([])
    const handleChange = (e) =>{
      const {id,value,checked,type} = e.target;
      setFormData({
          ...formData,
          [id]: type === "checkbox" ? checked : value
      });
}

const getData = () =>{
    fetch('http://localhost:3001/employee')
    .then((res)=>res.json())
    //.then((res)=>setFormData(res))
    .then((res)=>setEmployee(res))
    .catch((err)=> console.log("ERROR"))
}
    const handleSubmit =(e)=>{
          e.preventDefault();
          const payloadjson = JSON.stringify(formData);
       
          fetch("http://localhost:3001/employee",{
              method: "POST",
              body: payloadjson,
              headers:{
                  "content-type": "application/json"
              }
          }).then((res)=>{
              console.log(res);
              getData();
          });
    }
React.useEffect(()=>{
getData();
},[])
    // const {name, age, address, salary, department, isMarried} = formData;

  return (
      <>
    <form onSubmit={handleSubmit}>
        <h1>Employee Form</h1>
        <input id = "name" 
        type="text" 
        placeholder='Enter Employee Name' 
        onChange={handleChange}
        value={formData.name}
        />
         <br/> <br/>
        <input 
        id="age" 
        type="number" 
        placeholder='Enter Employee Age'
        value={formData.age} 
        onChange={handleChange}/>
         <br/> <br/>
        <input 
        id="address" 
        type="text" 
        placeholder='Enter Employee Address' 
        value={formData.address}
        onChange={handleChange}/>
         <br/> <br/>
        <input 
        id="salary" 
        type="number" 
        placeholder='Enter Employee Salary' 
        value={formData.salary}
        onChange={handleChange}/>
         <br/> <br/>
        <label>Department:-
            <select onChange={handleChange} id="department" >
              <option value="">Select Department </option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Accounts">Accounts</option>
              <option value="IT">IT</option>
            </select>
        </label> <br/> <br/>
        <label>Is Married:-
        <input 
        id= "isMarrid" 
        type="checkbox" 
        checked={formData.isMarried}
        onChange={handleChange}/>
        </label>
         <br/> <br/>
        <input type="submit" value="SUBMIT"/>
    </form>
    <div>
    {employee.map((item) => (
						<div key={item.id}  style={{display:'flex'}}>
							<div style={{border:'solid'}}>{item.name}<td/></div>
							<div style={{border:'solid'}}>{item.age}<td/></div>
							<div style={{border:'solid'}}>₹{item.salary}<td/></div>
							<div style={{border:'solid'}}>{item.department}<td/></div>
							<div style={{border:'solid'}}>{item.isMarried ? "Yes" : "No"}<td/></div>
							<div style={{border:'solid'}}>{item.id}<td/></div>
						</div>
					))}

        </div>
    </>
  )
}

export {Data}