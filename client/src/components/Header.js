import React from 'react';
import { NavLink as A } from 'react-router-dom';
import {
    Navbar,  
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

const Header = () => {
    return (
        <Navbar color="dark" dark style={{ marginBottom: 15 }} expand="md">
            <NavbarBrand style={{ color: '#fff' }}>DESelect</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <A to="/home" style={{ color: '#fff' }}>Home Page</A>
                </NavItem>
                <NavItem>
                    <A to="/new" style={{ color: '#fff', marginLeft: 20 }}>New Student</A>
                </NavItem>
            </Nav>
        </Navbar>
    )
}

export {Header};