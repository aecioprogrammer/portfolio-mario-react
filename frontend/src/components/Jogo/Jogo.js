import "./Jogo.css";
import nuvem from "../../assets/clouds.png";
import cano from "../../assets/pipe.png";
import mario from "../../assets/mario.gif";
import gameOver from "../../assets/game-over.png";
import { useState, useRef, useEffect } from "react";
//import React, { useState} from "react";

function Jogo() {
  /* const estaPulando = useState(false);
    const estado = estaPulando[0];
    const dispatch = estaPulando[1]; */

  // Usando a desconstrução de array

  const [estaPulando, setEstaPulando] = useState(false);
  const [estaMorto, setEstaMorto] = useState(false);
  const [pontos, setPontos] = useState(0);

  const marioRef = useRef();
  const canoRef = useRef();

  function canoAcertaMario() {
    //Acessar as referências
    const mario = marioRef.current;
    const cano = canoRef.current;

    //Se não encontrar mario ou cano encerra função

    if (!mario || !cano) {
      return;
    }

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
    //Varíavel que armazena se Mario acertou o cano
    const estaNocano = canoAcertaMario();

    //Se não estiver a função finaliza
    if (!estaNocano) {
      return;
    }

    //Caso esteja atualiza o estado 'estaMorto" para true
    setEstaMorto(true);

    // console.log("Cano acertou Mario!!!", valor);
  }, 100);

  //Quando estiver morto:
  // - Mudar imagem do Mario
  // - Pausar animações
  // - Salvar a pontuação

  //UseEffect Hook

  useEffect(
    function () {
      //Salvar Pontuação
      const interval = setInterval(function () {
        if (estaMorto) {
          return;
        }

        setPontos(pontos + 1);

        console.log({ pontos });
      }, 500);

      return () => clearInterval(interval);
    },
    [estaMorto, pontos]
  );

  //console.log({ estaMorto });

  document.onkeydown = () => {
    // let element = document.querySelector(".mario");
    // console.log(element);

    setEstaPulando(true);

    //parâmetro de tempo em milissegundos

    setTimeout(() => {
      setEstaPulando(false);
    }, 700);
  };

  let marioClassName = "mario";

  if (estaPulando) {
    marioClassName = "mario mario-pulo";
  }

  const marioImage = estaMorto ? gameOver : mario;

  const pararAnimacao = estaMorto ? "parar-animacao" : "";

  return (
    <div className="jogo">
      <img className="nuvens" src={nuvem} alt="Nuvens" />
      <img
        ref={canoRef}
        className={"cano " + pararAnimacao}
        src={cano}
        alt="cano"
      />
      {/* <img className="mario" src={mario} alt="Mario" /> */}
      <img
        ref={marioRef}
        className={marioClassName}
        src={marioImage}
        alt="Mario"
      />
      <div className="chao"></div>
    </div>
  );
}

export default Jogo;
