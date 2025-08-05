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

function jogar_com_outra_pessoa() {
    modo_de_jogo = "outro_jogador";
    document.getElementById("iniciar_partida").style.display = "inline-block";
}


function inicio_partida() {
    if (modo_de_jogo != "outro_jogador") { return; }
    limpar_alterações();
    mostrar_elementos();
    ordem_das_balas = [];
    ammoMax = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
    vida_partida = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    document.getElementById("quantidade_vida").textContent = "A quantidade de vida neste partida é: " + vida_partida;
    quant_bala_carregada = Math.floor(Math.random() * (ammoMax - 1 + 1)) + 1;
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

            vida_jogador_2--;

            ordem_das_balas.shift();
            document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_jogador_2;
            document.getElementById("dano_players").innerHTML = "Jogador 2 Levou um tiro!<br>Vez do jogador 2.";
            vez_jogador = 2;
            document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
            jogador_ganhou(vez_jogador);
            if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
        } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
            if (ordem_das_balas.length <= 0) {
                aut_inicio_partida();
                document.getElementById("aut_recarga").innerHTML = "As balas foram recarregadas!!!";
            }
            vida_jogador_1--;
            ordem_das_balas.shift();
            document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
            document.getElementById("dano_players").innerHTML = "Jogador 1 Levou um tiro!<br>Vez do jogador 1.";
            vez_jogador = 1;
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
            document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

            if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
        } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
            ordem_das_balas.shift();
            document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Vez do jogador 1.";
            vez_jogador = 1;
            document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
            if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
        }
    }

    function atirar_em_si_mesmo() {


        document.getElementById("informacoes_carregamento").innerHTML = "";
        if (ordem_das_balas[0] === 1) {

            if (vez_jogador === 1 && vida_jogador_2 > 0) {

                vida_jogador_1--;
                ordem_das_balas.shift();
                document.getElementById("vida_jogador_1").textContent = "Vida jogador 1: " + vida_jogador_1;
                document.getElementById("dano_players").innerHTML = "Jogador 1 deu um tiro em si mesmo!<br>Vez do jogador 2.";
                vez_jogador = 2;
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;

                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
                jogador_ganhou(vez_jogador);
            } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
                vida_jogador_2--;

                ordem_das_balas.shift();
                document.getElementById("vida_jogador_2").textContent = "Vida jogador 2: " + vida_jogador_2;
                document.getElementById("dano_players").innerHTML = "Jogador 2 deu um tiro em si mesmo!<br>Vez do jogador 1.";
                vez_jogador = 1;
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                jogador_ganhou(vez_jogador);
                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            }
        } else if (ordem_das_balas[0] === 0) {

            if (vez_jogador === 1 && vida_jogador_2 > 0) {
                ordem_das_balas.shift();
                document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Jogador 1 continua jogando.";
                vez_jogador = 1;
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            } else if (vez_jogador === 2 && vida_jogador_1 > 0) {
                ordem_das_balas.shift();
                document.getElementById("dano_players").innerHTML = "Bala vazia!<br>Jogador 2 continua jogando.";
                vez_jogador = 2;
                document.getElementById("vez_jogador_js").textContent = "Vez do Jogador: " + vez_jogador;
                if (ordem_das_balas.length <= 0) { aut_inicio_partida(); } //reiniciou as balas
            }
        }
    }

}


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

    ordem_das_balas = [];
    ammoMax = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
    quant_bala_carregada = Math.floor(Math.random() * (ammoMax - 1 + 1)) + 1;
    quant_bala_descarregada = ammoMax - quant_bala_carregada;
    embaralhar_municao(ammoMax, quant_bala_carregada, quant_bala_descarregada);
    document.getElementById("informacoes_carregamento").innerHTML = "<br>Balas carregadas: " + quant_bala_carregada + "<br>Balas descarregadas: " + quant_bala_descarregada;
    document.getElementById("aut_recarga").innerHTML = "As balas foram recarregadas!!!";
}

function jogador_ganhou(jogador_que_ganhou) {
    if (vida_jogador_1 <= 0) {
        document.getElementById("dano_players").innerHTML = "O jogador " + jogador_que_ganhou + " ganhou a partida!";
        return;
    } else if (vida_jogador_2 <= 0) {
        document.getElementById("dano_players").innerHTML = "O jogador " + jogador_que_ganhou + " ganhou a partida!";
        return;
    }
}

function mostrar_elementos() {

    document.getElementById("btn_atirar").style.display = "inline-block";
    document.getElementById("btn_atirarEmSiMesmo").style.display = "inline-block";
    document.getElementById("vez_jogador_js").style.display = "inline-block";
}