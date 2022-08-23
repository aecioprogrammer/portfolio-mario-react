import "./Jogo.css";
import nuvem from "../../assets/clouds.png";
import cano from "../../assets/pipe.png";
import mario from "../../assets/mario.gif";
import { useState, useRef } from "react";
//import React, { useState} from "react";

function Jogo() {

    /* const estaPulando = useState(false);
    const estado = estaPulando[0];
    const dispatch = estaPulando[1]; */

   // Usando a desconstrução de array

    const [estaPulando, setEstaPulando] = useState(false);

    const marioRef = useRef();
    const canoRef = useRef();

    function canoAcertaMario() {
        //Acessar as referências
        const mario = marioRef.current;
        const cano = canoRef.current;
    

        //Se não encontrar mario ou cano encerra função

        // if (!mario || !cano) {
        //     return;
        // }

        //Lógica que deternmina se o cano acertou o Mario
        

        return (
            cano.offsetLeft > mario.offsetLeft &&
            cano.offsetLeft < mario.offsetLeft + mario.offsetWidth &&
            mario.offsetTop + mario.offsetHeight > cano.offsetTop
          );

    }

    // Implementação temporária para exibir se o mário está no cano
    // ou não
    setInterval(function () {
        const valor = canoAcertaMario();

        console.log("Cano acertou Mario!!!", valor);
    }, 100);

    document.onkeydown = () => {
        console.log("Clicou");
        // let element = document.querySelector(".mario");
        // console.log(element);

        setEstaPulando(true); 

        //parâmetro de tempo em milissegundos

        setTimeout(()=> {setEstaPulando(false)}, 700)
    }
 
    let marioClassName = "mario";

    if (estaPulando) {
        marioClassName = "mario mario-pulo";
    }     
       
    

    return <div className="jogo">
    <img className="nuvens" src={nuvem} alt="Nuvens" />
    <img ref={canoRef} className="cano" src={cano} alt="cano" />
    {/* <img className="mario" src={mario} alt="Mario" /> */}
    <img ref={marioRef} className={marioClassName} src={mario} alt="Mario" />
    <div className="chao"></div>
    </div>;
}

export default Jogo;