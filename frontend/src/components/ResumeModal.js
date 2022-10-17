import React from 'react';
import './ResumeModal.css';

import { Button, Modal } from 'react-bootstrap';

const ResumeModal = props => {
    const linkToResume = `http://95.216.88.188:8000/resumes/${props.resumePath}`
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>email: {props.email}</p>
                <p>Mobile No: {props.mobile}</p>
                <p>Experience: {props.experience}</p>
                <p>College: {props.college}</p>
                <p>Company: {props.company}</p>
                <p>Degree: {props.degree}</p>
                <p>Designation: {props.designation}</p>
                <div>
                    <a href={linkToResume} className="btn resume-btn">View Resume</a>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ResumeModal;
