import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions';


/**
* @author
* @function Signup
**/

const Signup = (props) => {
    
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const userSignup = (e) => {
        e.preventDefault();

        const user = {
            firstName, lastName, email, password
        }
        
        dispatch(signup(user));
    } 

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    if(user.loading){
        return <p>Loading...!</p>
    }
    
    return (
        <Layout>
            <Container>
                <h4>{user.message}</h4>
                <Row className="row justify-content-center my-5">
                    <Col className="col-12 col-lg-5 border py-3 px-3">
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md="6">
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="Hiraj"
                                        errorMessage=""
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md="6">
                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Dey"
                                        errorMessage=""
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Input
                                label="Email address"
                                type="email"
                                placeholder="example@domain.com"
                                errorMessage=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="hd@1234"
                                errorMessage=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}

export default Signup;