import React from "react";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import TicketType from "../../interfaces/TicketInterface";
import StatusSelector from "./StatusSelector";
import Status from "../../interfaces/StatusEnum";

import apiCall from "../../apiCall/ticketApiCall";

function EditTicket(props: {
  updateStatus: Function;
  deleteTicket: Function;
  editTicket: Function;
  tickets: Array<TicketType>;
  setTickets: Function;
  currentTicket?: TicketType;
  setTicketView?:Function;
  isTicketEdited:boolean;
  setIsTicketEdited:Function;
}) {
  let ticketId: any = useParams();
  console.log(Object.keys(ticketId).length)
 
  let currentTicket:any=props.currentTicket;
  if(Object.keys(ticketId).length===0&&currentTicket){
	ticketId.ticketId=currentTicket.ticketNumber;
  }
  const setTicketView=props.setTicketView;
  const tickets = props.tickets;
  const updateStatus = props.updateStatus;
  const setTickets = props.setTickets;
  const isTicketEdited = props.isTicketEdited;
  const setIsTicketEdited=props.setIsTicketEdited;
  let ticket = tickets.find(
    (element) => element.ticketNumber === ticketId.ticketId
  );
  // useEffect(() => {
  //   apiCall(setTickets);

  // }, [setTickets])
  if (ticket === undefined) {
    throw new TypeError("The value was promised to always be there!");
  }
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [status, setStatus] = useState(ticket.status);

  if (ticket) {
    return (
      <div className="editTicketDiv">
        <Link
         to='#'
        //  to={`/view/${ticket.ticketNumber}`} 
         onClick={()=>{if(setTicketView){setTicketView(true)}}}>Back to Ticket</Link>
        <Form>
          <Form.Group className="mb-3" controlId="formTicket">
            <Form.Label>Ticket Title
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange=
	      { (e: any) => 
	      	 {
                 setTitle(e.target.value);
             	 }
	      }
            /></Form.Label>
            <Form.Label>Comment
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            /></Form.Label>

<div className="statusInput">
<Form.Label>Status
        <Form.Select
          aria-label="status selector"
          className="statusInput"
          value={status}
          onChange={(e: any) => {
            setStatus(e.target.value);
          
          }}
        >
          <option value={Status.OPEN}>Open</option>
          <option value={Status.READY}>Ready</option>
          <option value={Status.IN_PROGRESS}>In Progress</option>
          <option value={Status.CLOSED}>Closed</option>
        </Form.Select>
        </Form.Label>
      </div>
    
          </Form.Group>
          <Link to={`/view/${ticket.ticketNumber}`}>
            <Button
              onClick={() => {
              
                if (ticket) {

                  props.editTicket({
                    ticketNumber: ticket.ticketNumber,
                    title: title,
                    status: status,
                    email: ticket.email,
                    date: new Date(),
                    reporter: ticket.reporter,
                    description: description,
                  });
                } 
               setIsTicketEdited(!isTicketEdited);  
                if(setTicketView)setTicketView(true);
              
              }}
            >
              Submit
            </Button>
          </Link>

          <Link to={`/`}>
            <Button
              className="warning"
              onClick={() => {
                if (ticket) {
                  props.deleteTicket(ticket);
                  setIsTicketEdited(!isTicketEdited);  
                  if(setTicketView)setTicketView(true);
                }
              }}
            >
              Delete
            </Button>
          </Link>
        </Form>
      </div>
    );
  } else {
    return <div>No Ticket found, please try again. ERROR: EditTicket.tsx</div>;
  }
}

export default EditTicket;
