
let vida_partida = null;
let ammoMax = null;
let quant_bala_carregada = null;
let quant_bala_descarregada = null;
let ordem_das_balas = [];
let vez_jogador = 1;
let vida_jogador_1 = null;
let vida_jogador_2 = null;
let ordem_das_balas_tiro = [];
let jogador_que_ganhou = null;
let modo_de_jogo = "outro_jogador";
let jogador_1_tem_carga_explosiva = false;
let jogador_2_tem_carga_explosiva = false;
let jogador_1_tem_cura_basica = false;
let jogador_2_tem_cura_basica = false;
let jogador_1_tem_revelar_bala = false;
let jogador_2_tem_revelar_bala = false;
let dano_arma_na_rodada = 1;
let chance_de_jogada_bot = 0;
let jogoAcabou = false;

// TODO: esta parte do codigo inteira se refere aos acontecimentos de quando se clica no botão jogar com outra pessoa
function jogar_com_outra_pessoa() {
    modo_de_jogo = "outro_jogador";
    document.getElementById("iniciar_partida_contra_outro_jogador").style.display = "inline-block";
    document.getElementById("id_jogar_contra_bot").style.display = "none";
    document.getElementById("id_jogar_contra_outra_pessoa").style.display = "none";
}


//if(modo_de_jogo === "outro_jogador"){

function inicio_partida_jogador() {
    jogoAcabou = false;
    vez_jogador = 1;
    if (modo_de_jogo != "outro_jogador") { return; }
    limpar_dialogos_inuteis_ao_atirar();

    limpar_alterações();
    mostrar_elementos();
    criar_intens();
    aparecer_iten_para_jogador_expecifico();
    ordem_das_balas = [];
    ammoMax = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
    vida_partida = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    document.getElementById("quantidade_vida").textContent = "A quantidade de vida neste partida é: " + vida_partida;
    quant_bala_carregada = Math.floor(Math.random() * ((ammoMax - 2) - 2 + 1)) + 2;
    quant_bala_descarregada = ammoMax - quant_bala_carregada;

    embaralhar_municao(ammoMax, quant_bala_carregada, quant_bala_descarregada);

    document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
    document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_partida;
    vida_jogador_1 = vida_partida;
    document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_partida;
    vida_jogador_2 = vida_partida;
    document.getElementById("informacoes_carregamento").innerHTML = "<br>Balas carregadas: " + quant_bala_carregada + "<br>Balas descarregadas: " + quant_bala_descarregada;

}


