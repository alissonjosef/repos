import { Container, SubmitButton,Form } from "./styles";
import {FaGithub, FaPlus} from 'react-icons/fa'
import { useState } from "react";
import api from "../../server/api";

export function Main(){
    const [newRepo, setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState([])


   async function handleSubmit(event){
        event.preventDefault()

         const response = await api.get(`repos/${newRepo}`)

         const data = {
            name: response.data.full_name,
         }
         setRepositorios([...repositorios, data])
         setNewRepo('')

    }

    function handleInputChange(event){

        setNewRepo(event.target.value)

        
    }

    return(
        <Container>
            <h1>
                <FaGithub  size={25}/>
                Meus Repositores
            </h1>
                {newRepo}
            <Form onSubmit={handleSubmit}>
                <input value={newRepo} onChange={handleInputChange} type='text' placeholder="Adicionar Repodiotorios"/>

                <SubmitButton>
                    <FaPlus color="white" size={14}/>
                </SubmitButton>
            </Form>

        </Container>
    )
}