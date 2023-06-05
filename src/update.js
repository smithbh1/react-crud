import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';



export default function Update() {
    const [id, setID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    

    useEffect(() => {
            setID(localStorage.getItem('id'))
            setFirstName(localStorage.getItem('firstName'));
            setLastName(localStorage.getItem('lastName'));
            setEmail(localStorage.getItem('email'));
            setCheckbox(localStorage.getItem('checkbox'));
    }, []);

    const updateAPIData = () => {
        axios.put(`https://61f0bb51e386270017fe1e53.mockapi.io/formData/${id}`, {
            firstName,
             lastName,
             email,
             checkbox
        })
    }
    return (
        <div>
            <h1>Edit User</h1>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' checked={checkbox} onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
                
            </Form>
            
        </div>
    )
}