function atirar() {
    if (modo_de_jogo === "outro_jogador") {//? esta parte serve funciona somente com o modo de jogo de um jogador, porem o botão sera reutilizado
        aparecer_iten_para_jogador_expecifico();
        limpar_dialogos_inuteis_ao_atirar();
        console.log(ordem_das_balas);
        document.getElementById("informacoes_carregamento").innerHTML = "";
        if (vida_jogador_1 <= 0) {
            jogador_ganhou(1);
            return;
        } else if (vida_jogador_2 <= 0) {
            jogador_ganhou(2);
            return;
        }


        if (ordem_das_balas[0] === 1) {


            if (vez_jogador === 1 && vida_jogador_2 > 0) {

                vida_jogador_2 -= dano_arma_na_rodada;

                ordem_das_balas.shift();
                document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_jogador_2;
                document.getElementById("dano_players").innerHTML = "Jogador 2 Levou um tiro!<br>Vez do jogador 2.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 2;
                reverter_efeito_de_itens();
                aparecer_iten_para_jogador_expecifico();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
                if (ordem_das_balas.length <= 0) {
                    aut_inicio_partida();
                    document.getElementById("aut_recarga").innerHTML = "As balas foram recarregadas!!!";
                }
                vida_jogador_1 -= dano_arma_na_rodada;
                ordem_das_balas.shift();
                document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
                document.getElementById("dano_players").innerHTML = "Jogador 1 Levou um tiro!<br>Vez do jogador 1.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 1;
                reverter_efeito_de_itens();
                aparecer_iten_para_jogador_expecifico();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            }
        }
        else
            if (ordem_das_balas[0] === 0) {
                if (vez_jogador === 1 && vida_jogador_2 > 0) {
                    ordem_das_balas.shift();
                    document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Vez do jogador 2.";
                    vez_jogador = 2;
                    reverter_efeito_de_itens();
                    aparecer_iten_para_jogador_expecifico();
                    document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                    if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
                } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
                    ordem_das_balas.shift();
                    document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Vez do jogador 1.";
                    vez_jogador = 1;
                    reverter_efeito_de_itens();
                    aparecer_iten_para_jogador_expecifico();
                    document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                    if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
                }
            }
    }
    else if (modo_de_jogo === "contra_bot") {

        aparecer_iten_para_jogador_expecifico();
        limpar_dialogos_inuteis_ao_atirar();
        console.log(ordem_das_balas);
        document.getElementById("informacoes_carregamento").innerHTML = "";
        if (vida_jogador_1 <= 0) {
            jogador_ganhou(1);
            return;
        } else if (vida_jogador_2 <= 0) {
            jogador_ganhou(2);
            return;
        }


        if (ordem_das_balas[0] === 1) {


            if (vez_jogador === 1 && vida_jogador_2 > 0) {

                vida_jogador_2 -= dano_arma_na_rodada;

                ordem_das_balas.shift();
                document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_jogador_2;
                document.getElementById("dano_players").innerHTML = "Jogador 2 Levou um tiro!<br>Vez do jogador 2.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 2;
                reverter_efeito_de_itens();
                aparecer_iten_para_jogador_expecifico();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas

            }
        } else if (ordem_das_balas[0] === 0) {

            if (vez_jogador === 1 && vida_jogador_2 > 0) {
                ordem_das_balas.shift();
                document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Vez do jogador 2.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 2;
                reverter_efeito_de_itens();
                aparecer_iten_para_jogador_expecifico();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            }
        }
        console.log(ordem_das_balas + " antes do bot jogar");
        controle_bot(); //aqui é a função que chama o controle do bot para que ela funcione de maneira correta
        console.log(ordem_das_balas + " depois do bot jogar"); //o controle de bot vai ser sempre chamado porem só vai ser executado se a vez do jogador for 2 (ou seja a do BOT)
    }
}
function atirar_em_si_mesmo() {
    if (modo_de_jogo === "outro_jogador") { //? esta parte serve funciona somente com o modo de jogo de um jogador, porem o botão sera reutilizado
        aparecer_iten_para_jogador_expecifico();
        limpar_dialogos_inuteis_ao_atirar();


        document.getElementById("informacoes_carregamento").innerHTML = "";
        if (ordem_das_balas[0] === 1) {

            if (vez_jogador === 1 && vida_jogador_2 > 0) {

                vida_jogador_1 -= dano_arma_na_rodada;
                ordem_das_balas.shift();
                document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
                document.getElementById("dano_players").innerHTML = "Jogador 1 deu um tiro em si mesmo!<br>Vez do jogador 2.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 2;
                reverter_efeito_de_itens();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas

            } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
                vida_jogador_2 -= dano_arma_na_rodada;

                ordem_das_balas.shift();
                document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_jogador_2;
                document.getElementById("dano_players").innerHTML = "Jogador 2 deu um tiro em si mesmo!<br>Vez do jogador 1.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 1;
                reverter_efeito_de_itens();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            }
        } else if (ordem_das_balas[0] === 0) {

            if (vez_jogador === 1 && vida_jogador_2 > 0) {
                ordem_das_balas.shift();
                document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Jogador 1 continua jogando.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 1;
                reverter_efeito_de_itens();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
                ordem_das_balas.shift();
                document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Jogador 2 continua jogando.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 2;
                reverter_efeito_de_itens();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            }
        }
    }
    if (modo_de_jogo === "contra_bot") { //? modo contra bot 

        aparecer_iten_para_jogador_expecifico();
        limpar_dialogos_inuteis_ao_atirar();


        document.getElementById("informacoes_carregamento").innerHTML = "";
        if (ordem_das_balas[0] === 1) {

            if (vez_jogador === 1 && vida_jogador_2 > 0) {

                vida_jogador_1 -= dano_arma_na_rodada;
                ordem_das_balas.shift();
                document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
                document.getElementById("dano_players").innerHTML = "Jogador 1 deu um tiro em si mesmo!<br>Vez do jogador 2.";
                jogador_ganhou(vez_jogador);
                vez_jogador = 2;
                reverter_efeito_de_itens();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas

            }
        } else if (ordem_das_balas[0] === 0) {

            if (vez_jogador === 1 && vida_jogador_2 > 0) {
                ordem_das_balas.shift();
                document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Jogador 1 continua jogando.";
                vez_jogador = 1;
                reverter_efeito_de_itens();
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            }
        }
    }
    controle_bot(); //aqui é a função que chama o controle do bot para que ela funcione de maneira correta
}



