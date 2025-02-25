import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Home.css"

function EditPage(){
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    
    const [changedTitle, setChangedTitle] = useState(false);
    const [changedContent, setChangedContent] = useState(false);

    // just access the id first
    const {id} = useParams();

    const Navigate = useNavigate(); 


    useEffect(() => {
        api.get(`/api/notes/view/${id}/`)
        .then((res) => res.data)
        .then((data) => {
            setContent(data.content);
            setTitle(data.title);
        })
        .catch((err) => alert(err))
    }, []);

    const titleChange = (e) => {
        setTitle(e.target.value);
        setChangedTitle(true);
    }

    const contentChange = (e) => {
        setContent(e.target.value);
        setChangedContent(true);
    }


    const editNote = (e) => {
        e.preventDefault();
        api.put(`/api/notes/edit/${id}/`, {title, content})
        .then((res) => {
            if(res.status == 200){
                alert("Note has been updated");
            } else{
                alert("Failed to update note");
            }})
            .catch((err) => alert(err))
        
        Navigate("/");
    }

    return <div>
            <h2>Edit a Note</h2>
                <form onSubmit={editNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input type="text" 
                        id="title" 
                        name="title" 
                        required 
                        onChange={titleChange}
                        value={title}
                />

                <label htmlFor="content">Content:</label>
                <br />
                <textarea name="content" 
                        id="content"
                        required
                        value={content}
                        onChange={contentChange}>
                        </textarea>
                        <br />
                        <input type="submit" value="Submit" />
            </form>
        </div>
    
}

export default EditPage;