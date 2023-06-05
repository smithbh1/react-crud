import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
useEffect(() => {
    axios.get(`https://61f0bb51e386270017fe1e53.mockapi.io/formData`)
    .then((response) => {
        setAPIData(response.data);
    })
}, [])
const setData = (data) => {
    
    console.log(data);
    localStorage.setItem('id', data.id);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('checkbox', data.checkbox);
    
}
const getData = () => {
    axios.get(`https://61f0bb51e386270017fe1e53.mockapi.io/formData`)
        .then((getData) => {
             setAPIData(getData.data);
         })
}
const onDelete = (id) => {
    axios.delete(`https://61f0bb51e386270017fe1e53.mockapi.io/formData/${id}`)
    .then(() => {
        getData();
    })
}
    return (
        <div className="card-row">
            
                    {APIData.map((data) => {
                         return (
                            <div key={data.id} className="user-card">
                                <div className="row">
                                    <div className="first-name">
                                        <h3>First Name</h3>
                                        <p>{data.firstName}</p>
                                    </div>
                                    <div className="last-name">
                                        <h3>Last Name</h3>
                                        <p>{data.lastName}</p>
                                    </div>
                                </div>
                                <div className="email">
                                    <p>{data.email}</p>
                                </div>
                                <div className="ui checkbox">
                                    <p>{data.checkbox ? 'Checked' : 'Unchecked'}</p>
                                </div>
                                <div className="update-delete">
                                    <Link to='/update'>
                                        <Button onClick={() => setData(data)}>Edit</Button>
                                    </Link>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </div>
                            </div>
                        
            )})}
                
        </div>
    )
}