{ // TODO: esta parte do codigo inteira se refere aos acontecimentos de quandp se clica no botão jogar contra um BOT

    function jogar_contra_bot() {
        modo_de_jogo = "contra_bot";
        document.getElementById("iniciar_partida_contra_bot").style.display = "inline-block";
        document.getElementById("id_jogar_contra_bot").style.display = "none";
        document.getElementById("id_jogar_contra_outra_pessoa").style.display = "none";
    }


    //if(modo_de_jogo === "contra_bot"){

    function inicio_partida_bot() {
        jogoAcabou = false;
        if (modo_de_jogo != "contra_bot") { return; }
        limpar_dialogos_inuteis_ao_atirar();

        limpar_alterações();
        mostrar_elementos();
        criar_intens();
        aparecer_iten_para_jogador_expecifico();
        ordem_das_balas = [];
        ammoMax = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
        vida_partida = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
        document.getElementById("quantidade_vida").textContent = "A quantidade de vida neste partida é: " + vida_partida;
        quant_bala_carregada = Math.floor(Math.random() * ((ammoMax - 2) - 2 + 1)) + 2;
        quant_bala_descarregada = ammoMax - quant_bala_carregada;

        embaralhar_municao(ammoMax, quant_bala_carregada, quant_bala_descarregada);

        document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
        document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_partida;
        vida_jogador_1 = vida_partida;
        document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_partida;
        vida_jogador_2 = vida_partida;
        document.getElementById("informacoes_carregamento").innerHTML = "<br>Balas carregadas: " + quant_bala_carregada + "<br>Balas descarregadas: " + quant_bala_descarregada;

    }


    //}
}



// ? Daqui para baixo se encontram os codigos de funções secundarias que são implementadas dentro das outras funções


function embaralhar_municao(ammoMax, quant_bala_carregada, quant_bala_descarregada) {
    let quant_ammo1 = quant_bala_carregada;
    let quant_ammo0 = quant_bala_descarregada;
    while (ordem_das_balas.length < ammoMax) {
        let carr_descarr = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        if (carr_descarr === 1 && quant_ammo1 > 0) {
            ordem_das_balas.push(1);
            quant_ammo1--;
        } else if (carr_descarr === 0 && quant_ammo0 > 0) {
            ordem_das_balas.push(0)
            quant_ammo0--;

        }

    }
}

function limpar_alterações() {
    document.getElementById("quantidade_vida").textContent = "";
    document.getElementById("vez_jogador_js").textContent = "";
    document.getElementById("vida_jogador_1").textContent = "";
    document.getElementById("vida_jogador_2").textContent = "";
    document.getElementById("dano_players").innerHTML = "";
    document.getElementById("vez_jogador_js").textContent = "";
    document.getElementById("vida_jogador_1").textContent = "";
    document.getElementById("dano_players").innerHTML = "";

}

function aut_inicio_partida() {
    jogoAcabou = false;
    criar_intens();
    ordem_das_balas = [];
    ammoMax = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
    quant_bala_carregada = Math.floor(Math.random() * (ammoMax - 1 + 1)) + 1;
    quant_bala_descarregada = ammoMax - quant_bala_carregada;
    embaralhar_municao(ammoMax, quant_bala_carregada, quant_bala_descarregada);
    document.getElementById("informacoes_carregamento").innerHTML = "<br>Balas carregadas: " + quant_bala_carregada + "<br>Balas descarregadas: " + quant_bala_descarregada;
    document.getElementById("aut_recarga").innerHTML = "As balas foram recarregadas!!!";
}

