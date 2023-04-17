package com.teado.teado.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import com.teado.teado.types.Status;

import java.util.ArrayList;

@Entity
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "reporter")
    private String reporter;

    @Column(name = "email")
    private String email;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Status status;

    @Column(name = "date")
    private String date;


    @Column(name = "keyvalue")
    private String key;



    @Column(name = "ticket_number")
    private String ticketNumber;

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    @Column(name = "project_name")
    private String projectName;



    public Ticket(){

    }
    public Ticket(String title, String reporter, String email, String description, String date, String key, String ticketNumber, String projectName){
        this.title =title;
        this.reporter=reporter;
        this.email=email;
        this.status = Status.OPEN;
        this.description=description;
        this.date = date;
        this.key = key;
        this.ticketNumber = ticketNumber;
        this.projectName=projectName;

    }

    public long getId() {
        return id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString(){
        return "Ticket [id="+ id + ", title="+title+", desc="+description+", email="+email+", reporter="+reporter+", date="+date+", key="+key+", ticketNumber="+ticketNumber;
    }
}
