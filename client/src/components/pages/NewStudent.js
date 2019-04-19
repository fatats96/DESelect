import React, { Component } from 'react';

import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Student from '../Models/Student';

import { HttpReq } from '../../common';

var StudentMod = {...Student};

export default class NewStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName:'',
            lastName:'',
            age:'',
            nationality:''
        }
    }

    onChangeFirstName = (e) => {
        if(e.target.value === '' || StudentMod.firstName.regex.test(e.target.value)){
            this.setState({firstName:e.target.value})
        }
    }

    onChangeLastName = (e) => {
        if(e.target.value === '' || StudentMod.lastName.regex.test(e.target.value)){
            this.setState({lastName:e.target.value})
        }
    }
    onChangeAge = (e) => {
        if( StudentMod.age.regex.test(e.target.value)){
            this.setState({age:e.target.value})
        }
    }
    onChangeNationality = (e) => {
        if(e.target.value === '' || StudentMod.nationality.regex.test(e.target.value)){
            this.setState({nationality:e.target.value})
        }
    }

    onSubmit = () =>{
        if(StudentMod.age>130 || StudentMod.age<0){
            alert("Please Fill Age Values Within This Range: 0 - 130")
            return;
        }

        HttpReq.post('save',{
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            age:parseInt(this.state.age),
            nationality:this.state.nationality
        })
        .then((response)=>{
            console.log(response);
            alert("Succesfully Inserted");
            this.setState({
                firstName:'',
                lastName:'',
                age:'',
                nationality:''
            })
        })
        .catch(err => console.log(err));
    }
    render() {
        return (
            <Col xs={4}>
                <Form>
                    <FormGroup>
                        <Label>First Name:</Label>
                        <Input type="text" placeholder="First Name" value={this.state.firstName} onChange={(e) => this.onChangeFirstName(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Last Name:</Label>
                        <Input type="text" placeholder="Last Name" value={this.state.lastName} onChange={(e) => this.onChangeLastName(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Age:</Label>
                        <Input type="text" placeholder="Age" value={this.state.age} onChange={(e) => this.onChangeAge(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Nationality:</Label>
                        <Input type="text" placeholder="Nationality" value={this.state.nationality} onChange={(e) => this.onChangeNationality(e)}/>
                    </FormGroup>
                    <Button onClick={() =>this.onSubmit()}>Add New Student</Button>
                </Form>
            </Col>
        )
    }
}