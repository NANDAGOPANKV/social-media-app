import React from "react";
// form validators
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// form submit to database
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";

// userSignup Data import
import { useAuthState } from 'react-firebase-hooks/auth'

// css
import '../../styles/CreateForm.css'

// useNavigate
import { useNavigate } from 'react-router-dom'

// typeScript interface

interface CreateFormData {
  title: string;
  description: string;
}

export default function Createform() {
  // useNavigate
  const NavigateTo = useNavigate()
  // userSignup Data using
  const [user] = useAuthState(auth)

  // schema
  const schema = yup.object().shape({
    title: yup.string().required("You Must Need to Fill Title"),
    description: yup
      .string()
      .min(4)
      .max(120)
      .required("You Must Need to Fill Description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const handlePostSubmit = async (data: CreateFormData) => {
    console.log(data);
    await addDoc(postRef, {
      ...data,
      userName: user?.displayName,
      UserId: user?.uid
    });
    console.log('DB Recived');
    NavigateTo('/')
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <input placeholder="Title..." {...register("title")} />
        {errors.title ? (
          <p style={{ color: "red" }}>{errors.title.message}</p>
        ) : (
          ""
        )}
        <textarea placeholder="Description..." {...register("description")} />
        {errors.description ? (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        ) : (
          ""
        )}
        <input type="submit" className="submitForm" />
      </form>
    </div>
  );
}
