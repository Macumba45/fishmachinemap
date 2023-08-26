// import React, { FC } from 'react'
// import styled from 'styled-components'
// import { useSession, signIn, signOut } from 'next-auth/react'

// interface Props {
//     onClick?: () => void
// }

// const GoogleButton = styled.button`
//     background-color: #fff;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     color: #333;
//     cursor: pointer;
//     font-size: 16px;
//     padding: 10px 20px;
//     display: flex;
//     align-items: center;
//     width: 250px;
//     height: 37.2px;
//     margin-top: 16px;
//     font-family: 'Roboto', sans-serif;

//     &:hover {
//         background-color: #f1f1f1;
//     }

//     &:focus {
//         outline: none;
//     }

//     .icon {
//         margin-right: 10px;
//     }
// `

// const GoogleIcon = () => (
//     <img
//         src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
//         style={{ marginRight: '10px' }}
//     />
// )

// const ContinueWithGoogleButton: FC<Props> = ({ onClick }) => {
//     return (
//         <GoogleButton onClick={onClick}>
//             <GoogleIcon />
//             Continúa con Google
//         </GoogleButton>
//     )
// }

// export default ContinueWithGoogleButton
