import React,{useEffect, useState} from "react";
import Status from "../../interfaces/StatusEnum";
import "../../styles/styles.css";
import TicketType from "../../interfaces/TicketInterface";
import { Form } from "react-bootstrap";
function StatusSelector(props: {
 
  updateStatus: Function;
  ticket:TicketType;
}) {

  const { ticket, updateStatus}=props;

  const [status,setStatus]=useState<Status>(ticket.status);

  useEffect(()=>{
console.log(ticket)
console.log(status)
    updateStatus(ticket, status);
   
  },[status,ticket])
  return (
    <>
      <div className="statusInput">
        <Form.Select
          aria-label="status selector"
          className="statusInput"
          value={status}
          onChange={(e: any) => {
            setStatus(e.target.value);
            updateStatus(ticket, e.target.value);
          }}
        >
          <option value={Status.OPEN}>Open</option>
          <option value={Status.READY}>Ready</option>
          <option value={Status.IN_PROGRESS}>In Progress</option>
          <option value={Status.CLOSED}>Closed</option>
        </Form.Select>
      </div>
    </>
  );
}

export default StatusSelector;
