import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import TicketType from "../../../interfaces/TicketInterface";
function AddComment(props:{setCommentView:Function, ticket:TicketType, newComment:Function, dashboard?:boolean,setCommentAdded?:Function, commentAdded?:boolean}) {
    const setCommentView=props.setCommentView;
    const ticket=props.ticket;
    const ukey: string = uuid();
    const [ user, setUser]=useState("");
    const [title, setTitle]=useState("");
    const [ comment, setComment]=useState("");
    const setCommentAdded=props.setCommentAdded;
    const commentAdded=props.commentAdded;
    let ticketId: any = useParams();
    let commentTicket:any;
    
    console.log(ticketId)
    console.log(ticket)
    if(ticket!=undefined){
      commentTicket=ticket.ticketNumber
      console.log("pizza")
      console.log(commentTicket)
    }
    else if(Object.keys(ticketId).length>0){
      commentTicket=ticketId.ticketId;
    }
    else{
      commentTicket=null;
    }
    console.log(commentTicket)
    if(commentTicket!=undefined){
  return (
    <div className="commentContainerStyle">

<div className="commentTicketTitle">Add a Comment to Selected Ticket</div>
   {props.dashboard?<></>:<div onClick={()=>{setCommentView("")}}><Link to="">Back to Comments</Link></div>}

    <Form >
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
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter comment"
            value={comment}
            onChange={(e: any) => {
              setComment(e.target.value);
            }}
          /><Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={user}
            onChange={(e: any) => {
              setUser(e.target.value);
            }}
          />
         
        
        </Form.Group>
       
          {" "}
          <Button type="submit"
            onClick={(e) => {if(setCommentAdded!==undefined &&commentAdded!==undefined){setCommentAdded(!commentAdded);}
              setCommentView("");
            e.preventDefault();
              props.newComment({
                ticketNumber: ticket.ticketNumber,
                ticketId:ticket.key,
                keyValue: ukey,
              
                title: title,
             
                date: new Date(),
                comment: comment,
                user: user,
              });
              setTitle("");
              setComment("");
              setUser("");

            }}
          >
            Submit
          </Button>
       
      </Form>
</div>
  );}
  else{
    return(<>Please select a ticket to add a comment.</>)
  }
}

export default AddComment;
