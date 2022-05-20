let musicas = [
	{titulo:'Sonda-me', artista:'Aline Barros', source:'musicas/Aline Barros - Sonda-me.mp3', 
	img:'imagens/aline-barros-capa.jpg'},

	{titulo:'Os Meus Lábios Te Louvam', artista:'Daniel Ludtke - Salmos (ao vivo)', source:'musicas/Os Meus Lábios Te Louvam.mp3', 
	img:'imagens/salmos-capa.jpg'},

	{titulo:'Vim Para Adorar-Te', artista:'Adoração & Adoradores', source:'musicas/Vim Para Adorar-Te.mp3', 
	img:'imagens/adoracao.jpg'}
];

//Inicio
let musica = document.querySelector('audio');
let indexMusica = 0;

let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let imagem = document.querySelector('img');
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');

//duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
	indexMusica--;
	if (indexMusica < 0) {
		indexMusica = 2;
	}
	renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
	indexMusica++;
	if (indexMusica > 2) {
		indexMusica = 0;
	}
	renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(musicaIndex){
    musica.setAttribute('src', musicas[musicaIndex].source);

    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].artista;
        imagem.src = musicas[musicaIndex].img;

        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });

    document.body.append(musica);
}

function tocarMusica(){
	musica.play();
	document.querySelector('.botao-play').style.display = 'none';
	document.querySelector('.botao-pause').style.display = 'block';
}

function pausarMusica(){
	musica.pause();
	document.querySelector('.botao-play').style.display = 'block';
	document.querySelector('.botao-pause').style.display = 'none';
}

function segundosParaMinutos(segundos){
	let campoMinutos = Math.floor(segundos / 60);
	let campoSegundos = segundos % 60;

	if (campoSegundos < 10){
		campoSegundos = '0' + campoSegundos;
	}

	return `${campoMinutos}:${campoSegundos}`;
}

function atualizarBarra(){
	let barra = document.querySelector('progress');
	barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
	let tempoDecorrido = document.querySelector('.inicio');
	tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}
