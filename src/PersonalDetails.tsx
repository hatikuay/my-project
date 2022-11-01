import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import FormValidation from './FormValidation';
import { IPersonState, IProps } from './State';
import { PersonRecord } from './Types';
import { Database } from './Database/Database';
import { PersonalDetailsTableBuilder } from './PersonalDetailsTableBuilder';
import { IRecordState, RecordState } from './RecordState';



const PersonalDetails: FC<IProps> = ({ DefaultState }: IProps) => {
    const [Person, setPerson] = useState<IPersonState | any>(DefaultState)
    const [people, setPeople] = useState<IPersonState[]>()
    const [canSave, setCanSave] = useState(false);
    const index = useRef(0);

    const tableBuilder: PersonalDetailsTableBuilder = new PersonalDetailsTableBuilder();
    const dataLayer: Database<PersonRecord> = new Database(tableBuilder.Build());

    const onChangePerson = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setPerson((person: IPersonState) => ({ ...person, [name]: value }))
    }

    const userCanSave = (hasErrors: boolean) => {
        setCanSave((canSave) => canSave = hasErrors);
    }

    const deleteRecord = (event: any) => {
        const person: string = event.target.value;
        DeletePerson(person)

    }

    async function DeletePerson(person: string) {
        const foundPerson = people?.find((element: IPersonState) => {
            return element.PersonId === person;
        })
        if (!foundPerson) {
            return;
        }
        const personState: IRecordState = new RecordState(true);
        personState.IsActive = false;
        const state: PersonRecord = { ...foundPerson, ...personState }
        await dataLayer.Update(state);
        loadPeople();
        clear();
    }

    const loadPeople = async () => {
        const people = new Array<PersonRecord>();
        await dataLayer.Read().then(people => {
            setPeople(people)
        })
    }

    const setActive = (event: any) => {
        if (people) {
            const person: string = event.target.value;
            const state = people?.find((element: IPersonState, index) => {
                return element.PersonId === person;
            });
            if (state) {
                index.current = people.indexOf(state);
                setPerson(state)
            }
        }
    }

    const getNextPerson = (event: any) => {
        if (people) {
            if (index.current + 1 === people?.length)
                index.current = 0;
            else
                index.current++;
            const state = people[index.current]
            if (state) {
                setPerson(state)
            }
        }
    }
    const getPreviousPerson = (event: any) => {
        if (people) {
            if (index.current === 0)
                index.current = people?.length - 1;
            else
                index.current--;
            const state = people[index.current]
            if (state) {
                setPerson(state)
            }
        }
    }

    const clear = () => {
        setPerson(DefaultState)
    }

    const savePerson = () => {
        /*if (!canSave) {
            alert("Cannot save this record with missing or incorrect items")
            return;
        }*/
        const personState: IRecordState = new RecordState(true);
        //personState.IsActive = true; 
        const state: PersonRecord = { ...Person, ...personState }
        if (state.PersonId === "") {
            state.PersonId = Date.now().toString();
            dataLayer.Create(state);
            loadPeople();
            clear();
        }
        else {
            dataLayer.Update(state).then(rsn => loadPeople());
        }

    }

    useEffect(() => {
        loadPeople()
    })

    let peopleJSX = null;
    if (people) {
        peopleJSX = people.map((p) => {
            return (
                <Row className='mb-3 mt-3' key={p.PersonId}>
                    <Col lg="6"> <label>{p.FirstName} {p.LastName}</label></Col>
                    <Col lg="3"> <Button value={p.PersonId} color="primary" onClick={setActive}>Edit</Button></Col>
                    <Col lg="3"> <Button value={p.PersonId} color="primary" onClick={deleteRecord}>Delete</Button></Col>
                </Row>
            )
        })
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
                <Row className='mb-3 mt-3 border'>
                    <Col > <Button size='lg' color='primary' onClick={getPreviousPerson}><i className="bi bi-arrow-left-circle-fill"></i> Previous</Button> </Col>
                    <Col > <Button size='lg' color='primary' onClick={getNextPerson}>Next <i className="bi bi-arrow-right-circle-fill"></i></Button></Col>
                </Row>
                <Row className='mb-3 mt-3'>
                    <Col > <Button size='lg' color='primary' onClick={savePerson}>Save</Button> </Col>
                    <Col > <Button size='lg' color='secondary' onClick={clear}>Clear</Button></Col>
                </Row>
                <Row>
                    <FormValidation CurrentState={Person} CanSave={userCanSave}></FormValidation>
                </Row>
            </Col>
            <Col lg="4">
                <Row>
                    <Col>{peopleJSX}</Col>
                </Row>
                <Row className='mb-3 mt-3'>
                    <Col > <Button size='lg' color='success' onClick={loadPeople}>Load</Button> </Col>
                    <Col > <Button size='lg' color='info' onClick={clear}>New Person</Button></Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PersonalDetails;
