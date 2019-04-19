import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

import { HttpReq } from '../../common';

export default class HomePage extends Component{
    constructor(props){
        super(props);

        this.state={
            data:[],
            nationalities:[],
            nationalityVal:null,
            isAscending: false,
            isWholeList: false
        }
    }

    componentDidMount() {
        this.getListOfStudents()
    }

    getListOfStudents() {
        HttpReq.post('list', {}).then((response) => {
            this.setState({
                data: response.data.data
            },
                () => this.setState({
                    nationalities: [...new Set(response.data.data.map((val) => val.nationality))]
                }
                    , this.state.isWholeList ? null: () => this.onChangeNationality(this.state.nationalities[0])),
            )
        }).catch((error) => { console.log(error); })

    }

    getWholeList() {
        this.setState({
            isWholeList:true
        })
        this.getListOfStudents();
    }

    onChangeNationality = (val) => {
        this.setState({
            isWholeList:false,
            isAscending:false
        })
        HttpReq.post('getByNationality', { nationality: val }).then((response) => {
            this.setState({
                data: response.data.data
            })

        }).catch((error) => { console.log(error); })
    }

    
    sortTheList = () => {
        const {data} = this.state;
        let sortedList = data;
        if(this.state.isAscending === false){
            sortedList.sort((a,b) =>a.firstName < b.firstName ? 1 :-1);
        }
        else{
            sortedList.sort((a,b) =>a.firstName > b.firstName ? 1 : -1);            
        }
        this.setState({
            data: sortedList,
            isAscending: !this.state.isAscending
        })
    }

    render() {
        return (
            <Col xs={7}>
                <Form>
                    <FormGroup>
                        <Label for="nationality">Nationalities</Label>
                        <Input type="select" name="nationality" id="nationality" onChange={(val) => this.onChangeNationality(val.target.value)}>
                            {this.state.nationalities.map((val, key) =>
                                <option key={key}>{val}</option>
                            )}
                        </Input>
                    </FormGroup>
                </Form>
                <ListGroup>
                    {this.state.data.map((val, index) =>
                        <ListGroupItem style={{ marginBottom: 15, background: "rgba(0,0,0,0.1)" }} key={val._id}>{val.firstName + " " + val.lastName + " (" + val.age + ")"}</ListGroupItem>
                    )}
                </ListGroup>
                <Button className="primary" style={{marginRight:15}} onClick={() => this.sortTheList()}>Sort</Button>
                <Button className="primary" onClick={() => this.getWholeList()}>Get Whole List</Button>
            </Col>
        )
    }
    
}