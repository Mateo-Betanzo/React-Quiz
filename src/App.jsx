import './styles/App.css';
import confetti from 'canvas-confetti';
import { Btn } from './components/Btn';
import { Display } from './components/Display';
import { Final } from './components/Final'
import { useState } from 'react';
import imgArirang from './assets/Arirang.png'

// Preguntas a realizar.
const preguntas = [
  {
    pregunta: '¿En qué fecha exacta debutó BTS?',
    opciones: ['13 de junio de 2013', '15 de mayo de 2014', '10 de agosto de 2012'],
    respuesta_correcta: '13 de junio de 2013'
  },
  {
    pregunta: '¿Cuál fue el nombre del primer álbum de BTS?',
    opciones: ['2 Cool 4 Skool', 'O!RUL8,2?', 'Dark & Wild'],
    respuesta_correcta: '2 Cool 4 Skool'
  },
  {
    pregunta: '¿Quién fue el último miembro en unirse al grupo?',
    opciones: ['Jungkook', 'Jimin', 'V'],
    respuesta_correcta: 'Jimin'
  },
  {
    pregunta: '¿En qué ciudad de Corea del Sur se originó BTS?',
    opciones: ['Seúl', 'Busan', 'Daegu'],
    respuesta_correcta: 'Seúl'
  },
  {
    pregunta: '¿Qué significa “Bangtan Sonyeondan”?',
    opciones: ['Chicos a prueba de balas', 'Estrellas juveniles', 'Grupo musical coreano'],
    respuesta_correcta: 'Chicos a prueba de balas'
  },
  {
    pregunta: '¿Cuál fue la primera canción de BTS en alcanzar el #1 en Billboard Hot 100?',
    opciones: ['Dynamite', 'Butter', 'Boy With Luv'],
    respuesta_correcta: 'Dynamite'
  },
  {
    pregunta: '¿Qué integrante participó en producciones musicales antes del debut?',
    opciones: ['Suga', 'Jin', 'V'],
    respuesta_correcta: 'Suga'
  },
  {
    pregunta: '¿Cuál es el nombre del reality show pre-debut de BTS?',
    opciones: ['Rookie King', 'American Hustle Life', 'Run BTS'],
    respuesta_correcta: 'Rookie King'
  },
  {
    pregunta: '¿Qué miembro es conocido como “Golden Maknae”?',
    opciones: ['Jungkook', 'Jimin', 'V'],
    respuesta_correcta: 'Jungkook'
  },
  {
    pregunta: '¿En qué año BTS ganó su primer premio internacional importante?',
    opciones: ['2017', '2015', '2018'],
    respuesta_correcta: '2017'
  },
  {
    pregunta: '¿Con qué artista internacional colaboraron en “My Universe”?',
    opciones: ['Coldplay', 'Halsey', 'Ed Sheeran'],
    respuesta_correcta: 'Coldplay'
  },
  {
    pregunta: '¿Qué integrante tiene el IQ más alto del grupo?',
    opciones: ['RM', 'Suga', 'J-Hope'],
    respuesta_correcta: 'RM'
  },
  {
    pregunta: '¿Cuál es el nombre completo de RM?',
    opciones: ['Kim Namjoon', 'Kim Seok-jin', 'Min Yoongi'],
    respuesta_correcta: 'Kim Namjoon'
  },
  {
    pregunta: '¿Qué miembro fue descubierto mientras bajaba de un colectivo?',
    opciones: ['V', 'Jimin', 'Jungkook'],
    respuesta_correcta: 'V'
  },
  {
    pregunta: '¿Cuál fue el primer logro histórico de BTS en premios estadounidenses?',
    opciones: [
      'Ganar un Billboard Music Award',
      'Ganar un Grammy',
      'Actuar en el Super Bowl'
    ],
    respuesta_correcta: 'Ganar un Billboard Music Award'
  }
];

let contWin = 0;
let contTotal = 0;

export default function App() {
  // ESTADO 1: ¿Qué respuesta eligió el usuario?
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  
  // ESTADO 2: ¿En qué pregunta estamos? Empezamos en la 0.
  const [indicePregunta, setIndicePregunta] = useState(0);

  // DERIVADOS: 
  // Evaluamos si el juego terminó (si el índice es igual o mayor a la cantidad de preguntas)
  const juegoTerminado = indicePregunta >= preguntas.length;

  const resetGame = () => {
    setIndicePregunta(0);
    contWin = 0;
    contTotal = 0;
  }

  // Si el juego terminó, mostramos una pantalla final para que la app no se rompa
  if (juegoTerminado) {
    return (
      <div className="container">
        <Final 
          onClick={() => resetGame()}
          win={contWin}
          total={contTotal}
          img={imgArirang}
        />
      </div>
    );
  }

  // Variables dinámicas que cambian según el índice actual
  const preguntaActual = preguntas[indicePregunta];
  const yaRespondio = respuestaSeleccionada !== null;

  const handleClick = (opcionElegida) => {
    if (yaRespondio) return;

    contTotal += 1;

    // 1. Guardamos la respuesta y pintamos los botones
    setRespuestaSeleccionada(opcionElegida);

    // 2. Tiramos confeti si es correcta
    if (opcionElegida === preguntaActual.respuesta_correcta) {
      contWin += 1;
      confetti();
    }

    // 3. LA MAGIA DEL DELAY: Esperamos 2000 milisegundos (2 segundos)
    setTimeout(() => {
      setRespuestaSeleccionada(null); // Limpiamos los colores de los botones
      setIndicePregunta((prevIndice) => prevIndice + 1); // Pasamos a la siguiente pregunta
    }, 1500); 
  };

  const obtenerClaseBoton = (opcion) => {
    if (!yaRespondio) return '';

    if (opcion === preguntaActual.respuesta_correcta) {
      return 'btn-normal-good'; 
    }

    if (opcion === respuestaSeleccionada) {
      return 'btn-normal-bad'; 
    }

    return ''; 
  };

  return (
    <div className='container'>

      <section className='imgen'>
        <img src={imgArirang} alt="foto" />
      </section>

      <section className='container'>
        <Display pregunta={preguntaActual.pregunta} />
      </section>

      <section className="container">
        {preguntaActual.opciones.map((opcion) => (
          <Btn
            key={opcion}
            texto={opcion}
            style={obtenerClaseBoton(opcion)} 
            onClick={() => handleClick(opcion)}
            disabled={yaRespondio} 
          />
        ))}
      </section>
    </div>
  );
}