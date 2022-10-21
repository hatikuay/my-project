import React, { FC, useState } from 'react';
import PersonalDetails from './PersonalDetails';
import { Container } from "reactstrap";
import { IPersonState } from './State';

const initialPerson: IPersonState = {
  FirstName: "",
  LastName: "",
  Address1: "",
  Address2: "",
  Town: "",
  County: "",
  PhoneNumber: "",
  Postcode: "",
  DateOfBirth: new Date().toISOString().substring(0, 10),
  PersonId: ""
}


const App: FC = () => {
  const [defaultPerson, setDefaultPerson] = useState<IPersonState>(initialPerson)
  
  return (
    <Container>
      <PersonalDetails DefaultState={defaultPerson}></PersonalDetails>
    </Container>
  );
}

export default App;