function jogador_ganhou(jogador_que_ganhou) {
    limpar_dialogos_inuteis_ao_atirar();
    if (vida_jogador_1 <= 0) {
        itens_limpeza();
        jogoAcabou =true;
        return;
    } else if (vida_jogador_2 <= 0) {
        itens_limpeza();
        return;
        jogoAcabou = true;
    }
    function itens_limpeza() {
        document.getElementById("dano_players").innerHTML = "O jogador " + jogador_que_ganhou + " ganhou a partida!";
        document.getElementById("btn_atirar").style.display = "none";
        document.getElementById("btn_atirarEmSiMesmo").style.display = "none";
        document.getElementById("id_carga_explosiva").style.display = "none";
        document.getElementById("vida_jogador_1").textContent = "";
        document.getElementById("vida_jogador_2").textContent = "";
        document.getElementById("vez_jogador_js").style.display = "none";
        document.getElementById("id_carga_explosiva").style.display = "none";
        document.getElementById("id_cura_basica").style.display = "none";
    }
}

function mostrar_elementos() {
    document.getElementById("id_carga_explosiva").style.display = "inline-block";
    document.getElementById("btn_atirar").style.display = "inline-block";
    document.getElementById("btn_atirarEmSiMesmo").style.display = "inline-block";
    document.getElementById("vez_jogador_js").style.display = "inline-block";
}
function criar_intens() {
    if(jogoAcabou === true){return;}
    //isoo daqui ta fazendo dois soteios para decidir se o jogador 1 e 2 vao receber os itens
    //lembrar de editar as chances depois que eu adicionar mais itens ao jogo
    let chance_carga_explosiva = 3;
    let chance_cura_basica = 2;
    let chance_revelar_bala_atual = 1;
    let iten_sorteado = Math.floor(Math.random() * (3 - 1 + 1)) + 1; //?aqui daqui ate a proxia marcação se trata da chance dos itens para o jogador 1
    console.log(iten_sorteado)
    /* carga explosiva p1 */if (iten_sorteado === 3) { jogador_1_tem_carga_explosiva = true; document.getElementById("ganhar_usar_itens_jogador1").textContent = "Jogador 1 ganhou uma carga explosiva!"; }
    else { jogador_1_tem_carga_explosiva = false; }
     /* cura basica p1 */if (iten_sorteado === 2) { jogador_1_tem_cura_basica = true; document.getElementById("ganhar_usar_itens_jogador1").textContent = "Jogador 1 ganhou cura basica!"; }
    else { jogador_1_tem_cura_basica = false; }
     /* revelar bala p1 */if (iten_sorteado === 1) { jogador_1_tem_revelar_bala = true; document.getElementById("ganhar_usar_itens_jogador1").textContent = "Jogador 1 ganhou revelar bala atual!"; }
    else { jogador_1_tem_revelar_bala = false; }

    iten_sorteado = Math.floor(Math.random() * (3 - 1 + 1)) + 1;//? a partir daqui se trata dos itens do jogador 2
     /* carga explosiva p2 */if (iten_sorteado === 3) { jogador_2_tem_carga_explosiva = true; document.getElementById("ganhar_usar_itens_jogador2").textContent = "Jogador 2 ganhou uma carga explosiva!"; }
    else { jogador_2_tem_carga_explosiva = false; }
     /* cura basica p2 */if (iten_sorteado === 2) { jogador_2_tem_cura_basica = true; document.getElementById("ganhar_usar_itens_jogador2").textContent = "Jogador 2 ganhou cura basica!"; }
    else { jogador_2_tem_cura_basica = false; }
    /* revelar bala p2 */if (iten_sorteado === 1) { jogador_2_tem_revelar_bala = true; document.getElementById("ganhar_usar_itens_jogador2").textContent = "Jogador 2 ganhou revelar bala atual!"; }
    else { jogador_2_tem_revelar_bala = false; }

}

