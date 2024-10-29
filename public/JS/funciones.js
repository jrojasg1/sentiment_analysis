// Copyright 2023 desar
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const analyzerResult = async (text) => {
    try {
        const API_KEY = 'sk-gyi9x4iWB8O3uhiuF_7zLNZxsUZJBg-kCpCGpLXnegT3BlbkFJFD-0SShjvf2IVHthK3zLvaH1vGrTo3ffoRYJrkYNcA'; // Reemplaza con tu clave de API

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', 
                messages: [
                    { role: 'user', content: `Analiza el sentimiento del siguiente texto y responde solo con 'neutro', 'positivo' o 'negativo':  ${text}` }
                ],
                temperature: 0.5, 
            }),
        });
        const data = await response.json();
        let sentiment = data.choices[0].message.content;

        const contenedor = document.getElementById('sentiment');
        const span = document.createElement('span');
        let styleSentiment = 'badge-neutral';

        if(sentiment.toLowerCase().includes("negativo")){
            sentiment = 'negativo';
            styleSentiment = 'badge-negative'
        }else if(sentiment.toLowerCase().includes("positivo")){
            sentiment = 'positivo';
            styleSentiment = 'badge-positive';
        };
        span.textContent = ` ${sentiment}`;
        span.classList.add('badge', styleSentiment);
        contenedor.appendChild(span); 
        return data.choices[0].message.content;;
        
    } catch (error) {
        console.log(error);
    }
}
const showComments = async (text) => {
    const contenedor = document.getElementById('contenedor-datos');
    const p = document.createElement('p');
    p.textContent = text;
    contenedor.appendChild(p);
};

const showDeals = async (id_contact) => {
    try {
        let allDeals = await searchRecord("Deals", "(Contact_Name.id:equals:" + id_contact + ")");
        let deals = allDeals.data;
        let tablaOportunidades = document.getElementById('deals-description');
        let fragment = document.createDocumentFragment(); // Crear un fragmento para mejorar el rendimiento
        deals.forEach((deal, index) => {
            let fila = document.createElement('tr'); // Crear una nueva fila

            let celdaIndice = crearCelda('th', index + 1); // Añadir 1 al índice para que empiece desde 1
            let celdaNombreOportunidad = crearCelda('td', deal.Deal_Name);
            let celdaEtapaOportunidad = crearCelda('td', deal.Stage);
            let celdaFechaOportunidad = crearCelda('td', formatearFecha(deal.Created_Time));
            let celdaPropietarioOportunidad = crearCelda('td', deal.Owner.name);

            fila.appendChild(celdaIndice);
            fila.appendChild(celdaNombreOportunidad);
            fila.appendChild(celdaEtapaOportunidad);
            fila.appendChild(celdaFechaOportunidad);
            fila.appendChild(celdaPropietarioOportunidad);

            fragment.appendChild(fila);
            console.log(`Contact deal ${index + 1}:`, deal);
        });

        tablaOportunidades.appendChild(fragment);
    } catch (error) {
        console.log(error);
    }
}



