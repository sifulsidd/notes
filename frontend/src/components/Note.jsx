import React from "react";
import "../styles/Note.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Note({note, onDelete}){
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    const navigate = useNavigate();

    return <div className="note-container">
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <p className="note-date">{formattedDate}</p>
        <button className="edit-button" onClick={() => navigate(`/edit/${note.id}`)}>Edit</button>
        <button className="delete-button" onClick={()=> onDelete(note.id)}>Delete</button>
    </div>
}

export default Note;