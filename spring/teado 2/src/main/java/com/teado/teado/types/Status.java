package com.teado.teado.types;

public enum Status {
    // This will call enum constructor with one
// String argument
    OPEN("TO BREW"), READY("READY"),IN_PROGRESS("BREWING"), CLOSED("BREWED");


    // declaring private variable for getting values
    private String action;

    public void setAction(String action) {
        this.action = action;
    }

    // getter method
    public String getAction()     {
        return this.action;
    }
    // enum constructor - cannot be public or protected
    private Status(String action)     {
        this.action = action;
    } }
