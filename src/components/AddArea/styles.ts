import styled from "styled-components";


export const Container = styled.div`

    border: 1px solid #555;
    border-radius: 15px;
    padding: 10px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    background-color: rgba(170, 170, 226, .5);
    

    .image {
        margin-right: 5px;
    }

    input {
        border: 0px;
        background: transparent;
        outline: 0;
        color: #FFF;
        font-size: 18px;
        flex: 1;
    }

    ::placeholder {
        color: white; 
        opacity: 1; 
    }
    
    `;


