import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import TicketType from "../../interfaces/TicketInterface";
import uuid from "react-uuid";

function AddTicket(props: { newTicket: Function; tickets: Array<TicketType>; ticketAdded?:boolean; setTicketAdded?:Function; }) {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [reporter, setReporter] = useState("");
  const [projectName, setProjectName] = useState("");
  const [submitTimeout, setSubmitTimeout] = useState(false);
  const ukey: string = uuid();
  const ticketAdded = props.ticketAdded;
  const setTicketAdded=props.setTicketAdded;
  const tickets = props.tickets;
  let prevTicketNum;
  if(tickets.length>0){
prevTicketNum=tickets[tickets.length-1].ticketNumber?tickets[tickets.length-1].ticketNumber:1;

  }
else
  prevTicketNum=0;
const prevTicketNumInt:number= +prevTicketNum;
const newTicketNum = prevTicketNumInt + 1;
const ticketNumber=newTicketNum.toString(); 

return (
    <div className="addTicketDashboardOrder">
      <div className="addTicketTitle">Add a New Ticket</div>
      <Form>
        <Form.Group className="mb-3" controlId="formTicket">
        <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
          /><Form.Label>Reporter</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter reporter"
            value={reporter}
            onChange={(e: any) => {
              setReporter(e.target.value);
            }}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
             <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e: any) => {
              setProjectName(e.target.value);
            }}
          />
        </Form.Group>
        <Link to="/">
          {" "}
          <Button type="submit"
          disabled={submitTimeout}
            onClick={() => {
              setSubmitTimeout(true);
              setTimeout(()=>{
                  if(setTicketAdded!==undefined&& ticketAdded!==undefined){setTicketAdded(!ticketAdded);}
                setSubmitTimeout(false)},5000)
              props.newTicket({
                ticketNumber: ticketNumber,
                key: ukey,
                email: email,
                title: title,
                status: "OPEN",
                date: new Date(),
                description: description,
                reporter: reporter,
                projectName:projectName
              });
            }}
          >
            Submit
          </Button>
        </Link>
      </Form>
    </div>
  );
}
export default AddTicket;