function aparecer_iten_para_jogador_expecifico() {

    if (vez_jogador === 1) {
        /* aparecer carga explosiva p1*/if (jogador_1_tem_carga_explosiva === true) { document.getElementById("id_carga_explosiva").style.display = "inline-block"; }
        else if (jogador_1_tem_carga_explosiva === false) { document.getElementById("id_carga_explosiva").style.display = "none"; }
        /* aparecer cura basica p1 */if(jogador_1_tem_cura_basica === true){document.getElementById("id_cura_basica").style.display = "inline-block";}
        else if(!jogador_1_tem_cura_basica){document.getElementById("id_cura_basica").style.display = "none";}
        /* aparecer revelar bala p1 */if(jogador_1_tem_revelar_bala === true){document.getElementById("id_revelar_bala_atual").style.display = "inline-block";}
        else if(!jogador_1_tem_revelar_bala){document.getElementById("id_revelar_bala_atual").style.display = "none";}
    }
    if (vez_jogador === 2) {
        /* aparecer carga explosiva p2*/if (jogador_2_tem_carga_explosiva === true) {document.getElementById("id_carga_explosiva").style.display = "inline-block";}
        else if (jogador_2_tem_carga_explosiva === false) {document.getElementById("id_carga_explosiva").style.display = "none";}
        /* aparecer cura basica p2 */if(jogador_2_tem_cura_basica === true){document.getElementById("id_cura_basica").style.display = "inline-block";}
        else if(jogador_2_tem_cura_basica === false){document.getElementById("id_cura_basica").style.display = "none";}
        /* aparecer revelar bala p2 */if(jogador_2_tem_revelar_bala === true){document.getElementById("id_revelar_bala_atual").style.display = "inline-block";}
        else if(jogador_2_tem_revelar_bala === false){document.getElementById("id_revelar_bala_atual").style.display = "none";}
            }
        
}
function limpar_dialogos_inuteis_ao_atirar() {
    document.getElementById("ganhar_usar_itens_jogador1").textContent = "";
    document.getElementById("ganhar_usar_itens_jogador2").textContent = "";
    document.getElementById("aut_recarga").innerHTML = "";
}
function carga_explosiva() {
    document.getElementById("id_carga_explosiva").style.display = "none";
    dano_arma_na_rodada = 2;
    if(vez_jogador === 1){jogador_1_tem_carga_explosiva = false;}
    else if(vez_jogador === 2){jogador_2_tem_carga_explosiva = false;}
}
function cura_basica() {
    
    if (vez_jogador === 1) {
        vida_jogador_1= vida_jogador_1+1;
        document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
        jogador_1_tem_cura_basica = false;
    } else if (vez_jogador === 2) {
        vida_jogador_2= vida_jogador_2+1;
        document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_jogador_2;
        jogador_2_tem_cura_basica = false;
    }
    document.getElementById("id_cura_basica").style.display = "none";

}
function revelar_bala_atual(){
    console.log(ordem_das_balas);
    document.getElementById("atividade_de_iten").textContent = "A bala dese rodade é: "+ordem_das_balas[0];
    if(vez_jogador === 1){
        jogador_1_tem_revelar_bala = false;
    }
    else if(vez_jogador === 2){
        jogador_2_tem_revelar_bala = false;
    }

    document.getElementById("id_revelar_bala_atual").style.display = "none";
}
function reverter_efeito_de_itens() {
    dano_arma_na_rodada = 1;
    document.getElementById("atividade_de_iten").textContent = "";
}

