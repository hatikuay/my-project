import React, { FC, useState, useEffect, useRef } from "react";
import { IValidationProps } from "./State";
import { AddressValidation } from "./Validation/AddressValidation";
import { IValidation } from "./Validation/IValidation";
import { PersonValidation } from "./Validation/PersonValidation";
import { PhoneValidation } from "./Validation/PhoneValidation";
import { Row, Col } from "reactstrap";


const FormValidation: FC<IValidationProps> = (props: IValidationProps) => {
    const failures = useRef<string[]>(new Array<string>);
    const [validations, setValidations] = useState<Array<IValidation>>(new Array<IValidation>);

    useEffect(() => {
        validations.push(new PersonValidation());
        validations.push(new AddressValidation());
        validations.push(new PhoneValidation());
    }, [])

    useEffect(() => {
        failures.current = []
        console.log("useEffect failures");
        validations.forEach(validation => {
            validation.Validate(props.CurrentState, failures.current);
        })
        props.CanSave(failures.current.length === 0)
    }, [props.CurrentState]);


    const errors = failures.current.map((failure) => {
        return (<Row key={failure}><Col><label>{failure}</label></Col></Row>)
    });
    return (<Col>{errors}</Col>)

}

export default FormValidation;