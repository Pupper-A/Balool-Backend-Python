import {useState, useEffect} from "react";
import axios from "axios";

function SignUp() {
    const [signUpForm , setSignUpForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        image: ""
    })
    async function addUser(event){
         await axios({
            method: "POST",
            url:"/api/signup/",
            data:{
                first_name: signUpForm.first_name,
                last_name: signUpForm.last_name,
                username: signUpForm.username,
                email: signUpForm.email,
                password: signUpForm.password,
                avatar: signUpForm.image,
                is_superuser: 0,
                is_staff: 0,
                is_active: 0,
            },
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })

        console.log(signUpForm.image.name)
        setSignUpForm((
            {
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: "",
                image: ""
            }
        ))

        event.preventDefault()
        
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setSignUpForm(prevNote => ({
            ...prevNote, [name]: value})
        )
    }

    const handleImageChange = (e) => {
        let newForm = { ...signUpForm };
        newForm["image"] = e.target.files[0];
        setSignUpForm(newForm);
    };

    return (
        <form action="post" encType="multipart/form-data">
            <input onChange={handleChange} type="text" placeholder="first name" name="first_name" value={signUpForm.first_name} /><br />
            <input onChange={handleChange} type="text" placeholder="last name" name="last_name" value={signUpForm.last_name} /><br />
            <input onChange={handleChange} type="text" placeholder="username" name="username" value={signUpForm.username} /><br />
            <input onChange={handleChange} type="email" placeholder="email" name="email" value={signUpForm.email} /><br />
            <input onChange={(e) => {handleImageChange(e);}} type="file" name="image"/><br />
            <input onChange={handleChange} type="password" placeholder="password" name="password" value={signUpForm.password} /><br />
            <button onClick={addUser}>Sign Up</button>
        </form>
    );
    }
export default SignUp;