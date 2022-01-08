import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { login } from  '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function Signin
**/

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();


	const userLogin = (e) => {
		e.preventDefault();

		const user = {
			email, password
		}

		dispatch(login(user));
	}

    if(auth.authenticate){
        return <Redirect to={`/`} />
    }

  return(
    <Layout>
        <Container>
            <Row className="row justify-content-center my-5">
                <Col className="col-12 col-lg-5 border py-3 px-3">
                    <Form onSubmit={userLogin}>
                        <Input 
                            label="Email address"
                            type="email"
                            placeholder="example@domain.com"
                            errorMessage=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input 
                            label="Passsword"
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

export default Signin;