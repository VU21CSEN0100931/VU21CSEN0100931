const express = require('express');
   const axios = require('axios');

   const app = express();
   const port = 9876;

   let windowSize = 10;
   let windowNumbers = [];

   const fetchNumbers = async (url) => {
       try {
           const response = await axios.get(url, { timeout: 500 });
           return response.data.numbers;
       } catch (error) {
           return [];
       }
   };

   const isUnique = (num) => !windowNumbers.includes(num);

   const updateWindow = (newNumbers) => {
       newNumbers.forEach((num) => {
           if (isUnique(num)) {
               if (windowNumbers.length >= windowSize) {
                   windowNumbers.shift();
               }
               windowNumbers.push(num);
           }
       });
   };

   const calculateAverage = () => {
       if (windowNumbers.length === 0) return 0;
       const sum = windowNumbers.reduce((acc, curr) => acc + curr, 0);
       return (sum / windowNumbers.length).toFixed(2);
   };

   app.get('/numbers/:id', async (req, res) => {
       const { id } = req.params;
       let apiUrl = '';

       switch (id) {
           case 'p':
               apiUrl = 'http://20.244.56.144/test/primes';
               break;
           case 'f':
               apiUrl = 'http://20.244.56.144/test/fibonacci';
               break;
           case 'e':
               apiUrl = 'http://20.244.56.144/test/even';
               break;
           case 'r':
               apiUrl = 'http://20.244.56.144/test/random';
               break;
           default:
               return res.status(400).json({ error: 'Invalid ID' });
       }

       const windowPrevState = [...windowNumbers];
       const newNumbers = await fetchNumbers(apiUrl);
       updateWindow(newNumbers);
       const windowCurrState = [...windowNumbers];
       const average = calculateAverage();

       res.json({
           windowPrevState,
           windowCurrState,
           numbers: newNumbers,
           avg: average,
       });
   });

   app.listen(port, () => {
       console.log(`Server is running on http://localhost:${port}`);
   });
   
