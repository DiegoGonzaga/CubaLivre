//Tipos de bebidas
var BEBIDA= {
    COCA: 0,
    PEPSI: 1
}

//Bebida escolhida
var bebida_escolhida;

//Valores bases para o calculo de pertinência
var BASES_RUN={
    fraco:[10,10,15,20],
    suave:[15,20,25,27],
    forte:[23,28,30,30],
};
var BASES_COCA={
    fraco:[56,58,60,60],
    suave:[52,54,56,58],
    forte:[50,50,52,54]

};
var BASES_PEPSI={
    fraco:[66,68,70,70],
    suave:[62,64,66,68],
    forte:[60,60,62,64]

};

var bases_refri;

//quantidade de refrigerante em mL
var refri_ml;
//graus de pertinência do refrigerante
var pertinencia_refri=
{
    fraco:undefined,
    suave:undefined,
    forte:undefined
};

//quantidade de run em mL
var run_ml;
//graus de pertinência do run
var pertinencia_run={
    fraco:undefined,
    suave:undefined,
    forte:undefined
};

//quantidade de gelo em mL
var gelo_ml;

/*
 * 'base' é um vetor com os quatro valores limitantes da pertinencia
 * A variável 'valor' é aquilo que será fuzzyficado
 */
function calc_pertinencia(base,valor)
{

    //Possibilidade de estar nos maximos
    if(valor >= base[1] && valor <= base[2])
    {
        return 1;
    }
    //Possibilidade de estar fora da escala
    if(valor <= base[0] || valor >= base[3] )
    {
        return 0;
    }
    //Possibilidade de estar no crescente
    if(valor>base[0] && valor<base[1])
    {
        return (valor - base[0])/(base[1]-base[0]);
    }

    //Possibilidade de estar no decrescente
    if(valor>base[2] && valor<base[3])
    {
        return (base[3]-valor)/(base[3]-base[2]);
    }

}

//Utilizando enum paraa definir qual é a bebida escolhida
function definir_bebida(x)
{
    if(x =='coca')
        bebida_escolhida = BEBIDA.COCA;
    else if(x =='pepsi')
        bebida_escolhida = BEBIDA.PEPSI;    

    main();
}

//Define os valores bases para calculo de pertinencia baseado na bebida escolhida
function definir_bases()
{
    if(bebida_escolhida == BEBIDA.COCA)
        bases_refri  = BASES_COCA;
    else if(bebida_escolhida == BEBIDA.PEPSI)
        bases_refri  = BASES_PEPSI;
}
//Função utilizada pelo HTML
function definir_qtde_refri(x)
{
    refri_ml=x;
    main();
}
//Função utilizada pelo HTML
function definir_qtde_run(x)
{
    run_ml=x;
    main();
}
//Função utilizada pelo HTML
function definir_qtde_gelo(x)
{
    gelo_ml=x;
    main();
}

function main()
{
    //Caso uma das caixas esteja vazia não deve-se exibir nada
    if(refri_ml=='' || run_ml=='' || gelo_ml=='')
    {
        document.getElementById('resultado').innerHTML= '';
        return;
    }
    definir_bases();
    registra_pertinencia();
    escrever_resultado();    
}
//Faz os cálculos para descobrir o grau de pertinência dos ingredientes
function registra_pertinencia()
{
    pertinencia_refri.forte = calc_pertinencia(bases_refri.forte,refri_ml);
    pertinencia_refri.suave = calc_pertinencia(bases_refri.suave,refri_ml);
    pertinencia_refri.fraco = calc_pertinencia(bases_refri.fraco,refri_ml);

    pertinencia_run.forte = calc_pertinencia(BASES_RUN.forte,run_ml);
    pertinencia_run.suave = calc_pertinencia(BASES_RUN.suave,run_ml);
    pertinencia_run.fraco = calc_pertinencia(BASES_RUN.fraco,run_ml);
    
}

//Escreve os resultados no HTML
function escrever_resultado()
{
    var texto = "<b>Suave:</b> máximo[ mínimo { μ CocaForte (x) ; μ RunFraco (x) ; μ Gelo (x) } ; mínimo { μ CocaSuave (x) ; μ RunSuave (x) ; μ Gelo (x) } ;mínimo { μ CocaFraco (x) ; μ RunForte (x) ; μ Gelo (x) }]" ;
    document.getElementById('resultado').innerHTML= texto;
}

//Recebe 3 valores e retorna o maior
function calc_max(x,y,z)
{
    var maior = x;
    if(x < y)
    {
        maior = y;
    }
    if( y < z)
    {
        maior = x;
    }
    return maior;

}
//Recebe 3 valores e retorna o menor
function calc_min(x,y,z)
{
    var menor = x;
    if(x > y)
    {
        menor = y;
    }
    if( y > z)
    {
        menor = x;
    }
    return menor;

}

//Utilizado para definir valores padrão
function inicializar()
{
    refri_ml='';
    run_ml='';
    gelo_ml='';
    definir_bebida('coca');
}