function controle_bot() {
    setTimeout(function () {
        
        if (modo_de_jogo != "contra_bot") { return; }
        if (vez_jogador === 2) {
            uso_itens_bot();
            chance_de_jogada_bot = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            console.log("esta na vez do bot")
            if (vida_jogador_1 <= 0) {
                jogador_ganhou(1);
                return;
            } else if (vida_jogador_2 <= 0) {
                jogador_ganhou(2);
                return;
            }
            limpar_dialogos_inuteis_ao_atirar();
            document.getElementById("informacoes_carregamento").innerHTML = "";
            if (ordem_das_balas.length <= 0) {
                aut_inicio_partida();
                document.getElementById("aut_recarga").innerHTML = "As balas foram recarregadas!!!";
            }

            if (ordem_das_balas[0] === 1) {
                if (chance_de_jogada_bot === 1 && vida_jogador_1 != 0) {
                    vida_jogador_1 -= dano_arma_na_rodada;
                    console.log("bot atirou no jogador 1");
                    ordem_das_balas.shift();
                    document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
                    document.getElementById("dano_players").innerHTML = "Jogado 1 Levou um tiro!<br>Vez do jogador 1.";
                    jogador_ganhou(vez_jogador);
                    vez_jogador = 1;
                    reverter_efeito_de_itens();
                    aparecer_iten_para_jogador_expecifico();
                    document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                    if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
                }
                if (chance_de_jogada_bot === 2 && vida_jogador_2 != 0) {
                    vida_jogador_2 -= dano_arma_na_rodada;
                    ordem_das_balas.shift();
                    document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_jogador_2;
                    document.getElementById("dano_players").innerHTML = "Jogador 2 atirou em si mesmo e levou dano!<br>Vez do jogador 1.";
                    console.log("bot atirou em si mesmo");
                    jogador_ganhou(1);
                    vez_jogador = 1;
                    reverter_efeito_de_itens();
                    aparecer_iten_para_jogador_expecifico();
                    document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                    if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas

                }

            }//
            else if (ordem_das_balas[0] === 0) {
                if (chance_de_jogada_bot === 1 && vida_jogador_1 != 0) {

                    console.log("bot deu bala vazia");
                    ordem_das_balas.shift();
                    document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
                    document.getElementById("dano_players").innerHTML = "jogador 2 atirou em jogador 1 mas era Bala vazia!<br>Vez do jogador 1.";
                    jogador_ganhou(vez_jogador);
                    vez_jogador = 1;
                    reverter_efeito_de_itens();
                    aparecer_iten_para_jogador_expecifico();
                    document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                    if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
                }
                if (chance_de_jogada_bot === 2 && vida_jogador_2 != 0) {

                    ordem_das_balas.shift();
                    document.getElementById("dano_players").innerHTML = "Jogador 2 atirou em si mesmo mas era Bala vazia!<br>Vez do jogador 2.";
                    console.log("bot atirou em si mesmo e vazia");

                    repetir_controle_bot();
                    reverter_efeito_de_itens();
                    aparecer_iten_para_jogador_expecifico();
                    document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                    if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
                    jogador_ganhou(vez_jogador);
                }

            }
        }
    }, 7000);
}
function uso_itens_bot(){
    //setTimeout(function () {
        if (vez_jogador === 2){
            if(jogador_2_tem_carga_explosiva){
                carga_explosiva();
                document.getElementById("ganhar_usar_itens_jogador2").textContent = "jogador 2 usou carga explosiva";
            }
            else if(jogador_2_tem_cura_basica){
                cura_basica();
                document.getElementById("ganhar_usar_itens_jogador2").textContent = "jogador 2 usou cura basica";
            }
            else if(jogador_2_tem_revelar_bala){
                revelar_bala_atual();
                console.log("usou revelar bala atual e o dano da bala é: " + dano_arma_na_rodada)
                document.getElementById("ganhar_usar_itens_jogador2").textContent = "jogador 2 usou revelar bala atual";
                if(ordem_das_balas[0] === 1){
                    vida_jogador_1 -= dano_arma_na_rodada;
                console.log("bot atirou no jogador 1");
                    ordem_das_balas.shift();
                    document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
                    document.getElementById("dano_players").innerHTML = "Jogador 2 usou revelar bala atual! <br>Jogado 1 Levou um tiro!<br>Vez do jogador 1.";
                    jogador_ganhou(vez_jogador);
                    vez_jogador = 1;
                    reverter_efeito_de_itens();
                    aparecer_iten_para_jogador_expecifico();
                    document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                    if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
                    repetir_controle_bot();
                }else if(ordem_das_balas[0] === 0){
                    ordem_das_balas.shift();
                        document.getElementById("dano_players").innerHTML = "Jogador 2 usou revelar bala atual! <br>Jogador 2 atirou em si mesmo mas era Bala vazia!<br>Vez do jogador 2.";
                        console.log("bot atirou em si mesmo e vazia");

                    
                        reverter_efeito_de_itens();
                        aparecer_iten_para_jogador_expecifico();
                        document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                        if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
                        jogador_ganhou(vez_jogador);
                        vez_jogador =2;
                        repetir_controle_bot();
                }
            }
        }
  //  }, 7000);
}
function repetir_controle_bot() {

    controle_bot();
}

