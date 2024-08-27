import React, { useState } from 'react';
   import axios from 'axios';
   import styled from 'styled-components';

   const Container = styled.div`
       background-color: #121212;
       color: #ffffff;
       min-height: 100vh;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       font-size: calc(10px + 2vmin);
   `;

   const Button = styled.button`
       background-color: #1f1f1f;
       color: #ffffff;
       border: none;
       padding: 10px 20px;
       margin: 5px;
       cursor: pointer;
       border-radius: 5px;

       &:hover {
           background-color: #333333;
       }
   `;

   function App() {
       const [response, setResponse] = useState(null);

       const fetchData = async (type) => {
           try {
               const res = await axios.get(`http://localhost:9876/numbers/${type}`);
               setResponse(res.data);
           } catch (error) {
               console.error('Error fetching data:', error);
           }
       };

       return (
           <Container>
               <h1>Average Calculator Microservice</h1>
               <div>
                   <Button onClick={() => fetchData('p')}>Fetch Primes</Button>
                   <Button onClick={() => fetchData('f')}>Fetch Fibonacci</Button>
                   <Button onClick={() => fetchData('e')}>Fetch Even</Button>
                   <Button onClick={() => fetchData('r')}>Fetch Random</Button>
               </div>
               {response && (
                   <div>
                       <h3>Previous Window State: {response.windowPrevState.join(', ')}</h3>
                       <h3>Current Window State: {response.windowCurrState.join(', ')}</h3>
                       <h3>Numbers Received: {response.numbers.join(', ')}</h3>
                       <h3>Average: {response.avg}</h3>
                   </div>
               )}
           </Container>
       );
   }

   export default App;
