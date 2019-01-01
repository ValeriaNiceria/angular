import { Component, OnInit } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

	public frases: Frase[] = FRASES
	public instrucao: string = 'Traduza a frase:'
	public resposta: string = ''

	public rodada: number = 0
	public rodadaFrase: Frase

	public progresso: number = 0

	public tentativas: number = 3

	constructor() {
		this.atualizaRodada()
	}

	ngOnInit() {
	}


	public atualizaResposta(resposta: Event): void {
		this.resposta = (<HTMLInputElement>resposta.target).value
		//console.log('Resposta: ', this.resposta)
	}


	public verificarResposta(): void {
		if (this.rodadaFrase.frasePtBr == this.resposta) {
			// Trocar pergunta da rodada
			this.rodada++
			this.atualizaRodada()

			// progresso
			this.progresso += (100 / this.frases.length)
		} else {
			this.tentativas--

			if (this.tentativas === -1) {
				alert('Perdeu todas as tentativas!!! ;(')
			}
		}
	}


	public atualizaRodada(): void {
		this.rodadaFrase = this.frases[this.rodada]
		// limpando a resposta
		this.resposta = ''
	}
}
