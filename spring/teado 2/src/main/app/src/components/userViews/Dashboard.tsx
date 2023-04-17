import React,{useState,useEffect} from 'react';
import TicketType from '../../interfaces/TicketInterface';
import { Link } from 'react-router-dom';
import TicketQueueView from './TicketQueueView';
import AddTicket from './AddTicket';
import "../../styles/styles.css";
import { Container,Row,Col } from 'react-bootstrap';
import SingleTicketDashboard from './SingleTicketDashboard';
import AddComment from './commentViews/AddComment';
import commentApiCall from '../../apiCall/commentApiCall';
import Status from '../../interfaces/StatusEnum';
import { current } from '@reduxjs/toolkit';
import EditTicket from './EditTicket';

function Dashboard(props: {
    tickets: Array<TicketType>;
    setTickets: Function;
    newTicket:Function;
    updateStatus:Function;
    currentTicket:TicketType;
    setCurrentTicket:Function;
    ticketAdded:boolean;
    setTicketAdded:Function;
    editTicket:Function;
    deleteTicket:Function;
    isTicketEdited:boolean;
    setIsTicketEdited:Function;
    
  }){

 
   const tickets = props.tickets;
   const setTickets = props.setTickets;
   const newTicket = props.newTicket;
   const updateStatus = props.updateStatus;
  const currentTicket=props.currentTicket;
  const setCurrentTicket=props.setCurrentTicket;
  const [commentAdded,setCommentAdded]=useState(false);
  const [commentEdited,setCommentEdited]=useState(false);
 const ticketAdded=props.ticketAdded;
 const setTicketAdded=props.setTicketAdded;
 const editTicket=props.editTicket;
 const deleteTicket=props.deleteTicket;
 const [ticketView, setTicketView]=useState(true);
 const isTicketEdited=props.isTicketEdited;
 const setIsTicketEdited=props.setIsTicketEdited;

  return (
    <div className="dashboardContainerStyle">
       <div className="topPadding"></div>
      <Container><Row><Col>
<TicketQueueView tickets={tickets} setTickets={setTickets} setCurrentTicket={setCurrentTicket} currentTicket={currentTicket}/></Col></Row>
<Row>
  <Col xs={12} md={3}>
<AddTicket tickets ={tickets} newTicket={newTicket} ticketAdded={ticketAdded} setTicketAdded={setTicketAdded}/>

</Col>
<Col xs={12} md={6}>
{ticketView?
<SingleTicketDashboard setTicketView={setTicketView} updateStatus={updateStatus} tickets={tickets} setTickets={setTickets} currentTicket={currentTicket} commentAdded={commentAdded} setCommentAdded={setCommentAdded}  />
  :
<EditTicket
            setTickets={setTickets}
              updateStatus={updateStatus}
              editTicket={props.editTicket}
              tickets={tickets}
              deleteTicket={deleteTicket}
              currentTicket={currentTicket}
              setTicketView={setTicketView}
              isTicketEdited={isTicketEdited}
              setIsTicketEdited={setIsTicketEdited}
            />
          }  

</Col>
<Col xs={12} md={3}>


    <AddComment ticket={currentTicket} setCommentView={()=>{}} newComment={(comment:any)=>{commentApiCall((()=>{}),"/","POST",comment);}} dashboard={true} setCommentAdded={setCommentAdded} commentAdded={commentAdded}/>
 
    </Col>
 
    </Row>
    </Container>
    <div className="bottomPadding"></div>
  </div>
  )

}

export default Dashboard;
