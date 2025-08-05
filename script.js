
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
let dano_arma_na_rodada = 1;

{// TODO: esta parte do codigo inteira se refere aos acontecimentos de quando se clica no botão jogar com outra pessoa
function jogar_com_outra_pessoa() {
    modo_de_jogo = "outro_jogador";
    document.getElementById("iniciar_partida_contra_outro_jogador").style.display = "inline-block";
    document.getElementById("id_jogar_contra_bot").style.display = "none";
    document.getElementById("id_jogar_contra_outra_pessoa").style.display = "none";
}


//if(modo_de_jogo === "outro_jogador"){

function inicio_partida_jogador(){
    if(modo_de_jogo != "outro_jogador"){return;}
    limpar_dialogos_inuteis_ao_atirar();
    
    limpar_alterações();
    mostrar_elementos();
    criar_intens();
    aparecer_iten_para_jogador_expecifico();
    ordem_das_balas = [];
    ammoMax = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
    vida_partida = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    document.getElementById("quantidade_vida").textContent = "A quantidade de vida neste partida é: " + vida_partida;
    quant_bala_carregada = Math.floor(Math.random() * ((ammoMax-2) - 2 + 1)) + 2;
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
            vez_jogador = 2;
            reverter_efeito_de_itens();
            aparecer_iten_para_jogador_expecifico();
            document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
            jogador_ganhou(vez_jogador);
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
            vez_jogador = 1;
            reverter_efeito_de_itens();
            aparecer_iten_para_jogador_expecifico();
            document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
            jogador_ganhou(vez_jogador);
            if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
        }
    } else
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
function atirar_em_si_mesmo() {
    aparecer_iten_para_jogador_expecifico();
    limpar_dialogos_inuteis_ao_atirar();


    document.getElementById("informacoes_carregamento").innerHTML = "";
    if (ordem_das_balas[0] === 1) {

        if (vez_jogador === 1 && vida_jogador_2 > 0) {

            vida_jogador_1 -= dano_arma_na_rodada;
            ordem_das_balas.shift();
            document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
            document.getElementById("dano_players").innerHTML = "Jogador 1 deu um tiro em si mesmo!<br>Vez do jogador 2.";
            vez_jogador = 2;
            reverter_efeito_de_itens();
            document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

            if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            jogador_ganhou(vez_jogador);
        } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
            vida_jogador_2 -= dano_arma_na_rodada;

            ordem_das_balas.shift();
            document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_jogador_2;
            document.getElementById("dano_players").innerHTML = "Jogador 2 deu um tiro em si mesmo!<br>Vez do jogador 1.";
            vez_jogador = 1;
            reverter_efeito_de_itens();
            document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
            jogador_ganhou(vez_jogador);
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
        } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
            ordem_das_balas.shift();
            document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Jogador 2 continua jogando.";
            vez_jogador = 2;
            reverter_efeito_de_itens();
            document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
            if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
        }
    }
}
//}
}


{ // TODO: esta parte do codigo inteira se refere aos acontecimentos de quandp se clica no botão jogar contra um BOT
function jogar_contra_bot() {
    modo_de_jogo = "contra_bot";
    document.getElementById("iniciar_partida_contra_bot").style.display = "inline-block";
    document.getElementById("id_jogar_contra_bot").style.display = "none";
    document.getElementById("id_jogar_contra_outra_pessoa").style.display = "none";
}

console.log(modo_de_jogo);
//if(modo_de_jogo === "contra_bot"){
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
function inicio_partida_bot(){
    
    if(modo_de_jogo != "contra_bot"){return;}
    limpar_dialogos_inuteis_ao_atirar();
    
    limpar_alterações();
    mostrar_elementos();
    criar_intens();
    aparecer_iten_para_jogador_expecifico();
    ordem_das_balas = [];
    ammoMax = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
    vida_partida = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    document.getElementById("quantidade_vida").textContent = "A quantidade de vida neste partida é: " + vida_partida;
    quant_bala_carregada = Math.floor(Math.random() * ((ammoMax-2) - 2 + 1)) + 2;
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



// ! Daqui para baixo se encontram os codigos de funções secundarias que são implementadas dentro das outras funções


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
        document.getElementById("dano_players").innerHTML = "O jogador " + jogador_que_ganhou + " ganhou a partida!";
        document.getElementById("btn_atirar").style.display = "none";
        document.getElementById("btn_atirarEmSiMesmo").style.display = "none";
        document.getElementById("id_carga_explosiva").style.display = "none";
        document.getElementById("vida_jogador_1").textContent = "";
        document.getElementById("vida_jogador_2").textContent = "";
        document.getElementById("vez_jogador_js").style.display = "none";
        return;
    } else if (vida_jogador_2 <= 0) {
        document.getElementById("dano_players").innerHTML = "O jogador " + jogador_que_ganhou + " ganhou a partida!";
        document.getElementById("btn_atirar").style.display = "none";
        document.getElementById("btn_atirarEmSiMesmo").style.display = "none";
        document.getElementById("id_carga_explosiva").style.display = "none";
        document.getElementById("vida_jogador_1").textContent = "";
        document.getElementById("vida_jogador_2").textContent = "";
        document.getElementById("vez_jogador_js").style.display = "none";
        return;
    }
}

function mostrar_elementos() {

    document.getElementById("btn_atirar").style.display = "inline-block";
    document.getElementById("btn_atirarEmSiMesmo").style.display = "inline-block";
    document.getElementById("vez_jogador_js").style.display = "inline-block";
}
function criar_intens() {
    //isoo daqui ta fazendo dois soteios para decidir se o jogador 1 e 2 vao receber os itens
    //lembrar de editar as chances depois que eu adicionar mais itens ao jogo
    let chance_carga_explosiva = 3;
    let iten_sorteado = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (iten_sorteado === 3) {
        jogador_1_tem_carga_explosiva = true;
        document.getElementById("ganhar_usar_itens_jogador1").textContent = "Jogador 1 ganhou uma carga explosiva!";
    }
    else{
        jogador_1_tem_carga_explosiva = false;
    }
    iten_sorteado = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (iten_sorteado === 3) {
        jogador_2_tem_carga_explosiva = true;
        document.getElementById("ganhar_usar_itens_jogador2").textContent = "Jogador 2 ganhou uma carga explosiva!";
    }else{
        jogador_2_tem_carga_explosiva = false;
    }

}

function aparecer_iten_para_jogador_expecifico() {
console.log("acionou a função")
if(vez_jogador === 1){
    if (jogador_1_tem_carga_explosiva === true) {
        document.getElementById("id_carga_explosiva").style.display = "inline-block";
        console.log(vez_jogador);
    }
    else if (jogador_1_tem_carga_explosiva === false) {
        document.getElementById("id_carga_explosiva").style.display = "none";
    }
}
if(vez_jogador === 2){
    if (jogador_2_tem_carga_explosiva === true) {
        document.getElementById("id_carga_explosiva").style.display = "inline-block";
        console.log(vez_jogador);
    }
    else if (jogador_2_tem_carga_explosiva === false) {
        document.getElementById("id_carga_explosiva").style.display = "none";
    }
}
}
function limpar_dialogos_inuteis_ao_atirar() {
    document.getElementById("ganhar_usar_itens_jogador1").textContent = "";
    document.getElementById("ganhar_usar_itens_jogador2").textContent = "";
    document.getElementById("aut_recarga").innerHTML = "";
}
function carga_explosiva(){
    document.getElementById("id_carga_explosiva").style.display = "none";
    dano_arma_na_rodada = 2;
}
function reverter_efeito_de_itens(){
    dano_arma_na_rodada = 1;
}
