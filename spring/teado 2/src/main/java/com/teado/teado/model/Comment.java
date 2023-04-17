package com.teado.teado.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.*;


@Entity
@Table(name = "comments")
public class Comment {


    public Comment() {
    }

    public Comment(String title, String user, String comment, String date, String ticketNumber, String keyValue, String ticketId){
        this.title =title;
        this.user=user;
        this.comment=comment;
        this.date = date;
        this.ticketNumber = ticketNumber;
        this.ticketId = ticketId;
        this.keyValue=keyValue;

    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public String getKeyValue() {
        return keyValue;
    }

    public void setKeyValue(String keyValue) {
        this.keyValue = keyValue;
    }

    @Column(name = "keyValue")
    private String keyValue;
    @Column(name = "comment")
    private String comment;
    @Column(name = "ticketNumber")
    private String ticketNumber;

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    @Column(name="ticketId")
    private String ticketId;



    @Column(name = "title")
    private String title;
    @Column(name = "user")
    private String user;
    @Column(name = "date")
    private String date;



    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public void setDate(String date) {
        this.date = date;
    }



    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void Date(String date) {
        this.date = date;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isPresent() {
       return true;
    }
}
