import random
import os
import tkinter as tk
from tkinter import Label, Frame, Button
janela = tk.Tk()

frame = Frame(janela, pady=40, padx=40).grid(column=1, row=1)

def limpar_terminal():
      
    # Detecta o sistema operacional
    if os.name == 'nt':  # Se for Windows
        os.system('cls')
    else:  # Se for Unix (Linux ou macOS)
        os.system('clear')
int = bullet = random.randrange(3, 10)
int = vazia = random.randrange(1, bullet)
int = ativa = bullet - vazia
c = 'c'
d = 'd'
VezP2 = False
VezP1 = True
int = carga = [c] * ativa + [d] * vazia
random.shuffle(carga)
carregadas = carga.count('c')
descarregadas = carga.count('d')
quantP1Life = random.randrange(1, 6)
P1Life = quantP1Life
P2Life = quantP1Life
limpar_terminal()
Label(frame, text=f"Exitem {carregadas} balas carregadas e {descarregadas} balas descarregadas", pady=60).grid(column=1, row=1, columnspan=2)
print(f"A quantidade de vida desta rodada é:{quantP1Life}")
print("Vez de Jogador|1|")
while P1Life > 0 and P2Life > 0:
    if not carga:
        int = bullet = random.randrange(3, 10)
        int = vazia = random.randrange(1, bullet)
        int = ativa = bullet - vazia
        c = 'c'
        d = 'd'
        int = carga = [c] * ativa + [d] * vazia
        random.shuffle(carga)
        carregadas = carga.count('c')
        descarregadas = carga.count('d')
        print(f"Exitem: {carregadas} balas carregadas\nE existem:  {descarregadas} balas descarregadas")
       
    
    escolha = input("Press 1 para atirar no Jogador|1|: \nPress 2 para atirar Jogador|2|:")
    tiro = carga[0]
    if VezP1 == True:
        limpar_terminal()
        
        if P1Life <= 0:
            print("Jogador|1| ganhou!!!")
        print("Vez de jogar 1.")
        if escolha == "1" and tiro == "c":
            print("Jogador|1| levou tiro")
            P1Life = P1Life - 1
            VezP2 = True
            print(f"Jogador|1| tem {P1Life} de vida")
        elif escolha == "2" and tiro == "c":
            print("Deu tiro em Jogador|2|")
            P2Life = P2Life - 1
            print(f"Jogador|2| tem {P2Life} de vida")
        elif escolha == "1" and tiro == "d":
            print("Descarregado")
        elif escolha == "2" and tiro == "d":
            print("Descarregado")
            VezP2 = True
        carga.pop(0)
        if P1Life <= 0:
            print("Jogador|2| ganhou !!!") 
            break
        if P2Life <=0:
            print("Jogador|1| ganhou!!!")
            break
    if VezP2 == True:
        limpar_terminal()
        if P2Life <= 0:
            print("Jogador|1|  Ganhou!!!")
        print("Vez de Jogador|2|.")
        if escolha == "1" and tiro == "c":
            print(" Jogador|2| levou Tiro")
            P2Life = P2Life - 1
            VezP1 = True
            print(f"Jogador|2| tem {P2Life} de vida")
        elif escolha == "2" and tiro == "c":
            print("Jogador|2| deu tiro em Jogador|1|")
            P1Life = P1Life - 1
            print(f"Jogador|1| tem {P1Life} de vida")
        elif escolha == "1" and tiro == "d":
            print("Descarregado")
        elif escolha == "2" and tiro == "d":
            print("Descarregado")
            VezP1 = True




janela.title('Roleta Russa')
janela.mainloop()
def limpar_terminal():

    # Detecta o sistema operacional
    if os.name == 'nt':  # Se for Windows
        os.system('cls')
    else:  # Se for Unix (Linux ou macOS)
        os.system('clear')
int = bullet = random.randrange(3, 10)
int = vazia = random.randrange(1, bullet)
int = ativa = bullet - vazia
c = 'c'
d = 'd'
VezP2 = False
VezP1 = True
int = carga = [c] * ativa + [d] * vazia
random.shuffle(carga)
carregadas = carga.count('c')
descarregadas = carga.count('d')
quantP1Life = random.randrange(1, 6)
P1Life = quantP1Life
P2Life = quantP1Life
limpar_terminal()
print(f"Exitem: {carregadas} balas carregadas\nE existem:  {descarregadas} balas descarregadas")
print(f"A quantidade de vida desta rodada é:{quantP1Life}")
print("Vez de Jogador|1|")
while P1Life > 0 and P2Life > 0:
    if not carga:
        int = bullet = random.randrange(3, 10)
        int = vazia = random.randrange(1, bullet)
        int = ativa = bullet - vazia
        c = 'c'
        d = 'd'
        int = carga = [c] * ativa + [d] * vazia
        random.shuffle(carga)
        carregadas = carga.count('c')
        descarregadas = carga.count('d')
        print(f"Exitem: {carregadas} balas carregadas\nE existem:  {descarregadas} balas descarregadas")
       
    
    escolha = input("Press 1 para atirar no Jogador|1|: \nPress 2 para atirar Jogador|2|:")
    tiro = carga[0]
    if VezP1 == True:
        limpar_terminal()
        
        if P1Life <= 0:
            print("Jogador|1| ganhou!!!")
        print("Vez de jogar 1.")
        if escolha == "1" and tiro == "c":
            print("Jogador|1| levou tiro")
            P1Life = P1Life - 1
            VezP2 = True
            print(f"Jogador|1| tem {P1Life} de vida")
        elif escolha == "2" and tiro == "c":
            print("Deu tiro em Jogador|2|")
            P2Life = P2Life - 1
            print(f"Jogador|2| tem {P2Life} de vida")
        elif escolha == "1" and tiro == "d":
            print("Descarregado")
        elif escolha == "2" and tiro == "d":
            print("Descarregado")
            VezP2 = True
        carga.pop(0)
        if P1Life <= 0:
            print("Jogador|2| ganhou !!!") 
            break
        if P2Life <=0:
            print("Jogador|1| ganhou!!!")
            break
    if VezP2 == True:
        limpar_terminal()
        if P2Life <= 0:
            print("Jogador|1|  Ganhou!!!")
        print("Vez de Jogador|2|.")
        if escolha == "1" and tiro == "c":
            print(" Jogador|2| levou Tiro")
            P2Life = P2Life - 1
            VezP1 = True
            print(f"Jogador|2| tem {P2Life} de vida")
        elif escolha == "2" and tiro == "c":
            print("Jogador|2| deu tiro em Jogador|1|")
            P1Life = P1Life - 1
            print(f"Jogador|1| tem {P1Life} de vida")
        elif escolha == "1" and tiro == "d":
            print("Descarregado")
        elif escolha == "2" and tiro == "d":
            print("Descarregado")
            VezP1 = True
