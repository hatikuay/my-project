import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { IPersonState, IProps } from './State';


const PersonalDetails: FC<IProps> = ({ DefaultState }: IProps) => {
    const [Person, setPerson] = useState<IPersonState | any>(DefaultState)

    const onChangePerson = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setPerson((person: IPersonState) => ({...person, [name]: value}))
    }
    
    return (
        <Row>
            <Col lg="8">
                <Row>
                    <Col><h4 className='mb-3 mt-3'>Personal details</h4></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <label htmlFor='firstName'>First name</label> </Col>
                            <Col> <label htmlFor='lastName'>Last name</label> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <input value={Person.FirstName} onChange={onChangePerson} type="text" id="firstName" className='form-control' name="FirstName" placeholder='First name'></input> </Col>
                            <Col> <input value={Person.LastName} onChange={onChangePerson} type="text" id="lastName" className='form-control' name="LastName" placeholder='Last name'></input> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <label htmlFor='addr1'>Address line 1</label> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <input value={Person.Address1} onChange={onChangePerson} type="text" id="addr1" className='form-control' name="Address1" placeholder='Address line 1'></input> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <label htmlFor='addr2'>Address line 2</label> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <input value={Person.Address2} onChange={onChangePerson} type="text" id="addr2" className='form-control' name="Address2" placeholder='Address line 2'></input> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <label htmlFor='Town'>Town</label> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <input value={Person.Town} onChange={onChangePerson} type="text" id="town" className='form-control' name="Town" placeholder='Town'></input> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <label htmlFor='County'>County</label> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col> <input value={Person.County} onChange={onChangePerson} type="text" id="county" className='form-control' name="County" placeholder='County'></input> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col lg="3"> <label htmlFor='postCode'>Postal/ZipCode</label> </Col>
                            <Col lg="4"> <label htmlFor='phoneNumber'>Phone Number</label> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col lg="3"> <input value={Person.PostCode} onChange={onChangePerson} type="text" id="postCodee" className='form-control' name="PostCode" placeholder='Post Code'></input> </Col>
                            <Col lg="4"> <input value={Person.PhoneNumber} onChange={onChangePerson} type="text" id="phoneNumber" className='form-control' name="PhoneNumber" placeholder='Phone Number'></input> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col lg="3"> <label htmlFor='dateOfBirth'>Date of birth</label> </Col>
                        </Row>
                        <Row>
                            <Col lg="3"> <input value={Person.DateOfBirth} onChange={onChangePerson} className='form-control' type="date" id="dateOfBirth" name='DateOfBirth'></input> </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='mb-3 mt-3'>
                    <Col > <Button size='lg' color='primary'>Save</Button> </Col>
                    <Col > <Button size='lg' color='secondary'>Clear</Button></Col>
                </Row>
            </Col>
            <Col lg="4">
                <Row className='mb-3 mt-3'>
                    <Col > <Button size='lg' color='success'>Load</Button> </Col>
                    <Col > <Button size='lg' color='info'>New Person</Button></Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PersonalDetails;
